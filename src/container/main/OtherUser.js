import BaseContainer from '../BaseContainer'
import React from  'react'
import './main.less'
import { Button } from 'antd-mobile';

const data = [
    {
        userId: 215665 ,
        imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2259578736,3951454991&fm=26&gp=0.jpg',
        name:'Martin',
        fans: 55,
    },
    {
        userId: 124846 ,
        imgUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3869844642,2691682486&fm=26&gp=0.jpg',
        name:'Leonerd',
        fans: 125,
    },
    {
        userId: 100029 ,
        imgUrl:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2803900076,1405594164&fm=26&gp=0.jpg',
        name:'TuanTuan',
        fans: '203.9w',
    },
    {
        userId: 305548 ,
        imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=590107196,4020422541&fm=26&gp=0.jpg',
        name:'野原さん',
        fans: '1.5k',
    },
    {
        userId: 814561 ,
        imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2885034665,2268866460&fm=26&gp=0.jpg',
        name:'War MachineRox',
        fans: '109.3w',
    },
]

const newData =[
    {
        type:'topic_text',
        time:'2019-08-05 08:53:37',
        context:'据港媒报道，香港警方4日晚在其官方账户发布一条介绍“颜色水”的视频。视频介绍，“颜色水”其实就是可食用的颜料，本身无毒，可用“流动高压液喷装置”或背负的催泪水剂喷射器发射，如被喷射颜料水，会残留在身体或衣服表面，有需要时警方能借此辨认个别人士是否在示威现场。有关装置已完成测试及训练，可随时使用。',
        title:'香港警方发布"新装备"催泪水中掺颜料水标记示威者',
        link:'https://xw.qq.com/cmsid/20190805A00GGZ00',
    },
    {
        type:'topic_text',
        time:'2019-08-05 08:53:37',
        context:'据港媒报道，香港警方4日晚在其官方账户发布一条介绍“颜色水”的视频。视频介绍，“颜色水”其实就是可食用的颜料，本身无毒，可用“流动高压液喷装置”或背负的催泪水剂喷射器发射，如被喷射颜料水，会残留在身体或衣服表面，有需要时警方能借此辨认个别人士是否在示威现场。有关装置已完成测试及训练，可随时使用。',
        title:'香港警方发布"新装备"催泪水中掺颜料水标记示威者',
        link:'https://xw.qq.com/cmsid/20190805A00GGZ00',
    },
    {
        type:'topic_text',
        time:'2019-08-05 08:53:37',
        context:'据港媒报道，香港警方4日晚在其官方账户发布一条介绍“颜色水”的视频。视频介绍，“颜色水”其实就是可食用的颜料，本身无毒，可用“流动高压液喷装置”或背负的催泪水剂喷射器发射，如被喷射颜料水，会残留在身体或衣服表面，有需要时警方能借此辨认个别人士是否在示威现场。有关装置已完成测试及训练，可随时使用。',
        title:'香港警方发布"新装备"催泪水中掺颜料水标记示威者',
        link:'https://xw.qq.com/cmsid/20190805A00GGZ00',
    },
]
const commitList =[
    {
        type:'topic_text',
        time:'2019-08-05 08:53:37',
        context:'123132313211',
        title:'香港警方发布"新装备"催泪水中掺颜料水标记示威者',
        link:'https://xw.qq.com/cmsid/20190805A00GGZ00',
    },
]
const styles = {
    userBar:{
        width:'100vw',
        height:'32vw',
        backgroundColor:'#00ADB5',
        boxShadow:'0 0 5px #00ADB5',
        boxSizing:'border-box',
        paddingTop:'15vw'
    },
    topicText:{
        marginTop:'3.3vw',
        marginLeft:'4vw',
        height:'5vw',
        width:'72.8vw',
        fontSize:'4.42vw',
        fontWeight:'bold',
        verticalAlign:'top',
        display:'inline-block',
        overflow:'hidden',
        borderBottom:'1px solid #ddd',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis'
    },
    context:{
        width:'82.8vw',
        height:'5vw',
        display:'inline-block',
        overflow:'hidden',
        fontSize:'3.42vw',
        marginTop:'1.3vw',
        marginLeft:'4vw',
        overflow:'hidden',
        lineHeight:'5.2vw',
        whiteSpace:'nowrap',
        textOverflow:'ellipsis'
    },
    topicItem:{
        width:'92.8vw',
        height:'18vw',
        borderRadius:'20px',
        backgroundColor:'#fff',
        margin:'2vw auto 4vw',
        boxShadow: "0 1px 5px #eeeeee",
        overflow:'hidden',
    },
}

class OtherUser extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            subscribe: true,
        };
        this.userId = window.location.search.split('id=')[1];
    }
    handleCancel=()=>{
        this.setState({
            subscribe : this.state.subscribe?false:true
        })
        if(this.state.subscribe){
            this.toast('取消关注')
        }else{
            this.toast('关注')
        }
        
    }
    render(){
        return (<div style={{height:'100vh'}}>
            {data.map((item,index)=>{
                if(item.userId.toString()===this.userId){
                    this.userName = item.name;
                    return ( <div style={styles.userBar} key={index}>
                <div className='Me_avatar'>
                        <img src={item.imgUrl} style={{width:'20vw',height:'20vw',boxShadow:'0 0 20px #05B2BA',}}/>
                    </div>
                    <div style={{display:'inline-block',marginLeft:'6vw',width:'68vw'}}>
                        <p style={{fontSize:'5.36vw',display:'inline-block',width:'68vw',textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>{item.name}</p><br/>
                        <p style={{fontSize:'3.36vw',display:'inline-block'}}>粉丝: {item.fans}</p>
                        <Button type={this.state.subscribe?'ghost':'warning'} style={{float:'right',display:'inline-block',color:'#fff',border:this.state.subscribe?'1px solid #fff':null,marginRight:'5vw'}} size="small" onClick={this.handleCancel}>{this.state.subscribe?'取消关注':'+ 关注'}</Button>
                    </div>
            </div>)
                }else{return null}
            })}
            <div style={{height:'82.01vh',backgroundColor:'#FFF',width:'100vw',paddingTop:'12vw',boxSizing:'border-box'}}>
                <p style={{fontSize:'4.3vw',color:'#999',marginLeft:'6vw',color:'#A8D8EA'}}>Ta发表过的话题</p>
                <hr style={{width:'72vw',marginLeft:'6vw',}} color='#A8D8EA'/>
                    {newData.map((item,index)=>{
                        return (<div key={index}style={{}}>
                                    <div style={styles.topicItem}>
                                        <div style={styles.topicText}>{item.title}</div>
                                        <div style={styles.context}>{item.context}</div>
                                    </div>
                                </div>)
                    })}
                <p style={{fontSize:'4.3vw',color:'#999',marginLeft:'6vw',color:'#A8D8EA'}}>Ta发表过的评论</p>
                <hr style={{width:'72vw',marginLeft:'6vw',}} color='#A8D8EA'/>
                {commitList.map((item,index)=>{
                    return (<div key={index}>
                                <div style={styles.topicItem}>
                                    <div style={styles.topicText}>{item.title}</div>
                                    <div style={styles.context}>{this.userName+': '+item.context}</div>
                                </div>
                            </div>)
                })}
           </div>
          
                    
           
        </div>)
    }
}
export default OtherUser;