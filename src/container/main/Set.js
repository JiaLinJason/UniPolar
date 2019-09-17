import BaseContainer from '../BaseContainer'
import React from  'react'
import { IMG_AVATAR_MAIN,IMG_AVATAR_NEW} from '../../imgs'
import PixelUtil from '../../tools/PixelUtil'
import BridgeHelper from "../../tools/BridgeHelper";
import {equals} from "../../tools/CommomUtil";
import './main.less'
import PlatUtil from "../../tools/PlatUtil";
import { Icon,ActionSheet,List,Modal,Button,TextareaItem, Picker } from 'antd-mobile';
import getStorage from '../../tools/Storage';
import Area from '../../const/area'

const Item = List.Item;
const BUTTONS = ['立即拍照', '从相册选择'];
const styles ={
    statusBar:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#fff',
    },
    setAvatar:{
        width:'100vw',
        height:'32vw',
        backgroundColor:'#fff',
        boxShadow: '0 0 8px #ddd',
        marginBottom:'3vw'
    },
}
const genderIcon = {
    male:'data:image/png;base64,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',
    female:'data:image/png;base64,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',
}

class Set extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            qrModal:false,
            avatar: IMG_AVATAR_MAIN,
            nameModal:false,
            name:'Jason',
            gender:'男',
            area:'山西 太原'
        }
    }
    componentWillMount(){
        const uerN = getStorage.getItem('name')
        const avatar = getStorage.getItem('imgUrl')
        if(uerN==='null'){
             return;
        }
        this.username = uerN;
        this.setState({
            avatar : avatar!='null'?avatar:IMG_AVATAR_NEW,
        })
    }



    sdComponentDidMount() {

        window.isNotFinish=()=>{
            this.finish();
            return false;
        };

        window.receivePicture = (params) => {
            if (params) {
                params = JSON.parse(params);
                params.base64 = `data:image/jpg;base64,${params.base64}`;
                this.setState({
                    avatar:params.base64
                },()=>{
                    getStorage.setItem('imgUrl',this.state.avatar)
                })
               
            }
        };
        window.onPermissionResult = (params) => {//权限
            if (params) {
                let obj = JSON.parse(params);
                if (equals(obj.requestCode, 100)) {
                    BridgeHelper.permissionRequest(
                        'android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE',
                        '请在设置中授权获取存储权限', 101);
                } else if (equals(obj.requestCode, 101)) { //申请存储权限
                    this.openCamera();
                }
            }
        };
    }
    setName=()=>{
        const replaceName = this.nickName.state.value;
        if(!replaceName){
            this.toast('请输入正确的昵称');
            return;
        }
        this.toast('设置成功！')
        getStorage.setItem('name',replaceName)
        this.setState({
            nameModal:false,
            name:replaceName
        })
    }

    openCamera() {
        if (equals(this.cameraType, 0)) {
            BridgeHelper.openCamera({maxSize: '500'})
        } else {
            BridgeHelper.imageSelect({maxSize: '500'});
        }
    }
    setNameClose=()=>{
        this.setState({
            nameModal:false
        })
    }

    openImgSelect() {
        if (PlatUtil.isIos()) {
            this.openCamera();
        } else {
            let cameraCheckResult = BridgeHelper.permissionCheck('android.permission.CAMERA');
            let storageCheckResult = BridgeHelper.permissionCheck('android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE');
            if (cameraCheckResult === 'true' && storageCheckResult === 'true') {
                this.openCamera()
            } else if (cameraCheckResult === 'false') {
                let cameraResult = BridgeHelper.permissionRequest(
                    'android.permission.CAMERA',
                    '相机权限', 100);
                if (cameraResult === 'false') {
                    this.toast('请在设置中开启相机权限');
                }
            } else if (storageCheckResult === 'false') {
                let storageResult = BridgeHelper.permissionRequest(
                    'android.permission.WRITE_EXTERNAL_STORAGE,android.permission.READ_EXTERNAL_STORAGE',
                    '请在设置中授权获取存储权限', 101);
                if (storageResult === 'false') {
                    this.toast('请在设置中开启存储权限');
                }
            }
        }
    }

    setAvatar=()=>{
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            maskClosable: true,
        },
        (buttonIndex) => {
            if (buttonIndex < 0) {
                return;
            }
            this.cameraType = buttonIndex;
            this.openImgSelect();
        });
    }

    render(){
        return (<div>
            <div style={styles.setAvatar} onClick={this.setAvatar}>
                <div className='Me_avatar' style={{boxShadow: '0 0 8px #ddd',marginTop:'5vw'}}>
                    <img src={this.state.avatar} style={{width:'20vw',height:'20vw'}}/>
                </div> 
                <div style={{display:'inline-block',height:'32vw',width:'50vw',padding:'12.5vw 0 12.5vw 5vw',boxSizing:'border-box',fontSize:'4.2vw'}}>点击设置头像</div>
                <Icon type='right' size='lg' color='#ddd' style={{float:'right',marginTop:'10.5vw',marginRight:'5vw'}}/>
            </div>
            <List>
                <Item
                 arrow="horizontal"
                 extra={getStorage.getItem('name')}
                 onClick={() => {this.setState({nameModal:true})}}
                >{'昵称'}</Item>
                 <Item
                 arrow="empty"
                 extra={<img src={`https://gw.alipayobjects.com/zos/rmsportal/PKAgAqZWJVNwKsAJSmXd.svg`}/>}
                 onClick={() => {this.setState({qrModal:true})}}
                >{'二维码名片'}</Item>
                 <Item
                 arrow="empty"
                 extra={'04151705'}
                 onClick={() => {this.toast()}}
                >{'uid'}</Item>
                <Picker data={[{label:'男',value:'男'},{label:'女',value:'女'}]}
                        cols={1} 
                        className="forss"
                        onOk={(val)=>{this.setState({gender:val});}}
                        extra = {this.state.gender}>
                    <Item
                    arrow="horizontal"
                    >{'性别'}</Item>
                </Picker>
                <Picker
                    data={Area}
                    cols={2}
                    value={this.address}
                    extra={this.state.area}
                    onOk = {(value)=>{
                        let val = '';
                            Area.forEach((sheng, i) => {
                                if (equals(sheng.value, value[0])) {
                                    val += sheng.label;
                                    sheng.children.forEach((shi, j) => {
                                        if (equals(shi.value, value[1])) {
                                            val += ' ' + shi.label;
                                        }
                                    })
                                }
                            });
                            this.address = value;
                            this.setState({area: val},()=>{console.log(this,this.state.area)});
                            
                    }}
                    >
                    <Item
                    arrow="horizontal"
                    >{'地区'}</Item>
                </Picker>
            </List>


            <Modal
            visible={this.state.nameModal}
                onClose={this.setNameClose}
                closable
                transparent
                maskClosable
                style={{width:'92.8vw'}}
                >
                    <TextareaItem
                        placeholder="设置昵称"
                        rows={1}
                        clear={true}
                        ref = {el => this.nickName = el}
                        style={{marginTop:'5vw',whiteSpace:'normal'}}
                        maxLength='12'
                        onKeyDown={(e)=>{if(e.keyCode === 13){e.preventDefault();this.setName();}}}
                        />
                    <Button style={{margin:'1.2vw auto 0',color:'#00ADB5',width:'72vw'}} onClick={this.setName}>设置</Button>
                </Modal>


                <Modal
                    visible={this.state.qrModal}
                    onClose={()=>{this.setState({qrModal:false})}}
                    // closable
                    transparent
                    maskClosable
                    style={{width:'92.8vw',height:'115vw',boxSizing:'border-box'}}
                    >
                        <div>
                            <img src={this.state.avatar} style={{borderRadius:'15px',width:'25vw',height:'25vw',display:'inline-block',marginLeft:'1vw'}}/>
                            <div style={{display:'inline-block',verticalAlign:'top',paddingTop:'5vw',paddingLeft:'2vw'}}>
                                <p style={{display:'inline-block',fontSize:'4.56vw'}}>{getStorage.getItem('name')}</p><img src={this.state.gender==='男'?genderIcon.male:genderIcon.female} style={{width:'7vw',height:'7vw',display:'inline-block',verticalAlign:'bottom',marginLeft:'2vw'}}/><br/><br/>
                                <p style={{display:'inline-block',fontSize:'3.26vw'}}>{this.state.area}</p>
                            </div>
                            <img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565874741161&di=c2e39bf23713dad5a1d40853b309e3b2&imgtype=0&src=http%3A%2F%2Flink.agropages.com%2FUploadFiles%2FQRCode%2FGidCompany_1288.png' style={{padding:'5vw',height:'76vw',width:'76vw'}}/>
                        </div>
                    </Modal>
        </div>)
    }
}

export default Set;