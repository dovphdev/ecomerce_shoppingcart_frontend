import React from 'react'
import { Link } from 'react-router-dom'


const MenubarAdmin = () => {
  return (
    <nav>
      <ul className='nav flex-column'>
        <li className='nav-item'>
            <Link to='/admin/index'>Dashboard</Link>

        </li>
        <li className='nav-item'>
            <Link to='/admin/manage-admin'>จัดการผู้ใช้งาน</Link>
        </li>

        <li className='nav-item'>
            <Link to='/admin/create-category'>เพิ่มหมวดหมู่</Link>
        </li>

        <li className='nav-item'>
            <Link to='/admin/create-product'>เพิ่มสินค้า</Link>
        </li>



      </ul>
    </nav>
  )
}

export default MenubarAdmin
