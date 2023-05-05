import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const ProductTableInCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (e) => {
    //  e.target.value ถ้าค่าที่พิมเข้าไป มีค่าน้อยกว่า 1 ให้แสดง 1 ถ้ามากกว่าก็แสดงปกติ
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error("จำนวนสินค้าคงเหลือ : " + item.quantity);
      return;
    }

    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, index) => {
      // item._id มาจากที่ส่งมาจาก ProductTableInCart = ({ item }) ที่รับมา
      if (product._id === item._id) {
        cart[index].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  const handleRemove = () => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, index) => {
      // item._id มาจากที่ส่งมาจาก ProductTableInCart = ({ item }) ที่รับมา
      if (product._id === item._id) {
        cart.splice(index, 1)
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tbody>
      <tr>
        <td>
          <img alt="images" src={item.images[0].url} width="150" />
        </td>
        <td>{item.title}</td>
        <td>{item.price}</td>

        <td>
          <input
            onChange={handleChangeCount}
            className="form-control"
            type="number"
            value={item.count}
          />
        </td>

        <td>
          <DeleteOutlined
            onClick={handleRemove}
            style={{ cursor: "pointer" }}
            className="text-danger d-flex justify-content-center"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableInCart;
