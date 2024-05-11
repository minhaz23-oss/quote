'use client'
import { useState } from "react";
import { BsChatSquareQuote } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter()
  const [quote,setQuote] = useState('');
  const [loading,setLoading] = useState(false)
 
  const handlePost = async () => {
      try {
        setLoading(true);
        await axios.post('api/users/createquote',{quote}) 
        router.push('/profile');
        
      } catch (error) {
        console.log('error is here')
      } finally{
        setLoading(false)
      }
  }  
  return (
    <div className="flex flex-col items-center py-[50px] px-4">
      <div>
        <h1 className=" text-[25px] font-bold">
          Create and Publish your own Quote{" "}
          <span>
            {" "}
            <BsChatSquareQuote className=" text-[30px] inline-block" />
          </span>{" "}
        </h1>
      </div>
      <div className="mt-5 w-[320px] sm:w-[400px] min-h-[200px] bg-white/5 rounded-[15px] border border-white p-3">
        <label>Write your own quote</label>
        <textarea
          className="w-full bg-white/10 rounded-md h-[150px] mt-2 p-2"
          name="quote"
          value={quote}
          onChange={(e) => setQuote (e.target.value)}
        ></textarea>
        <button onClick={handlePost} className="w-full bg-white py-1 text-black font-bold rounded-md mt-2 text-[20px]">
          {loading ? 'Loading...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default page;
