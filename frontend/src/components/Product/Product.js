import React, { useContext } from 'react'
import './Product.css'
import productPhoto from '../../assets/product.webp'
import Context from '../../context';
import LoadingSpinner from '../Loading/Loading';
import Pagination from '../Pagination/Pagination'


const Product = () => {
  const states = useContext(Context)
  const { items, dispatch, isLoading, currentPage } = states
  const postPerPage = 8;
  console.log(currentPage);
  const addProduct = (product) => {
    dispatch({ type: "ADD_CART", payload: product })
    dispatch({ type: "ARROW_DIRECTION", payload: false })
  }

  // !Pagination
  const lastProductIndex = currentPage * postPerPage;
  const firstProductIndex = lastProductIndex - postPerPage;
  const allItems = items.slice(firstProductIndex, lastProductIndex)

  return (
    <div className='products-section'>
      <div className="productCount"><p><b>{items.length}</b> Product(s) found</p></div>
      <div className="products">
        {
          isLoading ? <LoadingSpinner /> :
          allItems.map((product) => (
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
      <Pagination products={items}/>
    </div>
  )
}

export default Product
