'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import pfp from '../../../public/pfp.jpg';
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [userInfo, setUserInfo] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/users/profile');
        console.log(response.data)
        setUserInfo(response.data); // Set the userInfo state
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col px-[30px] md:px-[100px] py-[50px] items-center w-full min-h-screen">
      {userInfo && ( // Check if userInfo is not null or undefined
        <div className="text-center flex flex-col justify-center items-center">
           <div  className="group">
            <div className="relative">
              <Image src={pfp} width={100} height={100} className="rounded-[100%]" />
              <div className="opacity-0 group-hover:opacity-100  cursor-pointer  text-black absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <p className="text-[12px] font-semibold">Change Profile</p>
              </div>
            </div>
          </div>
          <h1 className="text-[25px] font-bold mt-2"> {userInfo.username}</h1>
          <h1> {userInfo.email}</h1>
        </div>
      )}
     
      <Link href='/createquote' className="px-7 py-2 bg-white/5 border border-white text-white font-semibold rounded-md mt-3">Create a quote</Link>
      <div className="w-full border-t border-white mt-4 bg-white/5 min-h-[300px] px-10 md:px-20 py-10">
        <h1 className="font-bold text-[20px] mb-3 ">Your quotes :</h1>
        <div className=" w-full flex gap-[30px] flex-wrap">
          {userInfo && userInfo.quotes.map((value,index) => (
            <div className=" w-[400px] min-h-[100px] bg-white text-black border border-white rounded-[10px] p-3 text-center  flex flex-col justify-center items-center">

              <h1>{value}</h1>
              <div className=" w-fit h-fit py-2 px-4 bg-black text-white rounded-md mt-3">- {userInfo.username}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;


