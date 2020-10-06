import React, { Component } from 'react'
import { connect } from 'dva'
@connect((store) => store.user)
class header extends Component {
    componentDidMount() {
        this.getUserInfo()
    }
    async getUserInfo() {
        const {dispatch,token}=this.props
        await dispatch({ type: 'user/getIdByToken', payload: token })
        dispatch({ type: 'user/getUserById', payload: this.props.uid })
    }
    render() {
        const {userInfo} =this.props
        return (
            <div className='headerbox'>
                <div className="right">
                    <img src={userInfo.avatar} />
                    <span>{userInfo.nickname}</span>
                </div>
                <div></div>
            </div>
        )
    }
}
export default header