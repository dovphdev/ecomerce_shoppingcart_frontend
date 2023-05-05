// rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";

//functions
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import { Link } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'

const CreateCategory = () => {
  const { user } = useSelector((state) => ({...state}))
  // console.log(user.token)

  const [values, setValues] = useState({
    //ชื่อเดี่ยวกับ Model Schema
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    deleteCategory(user.token,id)
      .then((res) => {
        console.log(res);
        toast.success(`ลบ Category : '${res.data.name}' เรียบร้อย`)
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeCategory = (e) => {
    // console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.token,values)
      .then((res) => {
        // console.log(res);
        loadData(user.token);
        toast.success(`เพิ่ม Category : '${res.data.name}' เรียบร้อย`)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error !! Can't add Category")
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>Create Category</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>

              <input
                onChange={handleChangeCategory}
                name="name"
                value={values.name}
                type="text"
                className="form-control"
              />

              <button className="btn btn-success mt-3">เพิ่ม</button>
            </div>
          </form>
          <hr />

          <ul className="list-group">
            {category.map((item) => (
              <li className="list-group-item">
                {item.name}

                <span
                  style={{ float: "right", marginLeft: "5px", cursor: "pointer" }}
                  className="badge bg-primary rounded-pill"
                  onClick={() => handleRemove(item._id)}
                >
                  X
                </span>

                <span
                  style={{ float: "right", marginLeft: "5px" }}
                  className="badge bg-primary rounded-pill"
                >
                  <Link 
                  style={{textDecoration : "none", color : "white"}}
                  to = {'/admin/update-category/' + item._id}>
                  Edit
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
