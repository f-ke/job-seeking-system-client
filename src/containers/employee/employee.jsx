//boss router
import React,{Component} from "react"
import {connect} from 'react-redux'
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import Headerselector from "../../components/header-selector/header-selector";
import {updateuser} from "../../redux/actions";
import {Redirect} from 'react-router-dom'

class Employeeinfo extends Component {
    state={
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介


    }
    handleChange=(name, val)=>{
        this.setState({[name]:val})

    }
    save =()=>{
        // console.log(this.state)}
        this.props.updateuser(this.state);}

     setHeader =(header)=>{
        this.setState({header})
    }


    render() {
        const {header,type} = this.props.user
        if(header){
            //information complete
            const path = type==='employee'?'/employee':'/laoban'
            return <Redirect to={path}/>
        }
        return(
            <div>
                <NavBar>Employee personal information</NavBar>
                <Headerselector setHeader = {this.setHeader}/>
                <InputItem  onChange={val=>{this.handleChange('post',val)}}>Job:</InputItem>
                <TextareaItem title="Introduction:" rows={3}  onChange={val=>{this.handleChange('info',val)}}></TextareaItem>
                <Button type = 'primary' onClick={this.save}>Save</Button>
            </div>
        )
    }

}
export default connect(
    state =>({user:state.user}),
    {updateuser}

)(Employeeinfo)
