
//select header for boss and employee
import React,{Component} from "react"
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class Headerselector extends Component {
    static propTypes = {
        setHeader : PropTypes.func.isRequired

    }
    state ={
        icon:null
    }
    handleClick =({text, icon})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }
    constructor(props) {
        super(props);
        this.headerList = []
        for (let i = 0; i < 20; i++){
            this.headerList.push({
                text:'头像' + (i + 1),
                icon:require(`../../asserts/images/头像${i+1}.png`)
            })
        }
    }

    render() {
        const{icon} = this.state
        const listHeader = !icon? 'please save your header':(
            <div>
                header has selected: <img src ={icon}/>
            </div>
        )
        return(
            <div>
                <List renderHeader={()=>listHeader}>
                    <Grid data = {this.headerList} columnNum={5} onClick={this.handleClick}>

                    </Grid>

                </List>
            </div>
        )
    }

}
