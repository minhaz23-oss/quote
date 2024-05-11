"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsChatSquareQuote } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { useCookies } from "react-cookie";
import { parseCookies,destroyCookie } from 'nookies';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies,removeCookie]= useCookies(['token']);
  const [toggle,setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  }
  useEffect(() => {
    // Parse cookies
    const cookies = parseCookies();
    const token = cookies.token; // Get the value of the 'token' cookie
   
    // Check if token exists
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);
  const handleLogOut = () => {
    destroyCookie(null,'token')
    setIsLoggedIn(false)
    setToggle(false)
  }
  return (
    <>
    <nav className="w-full h-[60px] bg-white/5  flex justify-between items-center px-[30px] md:px-[100px]">
      <div className="flex sm:hidden">
      <BsChatSquareQuote className=" text-[30px]" />
      </div>
      <div className="hidden sm:flex">
        <BsChatSquareQuote className=" text-[20px]" />
        <h1 className="text-[20px] md:text-[25px] font-bold">QuoteMania.</h1>
      </div>
      <div className=" flex gap-5 ">
        {isLoggedIn ? (
          <div><CgProfile onClick={handleToggle} className="text-[30px] cursor-pointer"/></div>
        ) : (
          <div className="flex gap-[10px] sm:gap-[20px]">
            <Link
              href="/signup"
              className="bg-white px-3 py-1 text-black font-bold rounded-md"
            >
              Signup
            </Link>
            <Link
              href="/login"
              className=" border border-white px-3 py-1 rounded-md font-bold"
            >
              Login
            </Link>
          </div>
        )}
       
      </div>
    </nav>
    {toggle && (
      <div className="w-[200px] h-fit bg-white text-black absolute right-[50px] mt-2 p-3 font-bold text-[18px]  rounded-md">
        <Link href='/profile' className="cursor-pointer">Profile</Link>
        <div onClick={handleLogOut} className=" flex items-center gap-1 mt-3 cursor-pointer">
        <LuLogOut />
        <h1>Logout</h1>
        </div>
      </div>
    )}
    </>
  );
};

export default Nav;
