import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import './Product.Module.css'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'

const ProductCard = ({product,flex,renderDesc,renderAdd}) => {
     if (!product) return null;
    const {image,title,id,rating,price,description} = product;

    const [state,dispatch] =useContext(DataContext);

    const addToCart = ()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image,title,id,rating,price,description
            }
        })
    }
  return (
    <div className={`card_container ${flex? "product_flexed":""}`}>
        <Link to={`/products/${id}`}>
            <img src={image} alt="" />
        </Link>
        <div>
            <h3>{title}</h3>
            {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}
            <div className='rating'>
                {/* Rating */}
                <Rating value={rating?.rate} precision={0.1}/>
                {/* count */}
                <small> {rating?.count} </small>
            </div>
            <div>
                {/* price */}
                <CurrencyFormat amount={price}/>
            </div>
            {
                renderAdd && <button className='button' onClick={addToCart}>
                add to cart
            </button>
            }
            
        </div>
    </div>
  )
}

export default ProductCard