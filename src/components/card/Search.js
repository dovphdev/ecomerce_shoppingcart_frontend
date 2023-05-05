import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => ({...state}))
  const { text } = search

  const handleChange = (e) => {
    // console.log(e.target.value)
    //ส่ง เข้าไปเก็บใน redux (store) โดย dispatch
    dispatch({
      type: "SEARCH_QUERY" ,
      payload: { text: e.target.value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // ? คือส่งไปกับ query
    navigate('/shop?' + text)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange}
      type="search" 
      className="form-control" />
    </form>
  );
};

export default Search;
