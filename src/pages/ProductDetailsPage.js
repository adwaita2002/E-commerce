import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetails from '../features/product-list/component/ProductDetails'
import Footer from '../features/common/Footer'

export default function ProductDetailsPage() {
  return (
    <>

    <Navbar>
          <ProductDetails/>
    </Navbar>
    <Footer></Footer>
      
    </>
  )
}
