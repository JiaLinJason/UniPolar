import BaseContainer from '../BaseContainer'
import React from  'react'
import './main.less'
import { Icon } from 'antd-mobile'
import { OTHERUSER } from '../../const/locations'
import getStorage from '../../tools/Storage'

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

const styles ={
    ItemsContainer:{
        width:'100vw',
        height:'20vw',
        backgroundColor:'#fff',
        marginBottom:'2px'
    }
}
class Subscribe extends BaseContainer{
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
        return (<div>
            {data.map((item,index)=>{
                return (
                    <div style={styles.ItemsContainer} key={index} onClick={()=>{this.navigate(OTHERUSER,'个人主页',{id:item.userId})}}>
                        <div className='Me_avatar' style={{boxShadow: '0 0 0 #ddd',marginTop:'3.5vw',width:'12vw',height:'12vw'}}>
                            <img src={item.imgUrl} style={{width:'12vw',height:'12vw'}}/>
                        </div> 
                        <div style={{display:'inline-block',height:'20vw',width:'50vw',padding:'3.5vw 0 0 5vw',boxSizing:'border-box'}}>
                        <p style={{fontSize:'4.2vw'}}>{item.name}</p><br/><p style={{fontSize:'3.2vw'}}>粉丝数:{item.fans}</p>
                            </div>
                        <Icon type='right' size='lg' color='#ddd' style={{float:'right',marginTop:'5.5vw',marginRight:'5vw'}}/>
                    </div>)
            })}
            
        </div>)
    }
}
export default Subscribe;