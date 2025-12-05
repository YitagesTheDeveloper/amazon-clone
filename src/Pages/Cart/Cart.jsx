import React, { useContext } from 'react'
import './Cart.css'
import Landing from '../Landing/Landing'
import Layout from '../../components/Layout/Layout'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import {Type} from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const Cart = () => {
  const [{basket,user},dispatch] = useContext(DataContext)
  const total = basket.reduce((amount,item)=>{
      return item.price * item.amount + amount
  },0)
  const increment=(item)=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
    const decrement=(id)=>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id
    })
  }
  // console.log(basket)
  return (
    <Layout>
        <section className='container'>
          <div className='cart_container'>
            <h2>Hello</h2>
            <h3>Your Shopping basket</h3>
            <hr/>
            {
              basket?.length==0?(<p>Opps! no item in your cart</p>):(
                basket?.map((item,i)=>{

                  return <section className="cart_product">
                    <ProductCard 
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                    />
                    <div className='btn_container'>
                      <button className='btn' onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                      <span>{item.amount}</span>
                      <button className='btn' onClick={()=>decrement(item.id)}><IoIosArrowDown size={20}/></button>
                    </div>
                  </section>
                })
              )
            }
          </div>
          {
            basket?.length !==0 &&(
              <div className='subtotal'>
                <div>
                  <p>Subtotal ({basket?.length} items)</p>
                  <CurrencyFormat amount={total}/>
                </div>
                <span>
                  <input type="checkbox"/>
                  <small>This order contains a gift</small>
                </span>
                <Link to ='/payment'>Continue to checkout</Link>
              </div>
            )
          }
          <div></div>
        </section>
    </Layout>

  )
}

export default Cart
