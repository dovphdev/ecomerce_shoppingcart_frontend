import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";

import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveAddress = () => {
    console.log(address);
    saveAddress(user.token, address)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          toast.success("Address Saved !");
          setAddressSaved(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token)
      .then((res) => {
        console.log(res.data);

        // clear db
        emptyCart(user.token);

        // clear store
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        //clear local storage
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }

        toast.success("Save Order Success !");
        navigate('/user/history')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-3">
        <div className="col-md-6">
          <h4>Address :</h4>
          <ReactQuill value={address} onChange={setAddress} />
          <button className="btn btn-primary mt-2" onClick={handleSaveAddress}>
            Save Address
          </button>
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <h5>Products Amount : {products.length}</h5>
          <hr />
          <p>List of Product</p>
          {products.map((item, index) => (
            <div key={index}>
              <p>
                {item.product.title} x {item.count} = {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>{total}</b>
          <br />
          <button
            onClick={handleCreateOrder}
            disabled={!addressSaved || !products.length}
            className="btn btn-success mt-3"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
