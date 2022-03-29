import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'
import {useEffect,useState} from 'react'
import { InventoryContext } from '../context/inventoryContext'


function Ecommerce({ Component, pageProps, categories }) {
  

  return (
   
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
   
  )
}

Ecommerce.getInitialProps = async () => {
   
    
  const categories = await fetchCategories()
  return {
    categories
  }
}

export default Ecommerce