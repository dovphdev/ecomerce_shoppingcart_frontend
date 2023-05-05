import React from "react";
import { Card, Tabs } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

//lodash
import _ from "lodash";

// function
import { addToWishList } from "../functions/users";

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { _id, title, description, images, price, quantity, sold, category } =
    product;

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const handleAddToWishList = () => {
    console.log(_id);

    if (user) {
      addToWishList(user.token, _id)
        .then((res) => {
          console.log(res.data);
          toast.success("Added to Wishlist !");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Go to Sign in");
    }
  };
  console.log(product);

  return (
    <>
      <div className="col-md-7">
        {/* <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
            {images &&
            images.map((item) => <img src={item.url} key={item.public_id} />)}
            </div>
          </div>

          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div> */}

        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item) => <img  src={item.url} key={item.public_id} />)}
        </Carousel>

        <Tabs className="m-3">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>

          <TabPane tab="Reviews" key="2">
            <Link to={"/rating"} state={{ product }}>
              <button className="btn btn-warning">ให้คะแนน</button>
            </Link>
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="text-center bg-info p-3">{title}</h1>
        <Card
          actions={[
            <div onClick={handleAddToWishList}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </div>,

            <div onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              Add to Cart
            </div>,
          ]}
        >
          <ul className="list-group list-group-flush">
            {category && (
              <li className="list-group-item">
                Category :<span className="float-end">{category.name}</span>
              </li>
            )}

            <li className="list-group-item">
              Price :<span className="float-end">{price}</span>
            </li>

            <li className="list-group-item">
              Quantity :<span className="float-end">{quantity}</span>
            </li>

            <li className="list-group-item">
              Sold :<span className="float-end">{sold}</span>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
