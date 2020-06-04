import React,{Component} from "react"
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {connect}from 'react-redux';
import {register} from '../../redux/actions';
import {Redirect} from 'react-router-dom';
const ListItem = List.Item


 class Register extends Component {
  state = {
      username:"",
      password:"",
      password2:"",
      type:"employee"
  }
  c
      register =()=>{
          // console.log(this.state)
          this.props.register(this.state)

      }


  handleChange = (name, val)=>{
      this.setState({[name]:val})//属性名不是name而是name的值
  }
  tologin =()=>{
      this.props.history.push('/login')
  }
    render() {
      const{type} = this.state;
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

                        <InputItem placeholder=' input username' onChange={val =>{this.handleChange('username',val)}}>username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder=' input password'  type = 'password' onChange={val =>{this.handleChange('password',val)}}>password:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder=' confirm  password' type = 'password' onChange={val =>{this.handleChange('password2',val)}}>password confirm:</InputItem>
                        <WhiteSpace/>
                        <List.Item>
                            <span>type:</span>&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'employee'} onChange={val=>this.handleChange('type','employee')}>employee</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio  checked={type === 'boss'} onChange={val=>this.handleChange('type','boss')}>Boss</Radio>
                        </List.Item>
                        <WhiteSpace/>
                        <Button type = 'primary'onClick={this.register}>register</Button>
                        <Button onClick={this.tologin}>have registered</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }

}
export default connect(
    state =>({user:state.user}),
    {register}
)(Register)
