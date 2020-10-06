import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { _addCarousel } from '../../api/carousel'

class add extends Component {
     async onFinish(vals) {
        let result = await _addCarousel(vals)
        this.props.getCarouseList()
    }
    state = {
        fields: {
            tit: '',
            img: "",
            type: 0
        }
    }
    render() {
        const { fields } = this.state
        return (

            <div className='add'>
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
                        <Select >
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
                        <Button type="primary" htmlType='submit'  onClick={() => this.props.handleCancel()}>确定</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default add
