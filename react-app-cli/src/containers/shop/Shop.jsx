import React, { Component } from 'react'
import { Table, Space, Button, Popconfirm, Modal, message, Input,PageHeader} from 'antd';
import { _getShopLists, _delLists, _ShopDetail } from '../../api/shop'

import Add from './Add'
import Edit from './Edit'

class Shop extends Component {
    state = {
        show: {
            title: '',
            type: ''
        },
        visible: false,
        shopList: [],
        fields: [],
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
                        </Popconfirm>
                        <span onClick={() => this.goDetail(text)}>详情</span>
                    </Space>
                ),
            },
        ]
    }
    componentDidMount() {
        this.getshopList()
    }

    async getshopList() {
        const result = await _getShopLists()
        this.setState({
            shopList: result.data.result
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

    add() {
        this.setState({
            visible: true,
            show: {
                title: '添加',
                type: 'add'
            }
        })
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
    handler(data) {
        this.handleOk()
    }

    goSearch = () => {
        this.props.history.push('/app/search')
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


    goDetail({ pid }) {
        this.props.history.push(`/app/detail:${pid}`,pid)
    }

    render() {
        const { shopList, columns, visible, show, fields } = this.state
        const routes = [
            {
                path: '/app',
                breadcrumbName: '首页管理',
            },
            {
                path: '/app/shop',
                breadcrumbName: '商品管理',
            }
        ];
        return (
            <div className='list'>
                 <div className="navbox"> 
                <PageHeader
                    className="site-page-header"
                    breadcrumb={{ routes }}
                />,
                  <Input id='input' defaultValue='输入关键字搜索' onClick={() => this.goSearch()}></Input>
                <Button style={{ width: 150 }} size='large' type='primary' onClick={() => this.add()} >添加</Button></div>
              
                <Table columns={columns} dataSource={shopList} pagination={{ pageSize: 5, total: this.getshopList.length }} />
                <Modal
                    title={show.title}
                    visible={visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    footer={null}
                >
                    {show.type === 'add' ?
                        <Add handleCancel={() => this.handleCancel()} getshopList={() => this.getshopList()}></Add> :
                        <Edit fields={fields} handler={(data) => this.handler(data)} handleCancel={() => this.handleCancel()} getshopList={() => this.getshopList()} />}
                </Modal>
            </div>
        )
    }
}
export default Shop;
