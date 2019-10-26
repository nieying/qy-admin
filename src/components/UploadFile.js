import React from "react";
import { Upload, Icon, message } from "antd";

const { Dragger } = Upload;

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: props.value || "",
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState({ filePath: nextProps && nextProps.value });
  }

  render() {
    const { filePath } = this.state;
    const that = this;
    const props = {
      name: "file",
      multiple: true,
      action: "https://api.deyushiyuan.cn/litemall/admin/storage/create",
      headers: {
        "X-Admin-Token": localStorage.getItem("token")
      },
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          that.props.setValue(info.file.response.data.url);
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <Dragger {...props}>
        {filePath ? (
          <div style={{ width: 200 }}>{filePath}</div>
        ) : (
          <div>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">拖拽上传</p>
          </div>
        )}
      </Dragger>
    );
  }
}
export default UploadFile;
