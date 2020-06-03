import React,{Component} from "react"
import {Switch, Route,Redirect} from 'react-router-dom'
import Bossinfo from "../boss/boss";
import Employeeinfo from "../employee/employee";
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../utils";
import {getUser} from '../../redux/actions'
import Employee from "../employeemain/employeemain";
import Boss from "../bossmain/bossmain";
import NotFound from "../../components/not-found/not-found";
import Personal from "../personal/personal";
import Message from "../message/message";
import {NavBar} from "antd-mobile";
import NavFooter from "../../components/footer/navfooter";
import Chat from "../chat/chat";


//操作前端

export class Main extends Component {
    // 组件类和组件对象
    // 给组件对象添加属性

    navList = [ { path: '/boss', // 路由路径
         component: Boss, title: 'Employeelist', icon: 'boss', text: 'boss', },
        { path: '/employee',component: Employee, title: 'Boss list', icon: 'employee', text: 'employee', },
        { path: '/message', component: Message, title: 'message lists', icon: 'message', text: 'message',},
        { path: '/personal', component: Personal, title: 'personal center', icon: 'personal', text: 'personal', }

    ]
componentDidMount() {
    //have logged in but nor login (has userid but not _id) require corresponding user
    const userid = Cookies.get('userid')
    const{_id} = this.props.user
    if(userid && !_id){
        //send
        //自动登录
        console.log("send ajax get uss")
        this.props.getUser()
    }

}
    render() {
        //read userid from cookie
        const userid = Cookies.get('userid');

        if(!userid){
            return <Redirect to= '/login'/>
        }
        const{user}= this.props

        if(!user._id){

            return null
        }else{
            //if _id, go to corresponding htmal
            //if require root path, calculate router corresponding to header and type
            let path = this.props.location.pathname
            if(path ==='/'){
              path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}/>
            }
        }
        //检查用户有没有登录
       /* const{user}= this.props
        if(!user._id){n
            return <Redirect to = '/login'/>
        }*/
       const {navList} = this
        const path = this.props.location.pathname;//请求的路劲
       const currentNav = navList.find(nav=>nav.path===path)//acquire current path
        if(currentNav){
            if(user.type === 'boss'){
                //yincang  第二个
                navList[1].hide = true
            }else{
                navList[0].hide = true
                //第一个
            }
        }
        const {unReadCount}= this.props
        console.log(unReadCount)
        return(
            <div>
                { currentNav? <NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map(nav=> <Route path = {nav.path} component={nav.component}/>)//映射路由
                    }
                <Route path = '/bossinfo' component={Bossinfo}/>
                <Route path = '/employeeinfo' component={Employeeinfo}/>
                <Route path = '/chat/:userid' component={Chat}/>

                <Route path = '/notfound' component={NotFound}/>


                </Switch>
                { currentNav?<NavFooter navList = {navList.filter(nav=>!nav.hide)} unReadCount={unReadCount}/>:null}
            </div>
        )
    }

}
export default connect(
   state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}

)(Main)
