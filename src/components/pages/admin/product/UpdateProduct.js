// rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUpload from "./FileUpload";

// function
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  // console.log(params.id)
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(values);
  console.log(category);

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    updateProduct(user.token, values._id, values)
    .then((res) => {
        
        setLoading(false)
        toast.success('Update ' + res.data.title + " Success !")
        console.log(res)
        navigate('/admin/index')
    }).catch((err) => {
        toast.error('Update Error !')
        setLoading(false)
        console.log(err)
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
        ? <h1>Loading ...</h1>
        : <h1>Product Update</h1>
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
                value = {values.category._id}
                required
              >
                <option>Please Select...</option>

                {category.length > 0 &&
                    category.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <FileUpload
              loading={loading}
              setLoading={setLoading}
              values={values}
              setValues={setValues}
            />

            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
