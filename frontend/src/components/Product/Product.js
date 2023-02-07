import React, { useEffect, useContext } from 'react'
import './Product.css'
import axios from 'axios';
import productPhoto from '../../assets/product.webp'
import Context from '../../context';


const Product = () => {
  const states = useContext(Context)
  const { items, dispatch } = states

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => response.data)
      .then(data => dispatch({ type: "GET_PRODUCTS", payload: data }))
  })


  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product })
  }

  return (
    <div className='products'>
      {
        items.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-photo">
              {
                product.isFreeShipping ? <p className='freeShipping'>Free Shipping</p> : ""
              }
              <img src={productPhoto} alt="product" />
            </div>
            <div className="product-details">
              <div className="dflex">
                <p className='title'>{product.title}</p>
                <div className="priceProduct">{product.price}$</div>
              </div>
            </div>
            <button onClick={() => addProduct(product)}>Buy Now</button>
          </div>
        ))
      }
    </div>
  )
}

export default Product
