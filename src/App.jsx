import React, { useContext, useEffect } from 'react';
import './App.css'
import Routing from './Routing';
import { DataContext } from './components/DataProvider/DataProvider';
import { auth } from './Utility/firebase';
import { Type } from './Utility/action.type';

function App() {
  const [{user},dispach] = useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // console.log(authUser)
        dispach({
          type:Type.SET_USER,
          user:authUser,
        });
      }else{
        dispach({
          type:Type.SET_USER,
          user:null,
        });
      }
    })
  },[])
    return(
          <Routing/>
    );
}

export default App
