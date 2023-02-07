import React, { useState } from 'react'
import './Category.css'

const Category = () => {
  const [checkClick, setCheckClick] = useState({})
  const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"]
  // const [checkedSize, setCheckedSize] = useState([])

  const handleClick = (id) => {
    setCheckClick(prevState => ({
      ...checkClick,
      [id]: !prevState[id]
    }))
  }

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
            <input type="text" placeholder='USD' defaultValue={"0"}/>
            <input type="text" placeholder='USD' defaultValue={"300"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;
