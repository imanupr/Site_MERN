
import { useEffect, useState } from 'react'
import Card from '../../components/user/Card'
import { listProducts } from '../../services/userServices'
export const Productpage = () => {

  const [products,setProducts] =useState([])

  useEffect(()=>{
    listProducts().then((res)=>{
      setProducts(res.data)
    }).catch((err)=> console.log(err)
    )
    
  },[])


  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>

      {
        products && products.map((product, i)=>{
          return <Card key={i} product={product}/>

        })
      }

   
     
    </div>
  )
}


