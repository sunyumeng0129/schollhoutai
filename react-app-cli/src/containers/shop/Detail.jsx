import React, { Component, createElement, useState } from 'react'
import { _getShopLists, _ShopDetail } from '../../api/shop'
import { _getCommentLists } from '../../api/comment'
import { Tabs, Comment, Avatar, Rate } from 'antd';

export class Detail extends Component {
    componentDidMount() {
        this.getDetail()
        this.getCommentLists()
    }

    async getDetail() {
        let pid = this.props.history.location.state
        let result = await _ShopDetail(pid)
        this.setState({
            data: result.data.result
        })
    }

    async getCommentLists() {
        let result = await _getCommentLists()
        let comdata = []
        this.state.data.forEach(el => {
            result.data.result.forEach(item => {
                if (item.pid === el.pid) {
                    comdata.push(item)
                }
            })
            this.setState({
                comdata
            })
        })
    }

    state = {
        data: [],
        comdata: []
    }


    render() {
        const { TabPane } = Tabs;
        let { data, comdata } = this.state
        const Demo = () => (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="详情" key="1">
                </TabPane>
                <TabPane tab="规则" key="2">
                </TabPane>
            </Tabs>
        );

        const Demo2 = ({ item }) => {
            return (
                <Comment
                    style={{ borderBottom: '#ccc 1px solid', padding: '15px 0' }}
                    author={<a>{item.uname}</a>}
                    avatar={
                        <Avatar
                            src={item.uphoto}
                            alt=""
                        />
                    }
                    content={
                        <p>
                            {item.comment}
                        </p>
                    }
                >
                    <Rate count='5' value={item.score} style={{ fontSize: 15 }}></Rate></Comment>
            );
        };


        return (
            <div className='detail'>
                {
                    data.map(item => {
                        return (
                            <dl key={item.pid}>
                                <dt><img src={item.imgUrl} alt='' /></dt>
                                <dd>
                                    <h2>{item.pname}</h2>
                                    <p>创建人:<span>孙雨萌</span></p>
                                    <p>商品库存<span>{item.sales}</span></p>
                                </dd>
                            </dl>
                        )
                    })
                }
                <Demo />
                <h2>营养成分</h2>
                <div className="ccc">
                    <div className="one"></div><div className="two"></div>
                </div>
                <h2>商品评论</h2>
                { comdata.length ?
                    <div>
                        {
                            comdata.map(item => {
                                return (<Demo2 item={item} key={item.cid} />)
                            })
                        }
                    </div> : '该商品还没有人评论'}
            </div>
        )
    }
}

export default Detail
