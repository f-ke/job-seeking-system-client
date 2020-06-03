import React,{Component} from "react"

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,

    Button
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import {Redirect} from 'react-router-dom';

 class Login extends Component {

    state = {
        username:"",
        password:"",

    }
    Login =()=>{
        this.props.login(this.state)

    }
    handleChange = (name, val)=>{
        this.setState({[name]:val})//属性名不是name而是name的值
    }
    toregister =()=>{
        this.props.history.replace('/register')
    }
    render() {

        const{msg,reDirectto} = this.props.user;
        //如果有值说明需要重定向
        if(reDirectto){
            return <Redirect to ={reDirectto}/>
        }


        return(
            <div>
                <NavBar>Job&nbsp;website</NavBar>

                <Logo/>
                <WingBlank>
                    <List >
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <WhiteSpace/>
                        <InputItem placeholder=' input username' onChange={val =>{this.handleChange('username',val)}}>username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder=' input password'  type = 'password' onChange={val =>{this.handleChange('password',val)}}>password:</InputItem>
                        <WhiteSpace/>
                        <Button type = 'primary'onClick={this.Login}>Log in</Button>
                        <Button onClick={this.toregister}>Register</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }


}
export default connect(
    state =>({user:state.user}),
    {login}
)(Login)
