'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
const page = ({params}) => {
  const [data,setData] = useState();
  useEffect(()=>{
    const userData = async () => {
      try {
        const postData = {userId: params.id}
      
        const response = await axios.post('/api/userProfiles',postData);
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }  
    userData()
  },[])
  return (
    <div className="flex flex-col px-[30px] sm:px-[100px] py-[50px] items-center w-full min-h-screen">
      {data && ( // Check if userInfo is not null or undefined
        <div className="text-center flex flex-col justify-center items-center">
          <div>
          <CgProfile className="text-[120px]"/>
          </div>
          <h1 className="text-[25px] font-bold mt-2"> {data.username}</h1>
          <h1> {data.email}</h1>
        </div>
      )}
   
      <div className="w-full border-t border-white mt-4 bg-white/5 min-h-[300px] px-4 sm:px-20 py-10">
        {data && (
          <h1 className="font-bold text-[20px] mb-3 ">{data.username}'s quotes :</h1>
        )}
        
        <div className=" w-full flex gap-[30px] flex-wrap">
          {data && data.quotes.map((value,index) => (
            <div className=" w-[400px] min-h-[100px] bg-white text-black border border-white rounded-[10px] p-3 text-center  flex flex-col justify-center items-center">

              <h1>{value}</h1>
              <div className=" w-fit h-fit py-2 px-4 bg-black text-white rounded-md mt-3">- {data.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
