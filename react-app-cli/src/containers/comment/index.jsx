import React, { Component } from 'react'
import { Table, Rate,Space,Popconfirm,message,PageHeader } from 'antd'
import { _getCommentLists,_delComment } from '../../api/comment'

class index extends Component {

    async getCommentLists() {
        let result = await _getCommentLists()
        this.setState({
            commentList: result.data.result
        })
        console.log(this.state.commentList);
    }

    state = {
        commentList: [],
        columns: [
            {
                title: '商品id',
                dataIndex: 'pid',
                key: 'pid',
            },
            {
                title: '头像',
                dataIndex: 'uphoto',
                key: 'uphoto',
                render: (text, record) => {
                    return <img src={text} alt='' className='text-nobr'></img>
                }
            },
            {
                title: '用户名',
                dataIndex: 'uname',
                key: 'uname',
            },
            {
                title: '评论',
                dataIndex: 'comment',
                key: 'comment',
            },
            {
                title: '星级',
                dataIndex: 'score',
                key: 'score',
                render: (text, record) => {
                    return <Rate count='5' value={text}></Rate>
                }
            },
            {
                title: "操作",
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            placement='topRight'
                            title="确定要删除吗?"
                            onConfirm={() => this.confirm(text)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span>删除</span>
                        </Popconfirm>
                    </Space>
                ),
            },
        ]
    }

   async confirm({cid}){
        let result = await _delComment(cid)
        if (result.data.code) {
            message.success(`删除成功！`)
            this.getCommentList()
        } else {
            message.error("删除失败")
        }
    }

    componentDidMount() {
        this.getCommentLists()
    }

    render() {
        let { columns, commentList } = this.state
        return (
            <div className='combox'>
                <Table  columns={columns} dataSource={commentList} pagination={{ pageSize: 5, total: this.getCommentLists.length }} />
            </div>
        )
    }
}

export default index
