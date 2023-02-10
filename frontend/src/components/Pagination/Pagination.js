import React, { useContext } from 'react'
import './Pagination.css'
import Context from '../../context'

function Pagination(props) {
    const pages = []
    const context = useContext(Context)
    const { dispatch, currentPage } = context;
    for (let i = 1; i <= Math.ceil(props.products.length / 8); i++) pages.push(i)
    const handleClick = (page) => {
        dispatch({ type: "CURRENT_PAGE", payload: page })
        window.scrollTo(0, 0)
    }

    return (
        <div className='pages'>
            {pages.length === 1 ? '' :
                pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(page)}
                        className={page === currentPage ? 'active page' : 'page'}>{page}
                    </button>
                ))
            }
        </div>
    )
}

export default Pagination