import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment/min/moment-with-locales";

//functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  //ข้อมูลในตารางต้นฉบับ
  const [data, setData] = useState([]);
  //ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([]);
  //ข้อมูลที่ใช่ Loop ใน Dropdown
  const [drop, setDrop] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    // console.log(e.target.name)
    // console.log(e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // console.log("data is ", data);
  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
        setSelectData(res.data);
        //
        const dataDrop = [...new Set(res.data.map((item) => item.role))];
        setDrop(dataDrop);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changeRole(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure to delete ?")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const roleData = ["admin", "user"];

  const handleSelectRole = (e) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectData(data);
    } else {
      const filterData = data.filter((item, index) => {
        return item.role === value;
      });
      setSelectData(filterData);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>ManageAdmin Page</h1>

          <select onChange={(e) => handleSelectRole(e)}>
            <option value="all">All</option>
            {drop.map((item, index) => 
              <option key={index} value={item}>{item}</option>
            )}
          </select>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {selectData.map((item, index) => (
                <tr>
                  <th scope="row">{item.username}</th>

                  <td>
                    <Select
                      value={item.role}
                      style={{ width: "100px" }}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item === "admin" ? (
                            <Tag color="green">{item}</Tag>
                          ) : (
                            <Tag color="red">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>

                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>

                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>

                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>

                  <td>
                    <DeleteOutlined onClick={() => handleRemove(item._id)} />
                    <EditOutlined
                      style={{ paddingLeft: "10px" }}
                      onClick={() => showModal(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
