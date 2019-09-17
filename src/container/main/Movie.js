import BaseContainer from '../BaseContainer'
import React from  'react'
import { SearchBar } from 'antd-mobile';
import PixelUtil from '../../tools/PixelUtil'
import './main.less'

const styles ={
    statusBar:{
        height:PixelUtil.getStatusBarHeight(),
        width:'100vw',
        backgroundColor:'#fff',
        position:'fixed',
        zIndex:'99'
    },
    movieItems:{
        width:'86.33vw',
        height:'33.26vw',
        borderRadius:'15px',
        boxShadow: "0 1px 5px #eeeeee",
        margin:'0 auto 2vw',
        overflow:'hidden'
    },
    poster:{
        height:'33.26vw',
        width:'23.4vw',
        marginRight:'3vw',
        display:'inline-block'
    },postText:{
        height:'33.26vw',
        width:'59.92vw',
        lineHeight:'6.5vw',
        display:'inline-block',
        float:'right',
    },
}
const data = [
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
    {
        posterurl:'https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
        name:'Shutter Island',
        time:'2010 Spring',
        director:'Martin Scorsese'
    },
];

class Movie extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            op : 0
        }
    }
    handleclick=()=>{
        this.toast('应版权方要求,资源暂时下架')
    }
    sdComponentDidMount(){
        this.roll.parentNode.parentNode.addEventListener('scroll',()=>{
        })
    }
    //透明顶部栏显示效果
    // componentDidMount(){
    //     this.scroll.addEventListener('scroll',()=>{
    //         const visibleHeight = 128
    //         const newOp = 1-(visibleHeight-this.scroll.scrollTop)/visibleHeight
    //         if(newOp>=0){
    //              this.setState({
    //                 op : newOp
    //             })
    //         }else{
    //             return
    //         }
           
    //     })
    // }

    handleSearch=()=>{
        this.scroll.style.display = 'none'
    }
    handleShow=()=>{
        this.scroll.style.display='inline'
    }
    render(){
        return (<div id='uniPolar-container' className='outer-container' ref={el =>this.roll = el}> 
        {/* <div style={{position:'absolute', height:'25vw',paddingTop:PixelUtil.getStatusBarHeight(),width:'100vw',backgroundColor:`rgba(0,174,175,${this.state.op})`}} >

            </div> */}
            <div style={styles.statusBar}/>
            <SearchBar
                placeholder="Search"
                style={{width:'100vw',position:'fixed',top:PixelUtil.getStatusBarHeight(),}}
                ref={ref => this.manualFocusInst = ref}
                onFocus={this.handleSearch}
                onBlur={this.handleShow}
            />
            <div style={{width:'100vw',paddingTop:PixelUtil.getStatusBarHeight()+50,boxSizing:'border-box'}} ref={el => this.scroll = el}>
                {data.map((item,index)=>{
                    const {posterurl,name,time,director} = item;
                    return (<div style={styles.movieItems} key={index} onClick={this.handleclick}>
                        <img src={posterurl} style={styles.poster}/>
                        <div style={styles.postText}>
                            <p className='movieTextTitle'>{name}</p>
                            <br /><br />
                            <p className='movieText'>Time :{time}</p>
                            <p className='movieText'>Director :{director}</p>
                        </div>
                    </div>)
                })}
            </div>
        </div>)
    }
}
export default Movie;