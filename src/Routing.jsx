import React from 'react'
import{BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'


const stripePromise = loadStripe("pk_test_51SKekWArn7ooMj8prTaT54dHlJhCZPch6qkylbGC736fS4yTWN6aiEjxL6piwq6mONmyh6qsKqYrwR7QaJdmFD3a006cBAR1Km")
const Routing = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='/payment' element={
                  <ProtectedRoute 
                  msg={"you must login to pay"} 
                  redirect={'/payment'}>
                    <Elements stripe={stripePromise}>
                    <Payment/>
                  </Elements>
                  </ProtectedRoute>
                  }/>

                <Route path='/orders' element={
                  <ProtectedRoute 
                  msg={"you must login to access your orders"} 
                  redirect={'/orders'}>
                    <Orders/>
                  </ProtectedRoute>}/>

                <Route path='/category/:categoryName' element={<Results/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/products/:productId' element={<ProductDetail/>}/>

            </Routes>
        </Router>
    </div>
  )
}

export default Routing