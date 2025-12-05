import React, { useContext, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './Payment.css'
import { DataContext } from '../../components/DataProvider/DataProvider'
import ProductCard from '../../components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../Api/axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

const Payment = () => {
  const [{user,basket},dispach] = useContext(DataContext);
  // console.log(user)

  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

  const total = basket.reduce((amount,item)=>{
    return item.price * item.amount + amount
  },0)

  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)


const stripe = useStripe()
const elements = useElements()
const navigate = useNavigate()


const handleChange = (e)=>{
  console.log(e)
  e.error.message? setCardError(e.error.message):setCardError("")
}


const handlePayment = async (e) => {
  e.preventDefault();

  try {
    setProcessing(true);
    setCardError("");

    // console.log("Starting payment process...");
    // console.log("User:", user?.uid);
    // console.log("Basket items:", basket);

    // 1. Get client secret from backend
    const response = await axiosInstance({
      method: "POST",
      url: `/payment/create?total=${total * 100}`,
    });

    const clientSecret = response.data?.clientSecret;

    if (!clientSecret) {
      throw new Error("No client secret received");
    }

    // 2. Confirm card payment with Stripe
    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }
    );

    if (stripeError) {
      throw new Error(stripeError.message);
    }

    // console.log("Payment successful:", paymentIntent);

    // 3. Save to Firestore
    if (paymentIntent.status === 'succeeded') {
      // console.log("Attempting to save to Firestore...");
      
      const orderData = {
        basket: basket.map(item => ({
          id: item.id || '',
          title: item.title || '',
          price: Number(item.price) || 0,
          amount: Number(item.amount) || 1,
          image: item.image || ''
        })),
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        status: paymentIntent.status,
        paymentIntentId: paymentIntent.id,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date().toISOString(),
        total: total,
        totalItems: basket.length
      };

      const orderRef = db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id);
      await orderRef.set(orderData);
      
      // ✅ KEEP THIS ONE - Good for future debugging
      console.log("✅ Order successfully saved to Firestore!");

      dispach({type:Type.EMPTY_BASKET},)


      setProcessing(false);
      navigate('/orders', { 
        state: { 
          msg: "You have placed a new order!",
          orderId: paymentIntent.id
        } 
      });
    }

  } catch (error) {
    console.error("❌ Payment process failed:", error); // ✅ KEEP - Error logging
    setProcessing(false);
    setCardError(error.message || "Payment failed. Please try again.");
  }
};

  return (
    <Layout>
      {/* header */}
        <div className='payment_header'>
          Checkout ({totalItem}) items
        </div>
        {/* payment method */}
        <section className='payment'>
          {/* address */}
          <div className='flex'>
            <h3>Delivery address</h3>
            <div>
              {user?.email}
            </div>
            </div>
          <hr/>
          {/* product */}
          <div className='flex flex-col sm:flex-row'>
            <h3>Review items and delivery</h3>
            <div className='m-auto'>
              {
                basket?.map((item)=>(<ProductCard id={item} product={item} flex={true}/>))
              }
            </div>
          </div>
          <hr/>
          {/* card form */}
          <div className='flex'>
            <h3>Payment methods</h3>
            <div className='payment_card_container'>
              <div className='payment_details'>
                <form onSubmit={handlePayment}>
                  {
                    cardError && <small style={{color:"red"}}>{cardError}</small>
                  }
                  <CardElement onChange={handleChange}/>
                  {/* price */}
                  <div className='payment_price'>
                    <div>
                        <span className='flex'>
                          <p> Total Order |</p><CurrencyFormat amount=      {total}/>
                        </span>
                    </div>
                    <button type='submit'>
                      {
                        processing?(
                        <div className='loading'>
                          <ClipLoader color='gray' size={12}/>
                          <p>Please wait...</p>
                          </div>
                        ):"Pay Now"
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
}
export default Payment
