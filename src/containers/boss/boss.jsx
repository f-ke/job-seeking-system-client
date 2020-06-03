//boss router
import React,{Component} from "react"
import {connect} from 'react-redux'
import {NavBar, InputItem, TextareaItem,Button} from 'antd-mobile'
import Headerselector from "../../components/header-selector/header-selector";
import {Redirect} from 'react-router-dom'
import {updateuser} from "../../redux/actions";

class Bossinfo extends Component {
   state={
       header: '', // 头像名称
       post: '', // 职位
       info: '', // 个人或职位简介
       company: '', // 公司名称
       salary: ''

   }
   handleChange=(name, val)=>{
       this.setState({[name]:val})

   }
   save =()=>{
       this.props.updateuser(this.state)
       console.log(this.state)}

    setHeader =(header)=>{
       this.setState({header})
    }

    render() {
       const {header,type} = this.props.user
        if(header){
            //information complete
            const path = type==='employee'?'/employee':'/boss'
            return <Redirect to={path}/>
        }
        return(
            <div>
                <NavBar>Boss personal information</NavBar>
                <Headerselector setHeader = {this.setHeader}/>
                <InputItem onChange={val=>{this.handleChange('post',val)}}>Job:</InputItem>
                <InputItem onChange={val=>{this.handleChange('company',val)}}>Company: </InputItem>
                <InputItem onChange={val=>{this.handleChange('salary',val)}}>Salary:</InputItem>
                <TextareaItem title="Require:" rows={3} onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
                <Button type = 'primary' onClick={this.save}>Save</Button>
            </div>
        )
    }

}
export default connect(
    state =>({user:state.user}),
    {updateuser}

    )(Bossinfo)
