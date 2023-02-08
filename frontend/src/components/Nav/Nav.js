/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useRef } from 'react'
import Context from '../../context'
import photo from '../../assets/product.webp'
import './Nav.css'

function Nav() {
  // !Hooks
  const [colorChange, setColorChange] = useState(false)
  const cartContext = useContext(Context)
  const wrapperRef = useRef()
  // !Context
  const { cart, dispatch, currentValue, arrowDir } = cartContext
  // !Navbar Fixed
  const changeNavbarColor = () => {
    window.scrollY > 10 ? setColorChange(true) : setColorChange(false)
  }
  window.addEventListener('scroll', changeNavbarColor)
  // !Clicked Outside Cart
  const detectClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      dispatch({ type: "ARROW_DIRECTION", payload: !arrowDir })
    }
  }
  window.addEventListener('mousedown', detectClick)
  // !Cart Total Price
  const totalPrice = () => {
    let sum = 0;
    cart.forEach(element => element.quantity ? sum += element.quantity * element.price : sum += element.price);
    return (Math.round(sum * 10) / 10).toString();
  }
  // !Remove Cart Item
  const removeCart = (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item })
  }
  // !Search 
  const searchText = (e) => {
    dispatch({ type: "SEARCH_TEXT", payload: e.target.value })
  }

  const setArrowDir = () => {
    dispatch({ type: "ARROW_DIRECTION", payload: !arrowDir })
  }

  return (
    <header className={colorChange ? "fixed" : ""}>
      <nav>
        <div className="logo">
          <h2>App</h2>
        </div>
        <div className="searchBox">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder='Search' value={currentValue} onChange={(e) => searchText(e)} />
        </div>
        <div className="credentials">
          <div className="cart"
            onClick={setArrowDir}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart {cart.length > 0 ? cart.length : ''}</span>
            {
              arrowDir ? <i className="fa-solid fa-chevron-down"></i> :
                <i className="fa-solid fa-chevron-up"></i>
            }
          </div>
          {
            !arrowDir ? <div className="cart-details" ref={wrapperRef}>
              <p className='cart-title'>Items in your cart</p>
              <div className="items">
                {
                  cart.map((product) => (
                    <div className="item" key={product._id}>
                      <div className="item-title">
                        <p>{product.title}</p>
                        <i className="fa-solid fa-xmark remove" onClick={() => removeCart(product)}></i>
                      </div>
                      <div className="item-details">
                        <div className="item-img">
                          <img src={photo} alt="product" />
                        </div>
                        <div className="item-spc">
                          <p>Quantity: <span>{product.quantity}</span></p>
                          <p>Price: <span>{product.price}$</span></p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                }
              </div>
              <div className="total-price">
                <p>Subtotal({cart.length} Item)</p>
                <p>${totalPrice()}</p>
              </div>
              <button className='submitCart'>PROCEED TO BAG</button>
            </div> : ''
          }

          <div className="profile">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav