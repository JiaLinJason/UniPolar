import BaseContainer from '../BaseContainer'
import React from  'react'
import {IMG_PLUS,IMG_FORWARD_GRAY} from '../../imgs'
import PixelUtil from '../../tools/PixelUtil'
import { NavBar, Button,Modal,Toast,TextareaItem,PullToRefresh } from 'antd-mobile'
import Config from '../../Config'
import './main.less'
import { equals } from '../../tools/CommomUtil';

let data = [];

const styles={
    statusBar:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#fff',
    },
    topicTime:{
        textAlign:'center',
        fontSize:'3.13vw',
        color:'#bfbfbf'
    },
    topicItem:{
        width:'92.8vw',
        height:'55.6vw',
        borderRadius:'20px',
        backgroundColor:'#fff',
        margin:'2vw auto 4vw',
        boxShadow: "0 1px 5px #eeeeee",
        overflow:'hidden',
    },topicImgs:{
        width:'92.8vw',
        height:'43.3vw',
        overflow:'hidden'
    },
    topicText:{
        marginTop:'1.3vw',
        marginLeft:'4vw',
        width:'72.8vw',
        fontSize:'4.42vw',
        fontWeight:'bold',
        verticalAlign:'top',
        display:'inline-block',
        overflow:'hidden'
    },
    topicIcon:{
        display:'inline-block',
        width:'16vw',
        height:'43.3vw',
        float:'right'
    }
}


class Topic extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            newTopic:0,
            modalVisible:false,
            refreshing: false,
        }
    }

    componentWillMount(){
        this.setState({
            newTopic: data.length
        },()=>{
            this.props.count(this.state.newTopic)
        })
    }

    deleteNewTopic=()=>{
        data = [];
        this.setState({
            newTopic: 0
        },()=>{
            this.props.count(this.state.newTopic)
        });
    }

    handlePlus=()=>{
        this.setState({
            modalVisible:true
        })
    }

    handleSuccess=()=>{
        if(equals(this.title.state.value,'')){
            this.toast('请输入标题');
            return
        }
        if(equals(this.content.state.value,'')){
            this.toast('请输入内容');
            return
        }
        const newData = {
            time:'2019-08-05 08:53:37',
            imgUrl:'https://inews.gtimg.com/newsapp_bt/0/9930148388/641',
            title:'香港警方发布"新装备"催泪水中掺颜料水标记示威者',
            link:'https://xw.qq.com/cmsid/20190805A00GGZ00',
        };
        this.setState({
            modalVisible:false
        })
        
        Toast.loading('',0.5,()=>{
            data.push(newData);
            this.updateState();
            
        })
    }
    updateState(){
        this.setState({
            newTopic: this.state.newTopic+1
        },()=>{
            this.props.count(this.state.newTopic)
        })
    }
    handleJump(link,index){
        data.splice(index,1)
        this.setState({
            newTopic: this.state.newTopic-1
        },()=>{
            this.props.count(this.state.newTopic)
        })
    }
    onClose=()=>{
        this.setState({
            modalVisible:false
        })
    }

    render(){
        return(<div id='uniPolar-container' className='outer-container' style={{position:'absolute'}}>
            <div style={styles.statusBar}/>
            <NavBar mode="light">
                <p style={{color:`${Config.enableColor}`,fontSize:'4.73vw'}}>
                    Topic
                </p>
            </NavBar>
           
            <PullToRefresh
                damping={150}
                ref={el => this.ptr = el}
                style={{height:'85.9vh',overflow:'auto'}}
                direction={'down'}
                distanceToRefresh={45}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => {
                    this.setState({ refreshing: false });
                }, 1000);
                }}
            > 
                {data.map((item,index)=>{
                    const { time,imgUrl,title } = item
                    return (<div onClick={this.handleJump.bind(this,item.link,index)} key={index}>
                        <p style={styles.topicTime}>{time}</p>
                        <div style={styles.topicItem}>
                            <div style={styles.topicImgs}>
                                <img src={imgUrl} style={{width:'92.8vw'}} />
                            </div>
                            <div style={styles.topicText}>{title}</div>
                            <div style={styles.topicIcon}>
                            <img src={IMG_FORWARD_GRAY} style={{width:'2.13vw',height:'3.87vw',float:'right',marginRight:'6.2vw',marginTop:'3.5vw'}}/>
                            </div>
                            
                        </div>
                    </div>)
                })} 
                <Button style={{width:'50vw',margin:'3vw auto'}} 
                    type='warning' 
                    onClick={this.deleteNewTopic}
                    disabled={this.state.newTopic<=0?true:false}
                >Mark All Read</Button>
                </PullToRefresh>
                
               

               
            

            

            <div className='plusTopic' onClick={this.handlePlus.bind(this)}>
                <img src={IMG_PLUS} style={{width:'9vw',height:'9vw',margin:'2vw 0 0 2vw'}}/>
            </div>

            <Modal
                visible={this.state.modalVisible}
                onClose={this.onClose}
                closable
                transparent
                maskClosable
                style={{width:'92.8vw'}}
                >
                <div style={{ height:'85vw', overflow: 'scroll' }}>
                   
                    <div style={{margin:'0.5vw auto',color:'#999',textAlign:'center'}}>
                        标题
                    </div>
                    <TextareaItem
                        placeholder="Title.."
                        rows={1}
                        clear={true}
                        maxLength={50}
                        ref = {el => this.title = el}
                        />
                    <div style={{margin:'0 auto',color:'#999',textAlign:'center'}}>
                        内容
                    </div>
                    <TextareaItem
                        placeholder="Content of Topic you want to create"
                        rows={5}
                        clear={true}
                        ref = {el => this.content = el}
                        />
                    <Button style={{marginTop:'1.2vw',color:'#00ADB5'}} onClick={this.handleSuccess}>发起话题</Button>
                </div>
            </Modal>
        </div>)
    }

}

export default Topic;