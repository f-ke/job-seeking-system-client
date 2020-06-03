import React,{Component} from "react"
import {connect} from 'react-redux'
import UserList from "../../components/user_list/user_list";
import {getUserList} from "../../redux/actions"
//boss main client container
 class Boss extends Component {
   componentDidMount() {
       this.props.getUserList('employee')
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
)(Boss)
