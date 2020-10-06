import React, { Component } from 'react'

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { _avatarUpload } from '../../api/user'
import { connect } from 'dva';

@connect((store=>store.user))
class Uploadbox extends Component {

    state = {
        loading: false,
        imgUrl:''
    };

    beforeUpload(file) {
        this.setState({
            loading:true
        })
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    async handleChange({file}) {
        let avatarForm = new FormData()
        avatarForm.append('files', file)
        let result = await _avatarUpload({avatarForm,uid:this.props.uid})
       this.setState({
           loading:false,
           imgUrl:result.data.imgUrl
       })
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div className="upload">
                <div className="box">
                    <h3>头像上传</h3>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={(file)=>this.beforeUpload(file)}
                        onChange={(obj) => this.handleChange(obj)}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>
            </div>
        );
    }

}
export default Uploadbox
