import React from 'react'
import {categoryInfos} from './categoryFullInfos'
import CategoryCard from './CategoryCard'
import './Category.Module.css'
const Category = () => {
  return (
    <section className='category_container grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4'>
        {
          categoryInfos.map((infos)=>{
          return  <CategoryCard data={infos} key={infos.id}/>
          })
        } 
    </section>
  )
} 

export default Category 