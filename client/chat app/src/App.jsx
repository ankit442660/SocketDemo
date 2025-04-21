import { useEffect, useState } from "react";

import io from 'socket.io-client';

// import {nanoid} from "nanoid";

//no dotenv

const socket=io.connect("http://localhost:3000");

const App = () => {
  const [message, setmessage] = useState("");
  const [data, setdata] = useState([]);
  
  const onchangeinput = (value) => {
    setmessage(value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    
    socket.emit("chat",{message});
    
    setmessage("");
  };

  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setdata([...data,payload]);

    });

  })
  return (
    <>
      <div className="m-10 border-2 border-gray-400 w-fit p-10 rounded-sm ">
        <h1 className="text-2xl font-serif text-yellow-800 mb-5"> Chat App</h1>
        <form onClick={submitForm}>
          <label htmlFor="" className="text-1.5xl text-gray-500 py-10">
            {" "}
            Enter your message:
          </label>
          <br />
          <input
            className="rounded-md p-1 mr-5 text-1.3xl text-gray-700 outline-0 border-2
          border-gray-600 font-sans mt-3"
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e)=>{
              onchangeinput(e.target.value);
            }}
          />
          <button type="submit" className="bg-gray-500 rounded-sm p-2">
            Send
          </button>
        </form>

        <br />

        {data.map((value, index) => {
          return (
            <p key={index} className="text-[18px] m-1 capitalize">
              {value.message}
            </p>
          )
        })}
      </div>
    </>
  );
};

export default App;
