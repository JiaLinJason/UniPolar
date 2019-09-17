import BaseContainer from '../BaseContainer'
import React from  'react'
import PixelUtil from '../../tools/PixelUtil'
import './main.less'
import getStorage from '../../tools/Storage';

const styles ={
    statusBar:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#fff',
    },
    albumContainer:{
        width:'100vw',
        backgroundColor:'#fff',
        boxSizing:'border-box',
        paddingTop:'1vw',
        paddingLeft:'1vw',
    },
    photos:{
        width:'23.67vw',
        height:'23.67vw',
        display:'inline-block',
        margin:'0 1vw 1vw 0'
    },
}

class Album extends BaseContainer{
    constructor(props){
        super(props)
        this.state={
            username:''
        }
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
            <div style={styles.statusBar} />
                 <div style={styles.albumContainer}>
                 <img style={styles.photos} src='http://img0.imgtn.bdimg.com/it/u=2786741331,312930537&fm=26&gp=0.jpg'/>
                 <img style={styles.photos} src='http://img4.imgtn.bdimg.com/it/u=1688026885,2773767715&fm=26&gp=0.jpg'/>
                 <img style={styles.photos} src='http://img1.imgtn.bdimg.com/it/u=1378897116,1103132713&fm=26&gp=0.jpg'/>
                 <img style={styles.photos} src='http://img2.imgtn.bdimg.com/it/u=270262348,3168648358&fm=26&gp=0.jpg'/>
                 <img style={styles.photos} src='http://img0.imgtn.bdimg.com/it/u=112374086,211884220&fm=26&gp=0.jpg'/>
            </div>
            <div style={{height:'12vw'}} />
        </div>)
    }
}

export default Album;