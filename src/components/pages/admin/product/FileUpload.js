import React from "react";
import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

import { Avatar, Badge, Space } from "antd";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // console.log('values in FileUpload', values)

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allfileUpload = values.images; // array []

      for (let i = 0; i < files.length; i++) {
        // console.log(files[i])
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                // console.log(res)
                allfileUpload.push(res.data);
                console.log("allfileUpload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true)
    console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false)
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id
        });
        setValues({...values, images: filterImages})
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <>
      {values.images &&
        values.images.map((item) => (
          <Space size={24} className="mt-3">
            <Badge
              onClick={() => handleRemove(item.public_id)}
              style={{ cursor: "pointer" }}
              count="X"
            >
              <Avatar
                className="m-4"
                src={item.url}
                shape="square"
                size={150}
              />
            </Badge>
          </Space>
        ))}

      <div className="form-group">
        <label className="btn btn-secondary mt-2">
          Choose File...
          <input
            onChange={handleChangeFile}
            className="form-control"
            type="file"
            hidden
            multiple
            accept="images/*"
            name="file"
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
