import BaseContainer from '../BaseContainer'
import React from  'react'
import { TabBar } from 'antd-mobile'
import UniPolar from './Unipolar'
import Movie from './Movie'
import Config from '../../Config'
import Topic from './Topic'
import Me from './Me'
import './main.less'
import {
    IMG_HOME_DISABLE,
    IMG_HOME_ENABLE,
    IMG_MOVIE_DISABLE,
    IMG_MOVIE_ENABLE,
    IMG_TOPIC_DISABLE,
    IMG_TOPIC_ENABLE,
    IMG_USER_DISABLE,
    IMG_USER_ENABLE,
} from '../../imgs'


class FakeMainContainer extends BaseContainer{
    constructor(props){
        super(props)
        this.state={
            id:'225',
            selectedTab:'UniPolar',
            newTopic:0
        }
    }
    countTpoic(data){
      this.setState({
        newTopic:data
      })
    }

    render(){
        const {} = this.state
        //console.log('father rendering...')
        return (<div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <TabBar
            unselectedTintColor={Config.disableColor}
            tintColor={Config.enableColor}
            barTintColor='white'
            >
                <TabBar.Item
                    title="UniPolar"
                    key="UniPolar"
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${IMG_HOME_DISABLE}) center center /  21px 21px no-repeat` }}
                    />}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${IMG_HOME_ENABLE}) center center /  21px 21px no-repeat` }}
                      />}
                    selected={this.state.selectedTab === 'UniPolar'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'UniPolar',
                        });
                      }}
                >
                    <UniPolar UserId={this.state.id}/>
                </TabBar.Item>
                <TabBar.Item
                    title="Movie"
                    key="Movie"
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${IMG_MOVIE_DISABLE}) center center /  21px 21px no-repeat` }}
                    />}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${IMG_MOVIE_ENABLE}) center center /  21px 21px no-repeat` }}
                      />}
                    selected={this.state.selectedTab === 'Movie'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'Movie',
                        });
                      }}
                >
                    <Movie />
                </TabBar.Item>
                <TabBar.Item
                    title="Topic"
                    key="Topic"
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${IMG_TOPIC_DISABLE}) center center /  21px 21px no-repeat` }}
                    />}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${IMG_TOPIC_ENABLE}) center center /  21px 21px no-repeat` }}
                      />}
                    badge={this.state.newTopic}
                    selected={this.state.selectedTab === 'Topic'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'Topic',
                        });
                      }}
                >
                    <Topic count={this.countTpoic.bind(this)}/>
                </TabBar.Item>
                <TabBar.Item
                    title="Me"
                    key="Me"
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${IMG_USER_DISABLE}) center center /  21px 21px no-repeat` }}
                    />}
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url(${IMG_USER_ENABLE}) center center /  21px 21px no-repeat` }}
                      />}
                    selected={this.state.selectedTab === 'Me'}
                    onPress={() => {
                        this.setState({
                          selectedTab: 'Me',
                        });
                      }}
                >
                    <Me/>
                </TabBar.Item>
            </TabBar>
        </div>)
    }
}
export default FakeMainContainer;