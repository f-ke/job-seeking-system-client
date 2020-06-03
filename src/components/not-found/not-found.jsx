import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
    render() {
    return ( <div>
        <div>
            <h2>Sorry the html is not found!</h2>
        <Button type="primary" onClick={() => this.props.history.replace("/")} > return </Button>
    </div>
    </div>
    )}
}
export default NotFound
