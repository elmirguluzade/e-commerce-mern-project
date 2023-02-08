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
  const { dispatch, currentValue } = items

  const handleClick = (id) => {
    setCheckClick(prevState => ({
      ...checkClick,
      [id]: !prevState[id]
    }))
  }

  let str, size = '';
  useEffect(() => {
    if (Object.keys(checkClick).length !== 0) {
      dispatch({ type: "LOADING_STATE", payload: true })
      setTimeout(() => {
        for (let i = 0; i < sizes.length; i++) if (checkClick[i]) size += ',' + sizes[i]
        size = size.substring(1);
        const gt = firstPrice || 0;
        const ls = lastPrice || 100;
        str = `http://localhost:5000/product/?size=${size}&price[gt]=${gt}&price[lt]=${ls}&search=${currentValue}`
        axios.get(str)
          .then(response => response.data)
          .then(data => {
            dispatch({ type: "LOADING_STATE", payload: false })
            dispatch({ type: "FILTER_SEARCH", payload: data.allData })
          })
      }, 1000)
    }
    else if (currentValue && Object.keys(checkClick).length === 0) {
      dispatch({ type: "LOADING_STATE", payload: true })
      setTimeout(() => {
        axios.get(`http://localhost:5000/product/?search=${currentValue}`)
          .then(response => response.data)
          .then(data => { dispatch({ type: "GET_PRODUCTS", payload: data.allData }) })
        dispatch({ type: "LOADING_STATE", payload: false })
      }, 1000)
    }
    else {
      dispatch({ type: "LOADING_STATE", payload: true })
      const gt = firstPrice || 0;
      const ls = lastPrice || 100;
      axios.get(`http://localhost:5000/product/?price[gt]=${gt}&price[lt]=${ls}`)
        .then(response => response.data)
        .then(data => {
          dispatch({ type: "LOADING_STATE", payload: false })
          dispatch({ type: "GET_PRODUCTS", payload: data.allData })
        })
    }
  }, [checkClick, firstPrice, lastPrice, currentValue])

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
