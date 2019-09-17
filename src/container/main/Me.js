import BaseContainer from '../BaseContainer'
import React from  'react'
import PixelUtil from '../../tools/PixelUtil'
import { IMG_FORWARD,IMG_FORWARD_GRAY,IMG_AVATAR_MAIN,IMG_AVATAR_NEW} from '../../imgs'
import { Button,Modal, Toast } from 'antd-mobile'
import {checkPhone,checkPassword} from "../../tools/RegUtil";
import {LoginInput,TextButtons} from "../user/LoginInput";
import {ALBUM,SETTINGS,SETME, COLLECTION, SUBSCRIBE} from '../../const/locations'
import getStorage from '../../tools/Storage'

const styles={
    statusBar:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#A8D8EA',
    },
    statusBar_blank:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#fff',
    }
}

class Me extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            username:'',
            logStatus:false,
            modalVisible:false,
            registVisible:false,
            avatar:IMG_AVATAR_MAIN,
        }
        this.phone=''
        this.pwd=''
        this.verifyPwd=''
    } 

    eventListener(params){
        const avatar = getStorage.getItem('imgUrl')
        const uerN = getStorage.getItem('name')
        this.setState({
            username:uerN,
            avatar : avatar!='null'?avatar:IMG_AVATAR_NEW,
        })     
    }

    componentWillMount(){
        console.log('Me init')
        const uerN = getStorage.getItem('name')
        const avatar = getStorage.getItem('imgUrl')
        if(uerN === 'null'){
            return;
        }
        this.setState({
            username : uerN,
            logStatus :true,
            avatar : avatar!='null'?avatar:IMG_AVATAR_NEW,
        })       
    }


    handleLogin=()=>{
        const avatar = getStorage.getItem('imgUrl')

        if (!this.phone) {
            this.toast('请输入手机号');
            return;
        }
        if (!checkPhone(this.phone)) {
            this.toast('请输入正确入手机号');
            return;
        }
        if (!this.pwd) {
            this.toast('请输入密码');
            return;
        }

        getStorage.setItem('name','Jason')
        this.setState({
            modalVisible:false,
            username : 'Jason',
            avatar : avatar!='null'?avatar:IMG_AVATAR_NEW,
            logStatus:true,
        },()=>{
            this.phone=''
            this.pwd=''
        })
    }

    handleRegist=()=>{
        if (!this.phone) {
            this.toast('请输入手机号');
            return;
        }
        if (!this.code) {
            this.toast('请输入验证码');
            return;
        }
        if (!checkPhone(this.phone)) {
            this.toast('请输入正确入手机号');
            return;
        }
        if (!this.pwd) {
            this.toast('请输入密码');
            return;
        }
        if(!checkPassword(this.pwd)){
            this.toast('请输入6-18位密码,并包含大小写字母及数字');
            return;
        }
        if (!this.verifyPwd) {
            this.toast('请确认密码');
            return;
        }
        if (this.pwd !== this.verifyPwd) {
            this.toast('两次密码输入不一致');
            return;
        }
        Toast.loading('',2,()=>{
                this.toast('注册成功！')
                this.setState({
                registVisible:false,
            },()=>{
                this.phone=''
                this.pwd=''
                this.verifyPwd=''
            })
        })
        
        
    }

    settings= ()=>{
        if(this.state.logStatus){
            this.navigate(SETTINGS,'Settings')
        }else{
            this.toast('请先登录后再操作')
            this.setState({
                modalVisible:true
            })
        }
       
    }
    checkAlbum= ()=>{
        if(this.state.logStatus){
            this.navigate(ALBUM,'Album')
        }else{
            this.toast('请先登录后再操作')
            this.setState({
                modalVisible:true
            })
        }
    }
    collected= ()=>{
        if(this.state.logStatus){
            this.navigate(COLLECTION,'Collection')
            
        }else{
            this.toast('请先登录后再操作')
            this.setState({
                modalVisible:true
            })
        }
    }
    subscribe= ()=>{
        if(this.state.logStatus){
            this.navigate(SUBSCRIBE,'Subscribe')
        }else{
            this.toast('请先登录后再操作')
            this.setState({
                modalVisible:true
            })
        }
    }
    handleSet = ()=>{
        if(this.state.logStatus){
            this.navigate(SETME,'Set')
        }else{
            this.toast('请先登录后再操作')
            this.setState({
                modalVisible:true
            })
        }
       
    }

    logOut=()=>{
        getStorage.removeItem('name')
        getStorage.removeItem('imgUrl')
        this.setState({
            username:'',
            avatar:IMG_AVATAR_MAIN,
            logStatus:false,
        })
    }
    showModal = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          modalVisible: true,
        });
      }

      onClose = () => {
        this.setState({
          modalVisible: false,
        });
      }
      onRegistClose = ()=>{
        this.setState({
            registVisible: false,
          });
      }
      sendSms = () => {
        if (!this.phone) {
            this.toast('请输入手机号');
            return;
        }
        if (!checkPhone(this.phone)) {
            this.toast('请输入正确入手机号');
            return;
        }
            this.toast('短信发送成功');
            let i = 60;
            this.time = setInterval(() => {
                this.btn.setText(i + '秒后重试');
                this.btn.setDisable(true);
                i--;
                if (i < 0) {
                    i = 60;
                    this.btn.setText('重新获取');
                    clearInterval(this.time);
                    this.btn.setDisable(false);
                }
            }, 1000)
    };
    render(){
        console.log('Me render')
        return(<div id='uniPolar-container' className='outer-container' style={{backgroundColor:'#f5f5f9'}}>
            <div style={styles.statusBar}/>
            <div className='userInfo'>
                <div className='Me_avatar'>
                    <img src={this.state.avatar} style={{width:'20vw',height:'20vw'}}/>
                </div>
                {this.state.username?<div className='Me_User' onClick={this.handleSet}>
                    <img src={IMG_FORWARD} style={{width:'4.13vw',height:'8.87vw',float:'right',marginRight:'4vw',marginTop:'4vw'}}/>
                    <p style={{fontSize:'6.2vw',color:'#fff',marginTop:'2vw'}}>{this.state.username}</p>
                    <p style={{fontSize:'3.8vw',color:'#fff',marginTop:'5vw'}}>You have logged in</p>
                    <p style={{fontSize:'3.8vw',color:'#fff',marginTop:'10vw'}}>关注:{'5'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;粉丝:{'101.6w'}</p>
                </div>:<div className='Me_User' onClick={this.showModal}>
                    <img src={IMG_FORWARD} style={{width:'4.13vw',height:'8.87vw',float:'right',marginRight:'4vw',marginTop:'4vw'}}/>
                    <p style={{fontSize:'6.2vw',color:'#fff',marginTop:'2vw'}}>Sign In/Up</p>
                    <p style={{fontSize:'3.8vw',color:'#fff',marginTop:'5vw'}}>Discover more fun <br /> After sign in</p>
                </div>}
            </div>
            <div className='Me_options' onClick={this.checkAlbum}>
                Album
                <img src={IMG_FORWARD_GRAY} style={{width:'2.13vw',height:'3.87vw',float:'right',marginRight:'4vw',marginTop:'5.9vw'}}/>
            </div>
            <div className='Me_options' onClick={this.subscribe}>
                Subscribe
                <img src={IMG_FORWARD_GRAY} style={{width:'2.13vw',height:'3.87vw',float:'right',marginRight:'4vw',marginTop:'5.9vw'}}/>
            </div>
            <div className='Me_options' onClick={this.collected}>
                Collection
                <img src={IMG_FORWARD_GRAY} style={{width:'2.13vw',height:'3.87vw',float:'right',marginRight:'4vw',marginTop:'5.9vw'}}/>
            </div>
            <div className='Me_options'  onClick={this.settings}>
                Settings
                <img src={IMG_FORWARD_GRAY} style={{width:'2.13vw',height:'3.87vw',float:'right',marginRight:'4vw',marginTop:'5.9vw'}}/>
            </div>
            {this.state.username?<Button style={{width:'50vw',margin:'10vw auto 0'}} 
                    type='warning' 
                    onClick={this.logOut}
                >LogOut</Button>:null}
            
            <Modal
                visible={this.state.modalVisible}
                onClose={this.onClose}
                closable
                transparent
                maskClosable
                style={{width:'92.8vw'}}
                >
                <div style={{ height:'80vw', overflow: 'scroll' }}>
                    <LoginInput key={1} lefttext={'手机号'} type={'number'} placeholder={'请输入手机号'} onValueChange={(value) => {
                        this.phone = value
                    }} refs = {(inputText)=>{this.inputText = inputText}}/>
                    <LoginInput key={2} lefttext={'密码'} placeholder={'请输入密码'} type={'password'} maxLength={18} onValueChange={(value) => {
                        this.pwd = value 
                    }}/>
                    <div style={{margin:'3.5vw auto',color:'#999',textAlign:'center'}}>
                        还没有账号?<TextButtons text={'立即注册'} style={{marginTop:'2vw',marginLeft:'-2vw',color:'#00ADB5'}} onClick={()=>{this.setState({ modalVisible:false,registVisible:true,})}}/>
                    </div>
                    <Button style={{marginTop:'11vw',color:'#00ADB5'}} onClick={this.handleLogin}>登录</Button>
                </div>
            </Modal>
            <Modal
                visible={this.state.registVisible} 
                >
                    
                    <div style={styles.statusBar_blank}/>
                <div style={{ height:'100vh', overflow: 'scroll',paddingTop:'15px' }}>
                    <div style={{textAlign:'right'}}>
                        <TextButtons text={'关闭'} style={{marginTop:'2vw',marginLeft:'-2vw',color:'#00ADB5'}} onClick={()=>{this.setState({ registVisible:false,})}}/>
                    </div>
                    <LoginInput key={1} lefttext={'手机号'} type={'number'} placeholder={'请输入手机号'} onValueChange={(value) => {
                        this.phone = value
                    }} refs = {(inputText)=>{this.inputText = inputText}}/>
                    <LoginInput key={2} lefttext={'验证码'} placeholder={'请输入验证码'} onValueChange={(value) => {
                    this.code = value
                }}
                            right={<TextButtons text={'获取验证码'}
                                                style={{color:'#00ADB5'}}
                                                ref={com => this.btn = com}
                                                onClick={this.sendSms}
                            />}/>
                    <LoginInput key={3} lefttext={'密码'} placeholder={'请输入密码'} type={'password'} maxLength={18} onValueChange={(value) => {
                        this.pwd = value 
                    }}/>
                    <LoginInput lefttext={'确认密码'} placeholder={'请重新输入密码'} type={'password'} maxLength={18} onValueChange={(value) => {
                    this.verifyPwd = value
                    }}/>
                    <Button style={{margin:'11vw auto 0',width:'75vw'}} type='primary' onClick={this.handleRegist}>注册</Button>
                </div>*
            </Modal>

        </div>)
    }

}

export default Me;
