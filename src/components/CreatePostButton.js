import React from "react"
import { Modal, Button } from 'antd';
import {CreatePostForm} from "./CreatePostForm"

export class CreatPostButton extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Receive values of form', values);
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      } else {
        this.setState({
          confirmLoading: false,
        });
      }
    });

  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  saveFormRef = (formInstance) => {
    this.form = formInstance;
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            Create New Post
          </Button>
          <Modal
              title="Create New Post"
              visible={visible}
              okText="Create"
              cancelText="Cancel"
              confirmLoading={confirmLoading}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <CreatePostForm ref={this.saveFormRef}/>
          </Modal>
        </div>
    );
  }
}
