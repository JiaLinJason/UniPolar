import BaseContainer from '../BaseContainer'
import React from  'react'
import { Carousel,Popover, NavBar, Icon,Slider, NoticeBar, List } from 'antd-mobile'
import Config from '../../Config'
import PixelUtil from '../../tools/PixelUtil'
import './main.less'

const Item = Popover.Item;
const Istem = List.Item;
const Brief = Item.Brief;

const styles ={
  statusBar:{
      height:PixelUtil.getStatusBarHeight(),
      width:'100vw',
      backgroundColor:'#fff',
  }
}

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class UniPolar extends BaseContainer{
    constructor(props){
        super(props);
        this.state={
            data:[],
            imgHeight: 176,
            visible: false,
            selected: '',
            red:150,
            green:60,
            blue:150,
        }
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
      }

      onSelect = (opt) => {
        // console.log(opt.props.value);
        
        this.setState({
          visible: false,
          selected: opt.props.value, 
        });
      };

      handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      };

      handleClick(){
        console.log('123')
      }
    render(){
        const { UserId } = this.props;
        return (<div id='uniPolar-container' className='outer-container'>
        <div style={styles.statusBar}/>
        <NavBar
        mode="light"
        rightContent={
          <Popover
            overlayStyle={{ color: Config.enableColor }}
            visible={this.state.visible}
            overlay={[
              (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
              (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
              (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }}>Help</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" color={Config.themeColor} />
            </div>
          </Popover>
        }
      >
        <p style={{color:`${Config.enableColor}`,fontSize:'4.73vw'}}>
            UniPolar
        </p>
      </NavBar>
      <NoticeBar mode='closable' marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: The arrival time of incomes and transfers of infinite loop will be delayed during National Day.
      </NoticeBar>
            <Carousel autoplay={true} infinite>
                {this.state.data.map(val => (
                  
                    <img
                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                        alt=""
                        key={val}
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: 'auto' });
                        }}
                    />
                    
                ))}
                </Carousel>

                <div style={{width:'100vw',height:'5vw',backgroundColor:`rgb(${this.state.red},${this.state.green},${this.state.blue})`,marginTop:'8vw'}}></div>

                <Slider
                  style={{ margin:'6vw 10vw'}}
                  defaultValue={150}
                  trackStyle={{
                    backgroundColor: '#f00',
                  }}
                  handleStyle={{
                    borderColor: '#f00',
                  }}
                  min={0}
                  max={255}
                  onChange={name=>{
                      this.setState({
                        red:name
                      })
                  }}
                /><br/>
                <Slider
                  style={{ margin:'6vw 10vw'}}
                  defaultValue={60}
                  trackStyle={{
                    backgroundColor: '#0f0',
                  }}
                  handleStyle={{
                    borderColor: '#0f0',
                  }}
                  min={0}
                  max={255}
                  onChange={name=>{
                    this.setState({
                      green:name
                    })
                  }}
                /><br/>
                <Slider
                  style={{ margin:'6vw 10vw'}}
                  defaultValue={150}
                  trackStyle={{
                    backgroundColor: '#00f',
                  }}
                  handleStyle={{
                    borderColor: '#00f',
                  }}
                  min={0}
                  max={255}
                  onChange={name=>{
                    this.setState({
                      blue:name
                    })
                  }}
                />
            <div 
              style={{height:'12vw',width:'90vw',borderRadius:'10px',margin:'10vw auto',backgroundColor:'#fff',textAlign:'center',lineHeight:'12vw',fontWeight:'lighter',fontSize:'4.2vw',boxShadow:'0 0 3px #ddd'}} 
              ref={com => this.dd = com} 
              onTouchStart={()=>{this.dd.style.backgroundColor='#ddd';}}
              onTouchCancel={()=>{console.log('Break(Cancel)');this.dd.style.backgroundColor='#fff';}}
              onTouchEnd={()=>{this.dd.style.backgroundColor='#fff';}}
              onPointerUp={()=>{this.handleClick()}}>
                Button
              </div>
              <List>
                <Istem
                  thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                  arrow="horizontal"
                  onClick={() => {}}
                >My wallet</Istem>
                <Istem
                  thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                  onClick={() => {}}
                  arrow="horizontal"
                  extra={'123'}
                >
                  My Cost Ratio
                </Istem>
              </List>
        </div>)
    }
}
export default UniPolar;