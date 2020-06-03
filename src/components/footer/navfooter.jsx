import React,{Component} from "react"
import {TabBar} from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

 class NavFooter extends Component {
    static propTypes ={
        navList: PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }

    render() {
        let {navList,unReadCount} = this.props

        console.log(unReadCount)//filter hide = true;

        const path = this.props.location.pathname//请求路劲,然而这个不是路由组件，所以我们希望访问使用
        //使用路由组件库提供的函数
        return(

                <TabBar>
                    {
                        navList.map((nav, index)=>(
                         <Item key = {nav.path}
                                title ={nav.text}
                               badge = {nav.path==='/message'?unReadCount:0}
                               icon = {{uri:require(`./images/${nav.icon}.png`)}}
                               selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                               selected={nav.path==path}
                               onPress={()=>this.props.history.replace(nav.path)}

                         />//数据有自己的标识可以不用index
                        ))

                    }
                </TabBar>

        )
    }

}
export default withRouter(NavFooter)//向外暴露withrouter()包装产生的组件,内部会传入路由组件的固有属性，history ,location
