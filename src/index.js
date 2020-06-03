import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd-mobile'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";
import {Provider} from 'react-redux'
import stor from "./redux/stor";
import './asserts/css/index.less'
import './test/socketIO_TEST'

ReactDOM.render(
    (<Provider store ={stor}>
        <HashRouter>

        <Switch>
            <Route path = '/register' component={Register}/>
            <Route path = '/login' component={Login}/>
            <Route component={Main}/>
        </Switch>
    </HashRouter>
</Provider>),
    document.getElementById('root')
);
