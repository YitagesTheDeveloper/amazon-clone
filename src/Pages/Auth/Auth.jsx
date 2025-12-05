import React, { useContext, useState } from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../Utility/firebase'
import './Signup.css'
import {DataContext} from '../../components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'
const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading,setLoading] = useState({
    signIn:false,
    signUp:false
  })

  const [{user},dispach]=useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()

  console.log(navStateData);

  const authHandler = (e)=>{
    e.preventDefault();
    // console.log(e.target.name)
    if(e.target.name == "signin"){
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        // console.log(userInfo)
        dispach({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect || '/')
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading,signIn:false})
      })
    }else{
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
      dispach({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signUp:false})
          navigate(navStateData?.state?.redirect || '/')
      }).catch((err)=>{
        setError(err.message)
        setLoading({...loading,signUp:false})
      })
    }
  }
  return (
    <section className="login">
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt=""/>
      </Link>

    {/* Form */}
      <div className='login_container'>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg &&(
            <small style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold"
            }}>
              {navStateData?.state?.msg}
            </small>
          )
        }
        <form action="">
          <div>
            <label htmlFor="Email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" id='email'/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password'/>
          </div>
          <button type='submit' onClick={authHandler} name="signin" className='login_signIn_btn'>{loading.signIn? (<ClipLoader color="#000" size={15}/>):("Sign In")}</button>
        </form>
        {/* agreement */}
        <p>By signing-in you agree to the AMAZON FAKE CLONE Conditions of use & sale.Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice</p>
        {/* create account btn */}
        <button type='submit' name='signup' onClick={authHandler} className='login_register_btn'>{loading.signUp? (<ClipLoader color="#000" size={15}/>):("Create your Amazon Account")}</button>
        {
          error && <small style={{paddingTop:"5px",color:"red"}}>{error}</small>
        }
      </div>
    </section>
    
  )
}

export default Auth