'use client'
import axios from "axios"
import { BsChatSquareQuote } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const page = ({params}) => {
  const router = useRouter()
  const [prevQuote,setPrevQuote] = useState();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetchQuote = async () => {
       try {
        setLoading(true)
        const data = await axios.get(`/api/users/editquote/${params.id}`);
        setPrevQuote(data.data)
        console.log(data.data)
       } catch (error) {
        console.log(error)
       } finally {
        setLoading(false)
       }
    }
    fetchQuote()
  },[params.id])
  const handleSave = async () => {
    try {
     const res =  await axios.post(`/api/users/editquote/${params.id}`, { quote: prevQuote });
     if(res.status === 201){
        router.push('/profile')
     }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col items-center py-[50px] px-4">
      <div>
        <h1 className=" text-[25px] font-bold">
          Edit or Change your own Quote{" "}
          <span>
            {" "}
            <BsChatSquareQuote className=" text-[30px] inline-block" />
          </span>{" "}
        </h1>
      </div>
      <div className="mt-5 w-[320px] sm:w-[400px] min-h-[200px] bg-white/5 rounded-[15px] border border-white p-3">
        <label>Edit your  quote</label>
        <textarea
          className="w-full bg-white/10 rounded-md h-[150px] mt-2 p-2"
          name="quote"
          value={prevQuote}
          onChange={(e) => setPrevQuote(e.target.value)}
        ></textarea>
        <button onClick={handleSave} className="w-full bg-white py-1 text-black font-bold rounded-md mt-2 text-[20px]">
         {loading ? 'Loading...':'Save'}
        </button>
      </div>
    </div>
  ) 
}

export default page;
