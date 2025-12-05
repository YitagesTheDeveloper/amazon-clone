import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import Category from '../../components/Category/Category'
import Product from '../../components/product/Product'
import Layout from '../../components/Layout/Layout'

const Landing = () => {
  return (
    <div>
        <Layout>
            <Carousel/>
            <Category/>
            <Product/>
        </Layout>
        
    </div>
  )
}

export default Landing