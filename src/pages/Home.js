import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/component/ProductList'
import Footer from '../features/common/Footer'

export default function Home() {
  return (
    <>
      <Navbar>
          <ProductList/>
      </Navbar>
      <Footer></Footer>
    </>
  )
}
