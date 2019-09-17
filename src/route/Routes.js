import React from 'react';
import history from "../depend/history";
import {Route, Router, Switch} from "react-router-dom";
import {
    MAIN,
    ALBUM,
    SETTINGS,
    SETME,
    GENERAL,
    SUBSCRIBE,
    COLLECTION,
    OTHERUSER
} from "../const/locations";
import FakeMainContainer from '../container/main/fake_MainContainer'
import Album from '../container/main/album'
import Settings from '../container/main/Settings'
import Set from '../container/main/Set'
import General from '../container/main/General'
import Subscribe from '../container/main/Subscribe'
import Collection from '../container/main/Collection'
import OtherUser from '../container/main/OtherUser'

class Routes extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path={MAIN}  component={FakeMainContainer}/>
                    <Route path={ALBUM}  component={Album}/>
                    <Route path={OTHERUSER}  component={OtherUser}/>
                    <Route path={SUBSCRIBE}  component={Subscribe}/>
                    <Route path={SETTINGS}  component={Settings}/>
                    <Route path={COLLECTION}  component={Collection}/>
                    <Route path={SETME}  component={Set}/>
                    <Route path={GENERAL}  component={General}/>
                </Switch>
            </Router>
        );
    }
    
}

export default Routes;