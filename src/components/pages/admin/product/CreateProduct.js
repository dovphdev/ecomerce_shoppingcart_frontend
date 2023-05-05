import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";

// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

//function
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";


import FileUpload from "./FileUpload";
import { Spin } from 'antd';

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const HomeAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate()


  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        console.log(res.data);
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("values", values);

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        console.log(res);
        toast.success("Add Product : " + res.data.title + " Success !");
        window.location.reload()
        // navigate('/admin/index')
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading 
          ? <h1>Loading...<Spin /></h1> //true
          : <h1>Create Product Page</h1> // flase
          }

          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label className="fs-5">Title (Product name) :</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label className="fs-5">Description :</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label className="fs-5">Price : </label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label className="fs-5">Quantity :</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mt-2">
              <label className="fs-5">Category :</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
              >
                <option>Please Select...</option>

                {values.categories.length > 0 &&
                  values.categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}

              </select>
            </div>

            <FileUpload 
            loading= {loading}
            setLoading = {setLoading}
            values= {values} 
            setValues= {setValues}/>


            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
