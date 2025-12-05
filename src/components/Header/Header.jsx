import React, { useContext } from 'react'
import   './Header.Module.css'
import { BiCart } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import {SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from '../../Utility/firebase'

const Header = () => {
    const [{user,basket},dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount,item)=>{
        return item.amount + amount
    },0)
  return (
    <section className='fixed'>
        <section>
            <div className="header_container">
                {/* Logo section*/}
                <div className='logo_container'>
                    <Link to="/">
                        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"/>
                    </Link>
                    {/* Delivery */}
                    <div className="delivery">
                        <span>
                            <SlLocationPin/>
                        </span>
                        <div>
                            <p className='dis'>Delivered to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>
                </div>
                 {/* search */}
                <div className="search">
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" name='' id=''/>
                <FaSearch size={38} />
                </div>
                 {/* other section */}
                <div className='order_container'>
                    <Link to="" className='language'>
                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt=""/>
                    
                        <select>
                            <option value="">EN</option>
                        </select>
                    </Link>
                        {/* three components */}
                    <Link to={!user &&"/auth"}>
                    <div>
                        { user?(
                        <>
                            <p>Hello {user?.email?.split("@")[0]}</p>  
                            <span onClick={()=>{auth.signOut()}}>Hello, Sign Out</span>
                        </>
                        ):(
                        <>
                            <p>Hello, sign In</p>
                            <span>Account & Lists</span>
                        </>)
                        }
                    </div>
                    </Link>
                        {/* orders */}
                    <Link to="/orders">
                        <p>returns</p>
                        <span>& Orders</span>
                    </Link>
                        {/* Cart */}
                    <Link to="/cart" className='cart'>
                    <BiCart size={35}/>
                        <span>{totalItem}</span>
                    </Link>
                </div>
            </div>
        </section>
        <LowerHeader/>
    </section>
  );
}

export default Header