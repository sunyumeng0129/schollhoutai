import React, { Component } from 'react'
import { Input, Table, Space, Button, Popconfirm, Modal, message } from 'antd'
import { _searchLists, _delLists } from '../../api/shop'
import Edit from './Edit'
class Search extends Component {

    async Search(e) {
        const result = await _searchLists(e.target.value)
        this.setState({
            shopList: result.data.result
        })
    }

    state = {
        show: {
            title: '',
            type: ''
        },
        visible: false,
        shopList: [],
        fields: [],
        shopList: [],
        columns: [
            {
                title: 'pid',
                dataIndex: 'pid',
                key: 'pid',
            },
            {
                title: 'cid',
                dataIndex: 'cid',
                key: 'cid',
            },
            {
                title: '商品名称',
                dataIndex: 'pname',
                key: 'pname',
            },
            {
                title: '图片',
                dataIndex: 'imgUrl',
                key: 'imgUrl',
                render: (text, record) => {
                    return <img src={text} alt='' className='text-nobr'></img>
                }
            },
            {
                title: '销量',
                dataIndex: 'sales',
                key: 'sales',
            },
            {
                title: '原价',
                dataIndex: 'original_price',
                key: 'original_price',
            },
            {
                title: '现价',
                dataIndex: 'sale_price',
                key: 'sale_price',
            },
            {
                title: '类型',
                dataIndex: 'mode',
                key: 'mode',
            },
            {
                title: '描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <span onClick={() => this.edit(record)} >编辑 </span>
                        <Popconfirm
                            placement='topRight'
                            title="确定要删除吗?"
                            onConfirm={() => this.confirm(text)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <span>删除</span>
                            <span onClick={() => this.goDetail(text)}>详情</span>
                        </Popconfirm>

                    </Space>
                ),
            },
        ]
    }
    async confirm({ pid }) {
        let result = await _delLists(pid)
        if (result.data.code) {
            message.success(`${pid}删除成功！`)
            this.getshopList()
        } else {
            message.error("删除失败")
        }
    }
    edit(record) {
        this.setState({
            visible: true,
            fields: record,
            show: {
                title: '编辑',
                type: 'edit'
            }
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleOk() {
        this.setState({
            visible: false,
        });
    };
    goDetail({ pid }) {
        this.props.history.push(`/app/detail:${pid}`, pid)
    }
    render() {
        let { columns, shopList,fields,show,visible } = this.state
        return (
            <div>
                <Input id='input2' placeholder='请输入关键字进行搜索' onChange={(e) => this.Search(e)}></Input>
                <Table columns={columns} dataSource={shopList} />
                <Modal
                    title={show.title}
                    visible={visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    footer={null}
                >
                <Edit fields={fields} handler={(data) => this.handler(data)} handleCancel={() => this.handleCancel()} getshopList={() => this.Search()} />
                </Modal>
            </div>
        )
    }
}

export default Search
