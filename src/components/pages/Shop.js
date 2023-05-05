import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCart from "../card/ProductCard";

//antd
import { Slider, Checkbox } from "antd";

//function
import { listProduct, searchFilters } from "../functions/product";
import { listCategory } from "../functions/category";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  // Category
  const [ category, setCategory ] = useState([])
  const [ categorySelect, setcategorySelect] = useState([])


  const { search } = useSelector((state) => ({ ...state }));
  // console.log(search.text)
  const { text } = search;

  // 1. Load All Data
  useEffect(() => {
    loadData();
    listCategory()
    .then((res) => {
      setCategory(res.data)
    }).catch((err) => {
      console.log(err)
    });
  }, []);
  

  const loadData = () => {
    setLoading(true);
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // 2. load data when users filter data text
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  //Filter
  const fetchDataFilter = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 3. Load on Slider
  useEffect(() => {
    fetchDataFilter({ price }); // [0,0]
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const handleCheck = (e) => {
    //ค่าปัจจุบันที่ Check
    let inCheck = e.target.value
    //ค่าเดิมของ Check
    let inState = [...categorySelect]

    let findCheck = inState.indexOf(inCheck)

    if(findCheck === -1){
      inState.push(inCheck)
    }else{
      inState.splice(findCheck, 1)
    }
    setcategorySelect(inState)
    fetchDataFilter({ category: inState });
    if(inState.length < 1){
      loadData()
    }
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3">
          
            <h2>Filter / Search</h2>
            <hr />
            <h4>ค้นหาด้วยราคาสินค้า</h4>
            <p>Price range :</p>
            <Slider 
            railStyle={{backgroundColor: "grey"}}
            trackStyle={{backgroundColor: "black"}}
            value={price} 
            onChange={handlePrice} 
            range 
            max={100000} />
            <hr />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Category</h4>
              {category.map((item, index) => (
                <label key={item._id} style={{ marginBottom: "10px" }}>
                  <input
                    type="checkbox"
                    onChange={handleCheck}
                    value={item._id}
                    style={{ marginRight: "5px" }}
                  />
                  {item.name}
                </label>
              ))}
              
            </div>

          </div>




          <div className="col-md-9">
            {loading ? <h4>Loading...</h4> : <h4>Products</h4>}

            {product.length < 1 && <p>No Product Found</p>}

            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <ProductCart product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
