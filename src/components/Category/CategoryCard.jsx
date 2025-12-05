import React from 'react'
import { Link } from 'react-router-dom'
const CategoryCard = ({data}) => {
  return (
    <div className='category '>
        <Link to={`/category/${data.name}`} >
            <span>
                <h2 >{data.title}</h2>
            </span>
            <img src={data.imgLink} alt="image" />
            <p >shop now</p>
        </Link>
    </div>
  )
}

export default CategoryCard 