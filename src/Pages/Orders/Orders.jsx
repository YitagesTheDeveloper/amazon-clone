import React, { useContext, useEffect } from 'react'
import './Orders.css'
import Layout from '../../components/Layout/Layout'
import { DataContext } from '../../components/DataProvider/DataProvider'
import { db } from '../../Utility/firebase'
import { useState } from 'react'
import ProductCard from '../../components/Product/ProductCard'

const Orders = () => {
  const [{user},dispach] = useContext(DataContext)
  const [orders,setOrders] = useState([])
  useEffect(()=>{
    if(user){
      db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
        console.log(snapshot)
        setOrders(
          snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          }))
        )
      })
    }else{
      setOrders([])
    }
  },[])
  return (
    <Layout>
      <section className='container'>
        <div className='orders_container'>
          <h2>Your Orders</h2>
          {
            orders?.length == 0 && <div className='p-20px'>you don't have orders yet</div>
          }
          {/* ordered items */}
          <div>
            {
              orders?.map((eachOrder,i)=>{
                return (
                  <div key={i}>
                    <hr/>
                    <p>order ID:{eachOrder?.id}</p>
                    {
                      eachOrder?.data?.basket?.map(order=>{
                        return (<ProductCard
                        flex={true}
                        product={order}
                        key={order.id}/>)
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </Layout>
    
  )
}

export default Orders
