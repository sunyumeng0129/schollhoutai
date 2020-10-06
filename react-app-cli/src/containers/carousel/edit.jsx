import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { _editCarouselById } from '../../api/carousel'


export default class edit extends Component {
    async onFinish(vals) {
        vals = Object.assign(this.props.fields, vals, { type: this.state.type })
        console.log(vals);
        let result = await _editCarouselById(vals)
        this.props.handler(result.data)
        this.props.getCarouseList()
    }
    state = {
        type: 1
    }
    handlerChange(val, apt) {
        this.setState({
            type: val
        })
    }
    render() {
        const { fields } = this.props
        return (
            <div>
                <Form
                    name="basic"
                    initialValues={fields}
                    onFinish={(vals) => this.onFinish(vals)}
                >
                    <Form.Item
                        label="标题"
                        name="tit"
                        rules={[{ required: true, message: 'Please input your tit!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <Select value={this.state.type === null ? fields.type : this.state.type} onChange={(val, opt) => this.handlerChange(val, opt)}>
                            <Select.Option value={1}>上架</Select.Option>
                            <Select.Option value={0}>未上架</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="图片"
                        name="img"
                        rules={[{ required: true, message: 'Please input your img!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item >
                        <Button onClick={() => this.props.handleCancel()}>取消</Button>
                        <Button type="primary" htmlType='submit' >确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
