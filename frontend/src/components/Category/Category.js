/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import './Category.css'
import axios from 'axios'
import Context from '../../context'

const Category = () => {
  const [checkClick, setCheckClick] = useState({})
  const [firstPrice, setFirstPrice] = useState(0)
  const [lastPrice, setLastPrice] = useState(100)
  const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"]
  const items = useContext(Context)
  const { dispatch } = items

  const handleClick = (id) => {
    setCheckClick(prevState => ({
      ...checkClick,
      [id]: !prevState[id]
    }))
  }

  let str, size = '';
  useEffect(() => {
    // dispatch({ type: "LOADİNG_TRUE", payload: true })
    if (Object.keys(checkClick).length !== 0) {
      for (let i = 0; i < sizes.length; i++) if (checkClick[i]) size += ',' + sizes[i]
      size = size.substring(1);
      str = `http://localhost:5000/product/?size=${size}`
      axios.get(str)
        .then(response => response.data)
        .then(data => {
          dispatch({ type: "FILTER_SEARCH", payload: data.allData })
          // dispatch({ type: "LOADİNG_FALSE", payload: false })
        })
    }
    else {
      axios.get(`http://localhost:5000/product/?price[gt]=${firstPrice}&price[lt]=${lastPrice}`)
        .then(response => response.data)
        .then(data => { dispatch({ type: "GET_PRODUCTS", payload: data.allData }) })
    }
  }, [checkClick, firstPrice, lastPrice])

  const checkFirstPrice = (e) => e.target.value === '' ? setFirstPrice(0) : ''

  const checkLastPrice = (e) => e.target.value === '' ? setLastPrice(100) : ''

  return (
    <div className='category'>
      <div className="size">
        <p>Sizes:</p>
        <div className="sizes">
          {
            sizes.map((size, i) => (
              <button key={size} className={checkClick[`${i}`] ? "clicked" : ""} onClick={() => handleClick(i)}>{size}</button>
            ))
          }
        </div>
        <div className="hr"></div>
        <div className="price">
          <p>Price Range:</p>
          <div className="range">
            <input
              type="text"
              placeholder='USD'
              value={firstPrice} 
              onChange={(e) => setFirstPrice(e.target.value)} 
              onBlur={(e) => checkFirstPrice(e)}
              />
            <input 
            type="text"
            placeholder='USD' 
            value={lastPrice} 
            onChange={(e) => setLastPrice(e.target.value)}
            onBlur={(e) => checkLastPrice(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;
