import React from 'react';

import {
  Form,
  Input,
  Upload,
  Icon,
} from 'antd';

class NormalCreatePostForm extends React.Component{
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Message">
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Media">
          {getFieldDecorator('media', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [
              {
                required: true,
                message: 'Please select an media!',
              },
            ],
          })(
            <Upload.Dragger name="files" beforeUpload={() => false}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>,
          )}
        </Form.Item>
      </Form>
    );
  }
}

export const CreatePostForm = Form.create()(NormalCreatePostForm);
