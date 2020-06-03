import React,{Component} from "react"
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body
class UserList extends Component {
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        const{userList} = this.props
        return(
            <WingBlank>
                <QueueAnim type = 'scale'>
                { userList.map(user => ( <div key={user._id}>

                    <WhiteSpace/>

                    <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                        <Header thumb={user.header ? require(`../../asserts/images/${user.header}.png`) : null} extra={user.username} />
                        <Body>
                            <div>
                                profession: {user.post}
                        </div>
                            {user.company ? <div>company: {user.company}</div> : null}

                            {user.salary ? <div>salary: {user.salary}</div> : null}
                        <div>intro: {user.info}

                        </div>
            </Body>
            </Card> </div> )) } </QueueAnim>

            </WingBlank> )


    }

}

export default withRouter(UserList)
