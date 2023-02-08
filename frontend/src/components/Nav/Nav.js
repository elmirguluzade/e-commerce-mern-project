import React, { useState, useContext } from 'react'
import Context from '../../context'
import './Nav.css'
import photo from '../../assets/product.webp'

function Nav() {

  const [arrowDir, setArrowDir] = useState(true)
  const [colorChange, setColorChange] = useState(false)
  const cartContext = useContext(Context)
  const [currentValue, setcurrentValue] = useState('')
  const { cart } = cartContext
  
  const changeNavbarColor = () => {
    window.scrollY > 10 ? setColorChange(true) : setColorChange(false)
  }
  window.addEventListener('scroll', changeNavbarColor)

  const totalPrice = () => {
    let sum = 0;
    cart.forEach(element => {
      if (element.quantity) {
        sum += element.quantity * element.price
      } else {
        sum += element.price
      }
    });
    return (Math.round(sum * 10) / 10).toString();
  }

  const filteredItems = (event) => {
    setcurrentValue(event.target.value)
    // const allProducts = [...items];
    // const filteredProducts = allProducts.filter((product) => 
    //    product.title.toLowerCase().includes(currentValue.toLowerCase())
    // )
    // dispatch({ type: "SEARCH_PRODUCTS", payload: filteredProducts})
  }

  return (
    <header className={colorChange ? "fixed" : ""}>
      <nav>
        <div className="logo">
          <h2>App</h2>
        </div>
        <div className="searchBox">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder='Search' value={currentValue} onChange={filteredItems} />
        </div>
        <div className="credentials">
          <div className="cart"
            onClick={() => setArrowDir(!arrowDir)}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart {cart.length > 0 ? cart.length : ''}</span>
            {
              arrowDir ? <i className="fa-solid fa-chevron-down"></i> :
                <i className="fa-solid fa-chevron-up"></i>
            }
          </div>
          {
            !arrowDir ? <div className="cart-details">
              <p className='cart-title'>Items in your cart</p>
              <div className="items">
                {
                  cart.map((product) => (
                    <div className="item" key={product._id}>
                      <div className="item-title"><p>{product.title}</p></div>
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