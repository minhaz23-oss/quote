"use client";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ApiQuotes from "@/components/ApiQuotes";

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getQuotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("api/quotes");
        setQuotes(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getQuotes();
  }, []);
  
  return (
    <main>
      <Nav />
      <div className="w-full px-[30px] md:px-[100px] py-[40px] flex flex-col items-center">
        
        <h1 className="text-white/50 font-black text-center text-[40px] md:text-[60px]  leading-none ">
          "Discover Inspiration: Explore the World of Quotes"
        </h1>
        
        <ApiQuotes/>
         
       
              <div className=" w-full min-h-[300px] bg-white/10 rounded-[15px] mt-10 flex flex-col  justify-center px-4  py-5">
                <h1 className="text-[25px] font-semibold text-center border-b border-white">
                  Users quotes
                </h1>

                <div className="mt-4 w-full flex justify-center gap-[30px] flex-wrap">
                  {loading ?(
                    <h1>Loading...</h1>
                  ):(
                   
                  <>
                    {quotes &&
                      quotes.map((value, index) =>
                        value.quotes.map((v, i) => (
                          <div key={i} className=" w-[400px] min-h-[100px] bg-white text-black border border-white rounded-[10px] p-3 text-center  flex flex-col justify-center items-center">
                            {v}
                            <Link href={`/userProfile/${value.id}`}>
                              <div className="group cursor-pointer mt-3 relative">
                                <div className="py-2 px-4 bg-black text-white rounded-md">
                                  {value.username}
                                </div>
                                <span className="hidden w-[100px] ml-1 absolute bg-black/50 text-black   left-[100%] bottom-[50%] group-hover:block">
                                  See Profile
                                </span>
                              </div>
                            </Link>
                          </div>
                        ))
                      )}
                      </>
                  )}
                </div>

                <Link
                  className=" border border-white hover:bg-white hover:text-black mt-5 px-4 py-2 rounded-[50px] font-bold text-[12px] sm:text-[18px] mx-auto text-white"
                  href="/signup"
                >
                  Signup for creating your own quotes
                </Link>
              </div>
           
          
        
        
      </div>
    </main>
  );
}
