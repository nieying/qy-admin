import React from "react";
import { Upload, Icon, message } from "antd";

const { Dragger } = Upload;

class UploadFile extends React.Component {
  render() {
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
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">拖拽上传</p>
      </Dragger>
    );
  }
}
export default UploadFile;
