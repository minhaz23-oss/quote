
'use client'
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";


const ApiQuotes = () => {
  const [inputs, setInputs] = useState("");
  const [noQuoteMsg,setNoQuoteMsg] = useState(false)
  const [loading, setLoading] = useState(false);
  const [randomQuotes, setRandomQuotes] = useState([]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://api.quotable.io/search/quotes?query=${inputs}`
      );
     if(data.data.results.length === 0){
      setNoQuoteMsg(true)
     } else {
      setNoQuoteMsg(false)
     }
      setRandomQuotes(selectRandomQuotes(data.data.results));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const demoData = async () => {
      try {
        const res = await axios.get('https://api.quotable.io/quotes?limit=6');
        setRandomQuotes(res.data.results)
      } catch (error) {
        console.log(error)
      }
    }
    demoData()
  },[])

  const selectRandomQuotes = (quotesArray) => {
    const shuffledQuotes = [...quotesArray].sort(() => Math.random() - 0.5);
    return shuffledQuotes.slice(0, 6); // Select the desired number of quotes
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[300px] bg-white/10 rounded-[15px] mt-10 py-4 px-4">
 
      <h1 className="text-center text-[25px] md:text-[30px] font-semibold">
        Search Quotes by topic, Find Quotes of your mood!!
      </h1>
      <div className="w-full md:w-[350px] lg:w-[650px] h-[50px] bg-black flex mt-5 rounded-[100px] overflow-hidden">
  <input
    type="text"
    placeholder="search topic "
    className=" px-3 w-[calc(100%-75px)] sm:px-10 bg-black outline-none border-none"
    value={inputs}
    onChange={(e) => setInputs(e.target.value)}
  />
  <div
    onClick={handleClick}
    className="text-[20px] md:text-[20px] lg:text-[20px] w-[70px] flex justify-center items-center p-3 bg-black cursor-pointer"
  >
    <FaSearch />
  </div>
</div>

      <div className="w-full flex flex-wrap justify-center gap-[30px] mt-5">
        {loading ? (
          <div className="quote-container flex flex-wrap justify-center gap-[30px]">
          {randomQuotes.map((_, index) => (
            <div key={index} className="w-[250px] sm:w-[400px] bg-gray-200 rounded-md p-4 shadow-sm animate-pulse">
              <div className="h-16 bg-gray-300 rounded-md mb-2"></div>
              <p className="text-gray-400 text-sm font-medium">Quote content...</p>
            </div>
          ))}
        </div>
        ) : (
          <>
          {noQuoteMsg ? (
          <h1 className="text-[25px] font-semibold text-center">No Quotes in this topic!!💤</h1>
          ):(
            <>
             {randomQuotes.map((val, index) => (
              <div
                key={index}
                className="w-[400px] min-h-[100px] bg-white text-black border border-white rounded-[10px] p-3 text-center  flex flex-col justify-center items-center"
              >
                <div>{val.content}</div>
                <div className="mt-3 py-2 px-4 bg-black text-white rounded-md">
                  {val.author}
                </div>
              </div>
            ))}
            </>
          )}
           
          </>
        )}
      </div>
    </div>
  );
};

export default ApiQuotes;

