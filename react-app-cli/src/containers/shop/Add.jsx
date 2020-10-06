import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd';
import {_addLists} from '../../api/shop'
class Add extends Component {
    async onFinish(vals) {
        let result = await _addLists(vals)
        this.props.getshopList()
    }
    state = {
        fields: {
            pname: '',
            imgUrl: "",
            sales: '',
            original_price: '',
            sale_price: '',
            mode: '',
            s_type: '0',
            t_type: '0',
            carousel: '',
            desc: '',
            cid:'',
            pid:''
        }
    }
    render() {
        let { fields } = this.state
        return (
            <div>
                <Form
                    name="basic"
                    initialValues={fields}
                    onFinish={(vals) => this.onFinish(vals)}
                >
                    <Form.Item
                        label="商品名称"
                        name="pname"
                        rules={[{ required: true, message: 'Please input your pname!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="图片"
                        name="imgUrl"
                        rules={[{ required: true, message: 'Please input your imgUrl!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="销量"
                        name="sales"
                        rules={[{ required: true, message: 'Please input your sales!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="原价"
                        name="original_price"
                        rules={[{ required: true, message: 'Please input your original_price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="现价"
                        name="sale_price"
                        rules={[{ required: true, message: 'Please input your sale_price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="mode"
                        rules={[{ required: true, message: 'Please input your mode!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="desc"
                        rules={[{ required: true, message: 'Please input your desc!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={() => this.props.handleCancel()}>取消</Button>
                        <Button type="primary" htmlType='submit' onClick={() => this.props.handleCancel()}>确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Add;
