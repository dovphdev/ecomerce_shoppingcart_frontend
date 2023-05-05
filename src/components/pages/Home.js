import React from 'react'
import NewProduct from '../home/NewProduct'
import Bestseller from '../home/Bestseller'
// import MenubarAdmin from '../layout/MenubarAdmin'

function Home() {
  return (
    <div>
      {/* {New Product} */}
      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
      สินค้ามาใหม่
      </h4>
      <NewProduct />


      {/* {Best Seller} */}
      <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
      สินค้าขายดี
      </h4>
      <Bestseller />



    </div>
  )
}

export default Home
