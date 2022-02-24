/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-09-27 14:43:32
 * @LastEditors: Others
 * @LastEditTime: 2019-09-27 16:03:08
 * @Version: 1.0.0
 * @Description: 
 */
import React from 'react';
import { Icon, Upload, message } from 'antd';
import { getQueryUrlParamVal } from "../../utils/utils";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('只能上传JPG文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图像必须小于2MB!');
  }
  return isJPG && isLt2M;
}

/**
 * 上传图像组件
 */
export default class Uploads extends React.Component {
  state = {
    loading: false,
    imageUrl: '',
    isAdd: false,
  };

  componentWillReceiveProps = (nextProps) => {

    if ('legalBack' in nextProps) {
      this.setState({
        imageUrl: nextProps.legalBack,
      });
    };
    if ('legalFront' in nextProps) {
      this.setState({
        imageUrl: nextProps.legalFront,
      });
    };
    if ('businessLicence' in nextProps) {
      this.setState({
        imageUrl: nextProps.businessLicence,
      });
    };

  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      this.setState({
        imageUrl: info.file.response.result.httpUrl,
        loading: false,
      }), () => {
        console.log(74, this.state)
      };
      if (this.props.getUrl) {
        this.props.getUrl(info.file.response.result.httpUrl, this.props.id);
      };
    }
    if (info.file.status === 'error') {
      // Get this url from response in real world.
      this.setState({
        loading: false,
      })
      //   alert('上传图片失败');
    }
  };


  render() {

    //     const {name} = this.props;
    //  console.log(91,name)
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    let imageUrl;
    if (this.state.imageUrl != '') {
      imageUrl = this.state.imageUrl;
    }
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        headers={{ "Authorization": sessionStorage.token }}
        action='/agw/api/io/fdfs/1.0/upload'
      >
        {imageUrl && imageUrl != '' ? (
          <img
            style={{ width: '124px', height: '124px' }}
            src={imageUrl}
            alt=""
          />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
