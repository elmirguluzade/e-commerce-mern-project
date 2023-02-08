import React, { useContext } from 'react'
import './Product.css'
import productPhoto from '../../assets/product.webp'
import Context from '../../context';
// import LoadingSpinner from '../Loading/Loading';


const Product = () => {
  const states = useContext(Context)
  const { items, dispatch } = states
  console.log(items);

  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product })
  }



  return (
    <div className='products'>
      {
        items.map((product) => (
          <div className="product" key={product._id}>
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
