import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../Context/StoreContext';

const SingleProperty = () => {
    const{url}=useStore();
    const {id}=useParams();
    console.log(id);


    const fetchSingleProperty=async()=>{
            try{
                const SingleProperty=await axios.get(`${url}/api/propertylist/singleProperty/${id}`)
                console.log(SingleProperty);
                
            }catch(err){
                console.log(err);
                
            }
    }

    useEffect(()=>{
            fetchSingleProperty();
    },[])
    
  return (
    <div>SingleProperty</div>
  )
}

export default SingleProperty