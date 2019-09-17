import BaseContainer from '../BaseContainer'
import React from  'react'
import './main.less'
import getStorage from '../../tools/Storage'

const styles = {
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
    topicTitle:{
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
    },
    topicText:{
        marginTop:'3.3vw',
        marginLeft:'4vw',
        width:'72.8vw',
        fontSize:'4.42vw',
        fontWeight:'bold',
        verticalAlign:'top',
        display:'inline-block',
        overflow:'hidden',
        borderBottom:'1px solid #ddd'
    },
    context:{
        width:'82.8vw',
        display:'inline-block',
        overflow:'hidden',
        fontSize:'3.42vw',
        marginTop:'1.3vw',
        marginLeft:'4vw',
        overflow:'hidden',
        lineHeight:'5.2vw',
    }
}

const newData =[
    {
        type:'topic_news',
        time:'2019-08-05 08:53:37',
        imgUrl:'https://inews.gtimg.com/newsapp_bt/0/9930148388/641',
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


class Collection extends BaseContainer{
    constructor(props){
        super(props)
        this.state={}
    }

    componentWillMount(){
        const uerN = getStorage.getItem('name')
        if(uerN==='null'){
             return;
        }
        this.username = uerN;
    }

    render(){
        return(<div>
            {newData.map((item,index)=>{
                const { type } = item
                if(type === 'topic_news'){
                    const { imgUrl, title } = item;
                    return (<div key={index}>
                                <div style={styles.topicItem}>
                                    <div style={styles.topicImgs}>
                                        <img src={imgUrl} style={{width:'92.8vw'}} />
                                    </div>
                                    <div style={styles.topicTitle}>{title}</div>
                                </div>
                            </div>)
                }else if(type === 'topic_text'){
                    const { context, title } = item;
                    return (<div key={index}>
                        <div style={styles.topicItem}>
                            <div style={styles.topicText}>{title}</div>
                            <div style={styles.context}>{context}</div>
                        </div>
                    </div>)
                }
                else {return null}
            })}
            
        </div>)
    }
}
export default Collection;
