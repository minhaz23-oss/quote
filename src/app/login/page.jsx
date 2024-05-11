'use client'
import { BsChatSquareQuote } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const router = useRouter()
  const [userForm,setUserForm] = useState({
    email: '',
    password:''
  });
  const [btn,setBtn] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if( userForm.email.length === 0 || userForm.password.length === 0) {
      setBtn(true)
   }else {
     setBtn(false)
   }
  },[userForm])
  const handleChange = async () => {
    try {
      setLoading(true);
      await axios.post('api/users/login',userForm);
      router.push('/profile')
    } catch (error) {
      if(error.response.status === 400 && error.response.data.message === 'user doesnt exists'){
        toast.error('user doesnt exists, please signup first')
      }else if(error.response.status === 400 && error.response.data.message === 'wrong password'){
        toast.error('wrong password')
      }
    }finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-center items-center w-full h-screen px-4">
      <div><Toaster/></div>
      <div className="bg-white/5 w-[350px] sm:w-[400px] min-h-[200px] p-3 border border-white rounded-[15px]">
        <div className=" flex mx-auto w-fit">
          <BsChatSquareQuote className=" text-[20px]" />
          <h1 className="text-[20px] md:text-[25px] font-bold">QuoteMania.</h1>
        </div>

        <label htmlFor="email" className="mb-3">
          Email
        </label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setUserForm({...userForm, email: e.target.value}) }
          className=" bg-white/15 border-none rounded-md p-2 w-full outline-none mt-1 mb-2"
        />
        <label htmlFor="password" className="mb-3">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUserForm({...userForm, password: e.target.value}) }
          className=" bg-white/15 border-none rounded-md p-2 w-full outline-none mt-1 mb-2"
        />
        <button onClick={handleChange} className="w-full rounded-md bg-white text-black font-bold py-2 mt-3 mb-2">
          {loading ? 'Loading...' : (btn ? 'All fields required' : 'Login') }
        </button>
        <Link href="/signup" className=" font-normal">
          Don't have an account?{" "}
          <span className="font-black underline">Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
