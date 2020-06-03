import React,{Component} from "react"
import {connect} from 'react-redux'
import UserList from "../../components/user_list/user_list";
import {getUserList} from "../../redux/actions"
//boss main client container
class Employee extends Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return(
            <UserList userList={this.props.userList}/>
        )
    }

}
export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(Employee)
