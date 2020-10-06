import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { _editLists } from '../../api/shop'
class Edit extends Component {
    async onFinish(vals) {
        vals = Object.assign(this.props.fields, vals)
        console.log(vals);
        let result = await _editLists(vals)
        this.props.handler(result.data)
        this.props.getshopList()
    }
    render() {
        let { fields } = this.props
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
                        {/* <Select >
                            <Select.Option value={1}>上架</Select.Option>
                            <Select.Option value={0}>未上架</Select.Option>
                        </Select> */}
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
export default Edit;
