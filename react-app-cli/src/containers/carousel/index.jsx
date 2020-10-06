import React, { Component } from 'react'
import { PageHeader, Space, Modal, message, Button, Popconfirm, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { _getCarouselLists, _delCarousel } from '../../api/carousel'

import Edit from './edit'
import Add from './add'

import Box from './Box'

class Carousel extends Component {

    state = {
        visible: false,
        carouseList: [],
        fields: [],
        show: {
            title: '',
            type: ''
        },
        columns: [
            {
                title: '标题',
                dataIndex: 'tit',
                key: 'tit',
            },
            {
                title: '图片',
                dataIndex: 'img',
                key: 'img',
                render: (text, record) => {
                    return <img src={text} alt='' className='text-nobr'></img>
                }
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => {
                    return <span>{text ? '上架' : '未上架'}</span>
                }
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
                    </Space>
                ),
            },
        ]
    }
    componentDidMount() {
        this.getCarouseList()
    }
    async confirm({ cid }) {
        let result = await _delCarousel(cid)
        if (result.data.code) {
            message.success(`${cid}删除成功！`)
            this.getCarouseList()
        } else {
            message.error("删除失败")
        }

    }
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
    async getCarouseList() {
        const result = await _getCarouselLists()
        this.setState({
            carouseList: result.data.result
        })
    }
    showModal = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk() {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handler(data) {
        if (data.code) {
            this.handleOk()
        } else {
            message.error(data.msg)
        }
    }

    render() {
        const { carouseList, fields, show } = this.state;
        const { Meta } = Card;
        const routes = [
            {
                path: '/app',
                breadcrumbName: '首页管理',
            },
            {
                path: '/app/carousel',
                breadcrumbName: '轮播图管理',
            }
        ];
        return (
            <div className='carbox'>
                <div className="navbox"> 
                <PageHeader
                    className="site-page-header"
                    breadcrumb={{ routes }}
                />,
                <Button style={{ width: 150 }} size='large' type='primary' onClick={() => this.add()} >添加</Button></div>

                <div className="cardbox">
                    {
                        carouseList.map(item => {
                            return (
                                <div key={item.cid}>
                                    <Card
                                        hoverable='true'
                                        bordered='true'
                                        style={{ width: 250 }}
                                        cover={
                                            <img
                                                alt=""
                                                src={item.img}
                                                style={{ width: 250, height: 180 }}
                                            />
                                        }
                                        actions={[
                                            <Popconfirm
                                                placement='topRight'
                                                title="确定要删除吗?"
                                                onConfirm={() => this.confirm(item)}
                                                okText="确定"
                                                cancelText="取消"
                                            >
                                                <SettingOutlined />
                                            </Popconfirm>,
                                            <EditOutlined onClick={() => this.edit(item)} />,
                                        ]}
                                    >
                                        <Meta
                                            title={item.tit}
                                        />
                                    </Card>
                                </div>
                            )
                        })

                    }
                </div>
                <Modal
                    title={show.title}
                    visible={this.state.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    footer={null}
                >
                    {show.type === 'add' ?
                        <Add handleCancel={() => this.handleCancel()} getCarouseList={() => this.getCarouseList()}></Add> :
                        <Edit fields={fields} handler={(data) => this.handler(data)} handleCancel={() => this.handleCancel()} getCarouseList={() => this.getCarouseList()} />}
                    <Box></Box>
                </Modal>



            </div >
        )
    }
}

export default Carousel
