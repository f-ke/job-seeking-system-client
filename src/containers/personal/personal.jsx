import React,{Component} from "react"
import {connect} from 'react-redux'
//message main client container
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {
    logOut=()=>{
        Modal.alert('log out','are your sure to log out?',[
            {text:'cancel'},
            {text:'sure',
            onPress:()=>{
                //clear userid in cookie and user in redux
                Cookies.remove('userid')
                this.props.resetUser()

            }}
        ])
    }

    render() {
        const{username, type, header,company,post,salary,info} = this.props.user
        return(
            <div>
                <Result img={<img src={require(`../../asserts/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                        title={username} message={company} />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                    <Brief>Profession: {post}</Brief> {info?<Brief>Introduction: {info}</Brief>:null}
                        {salary?<Brief>Salary: {salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/> <List> <Button type='warning' onClick={this.logOut}>Log out</Button> </List> </div>


        )
    }

}
export default connect(
    state=>({user:state.user}),
    {resetUser}
)(Personal)
