'use client'
import Image from "next/image";
import background from "../public/myBg.jpg"
import { useCallback, useEffect, useState, useRef } from "react";


export default function Home() {

  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState ("");

  let passwordGenerator = useCallback(()=>{
    let myPass:any = "";
    let textInput = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) textInput += "1234567890";
    if(charAllowed) textInput += "!@#$%^&*";

    for(let i = 1; i <= length; i++){
      let randomNumber = Math.floor(Math.random() * textInput.length + 1);
      myPass += textInput.charAt(randomNumber);
    }
    setPassword(myPass);
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  // take password data
  let passwordRef: any = useRef(null);

  // Copy password to Clipboard
  let copyPasswordToClipbaord = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])



  return (
    <div className="relative w-full flex items-center justify-center h-screen">

      {/* Background Image */}
      <div className="absolute w-full -z-10">
        <Image className="w-full h-screen opacity-60"
         alt="Image" src={background} height={1000} width={1000} />
      </div>


      {/* Text Container */}
      <div className="containerBg p-2 lg:p-10 rounded shadow-lg shadow-green-800
      text-slate-300 flex flex-col gap-5 lg:gap-10
      ">
      {/* headings */}
      <h1 className="lg:text-6xl text-xl text-center">IB Coding School</h1>
      <h2 className="lg:text-4xl text-center">Password Generator</h2>

      {/* input & copy */}
      <div className="flex gap-1">
      <input value={password}
      ref={passwordRef}
      className=" rounded-l w-full outline-none text-black p-2 text-sm lg:text-2xl"
      type="text"/> 
      <button
      onClick={copyPasswordToClipbaord}
       className="bg-blue-800 px-1 lg:px-3 rounded-r hover:bg-blue-950
      text-sm items-center cursor-pointer"
      >Copy</button>

      </div>


      {/* length, number & character */}
      <div className="flex justify-between flex-col lg:flex-row gap-3">

      {/* length */}
      <div className="flex items-center flex-col lg:flex-row w-[60%] gap-1">
      <input 
      onChange={(e: any)=> setLength(e.target.value)}
      min={8}
      max={20}
      type="range" className="cursor-pointer"/> 
      <label className="text-sm lg:text-xl">Length: {length}</label>
      </div>


      {/* number */}
      <div className="flex gap-1 items-center">
      <input 
      defaultChecked={numberAllowed}
      onChange={()=> setNumberAllowed((perv)=> !perv)}
      className="scale-150 cursor-pointer"
      type="checkbox" id="number" /> 
      <label className="text-lg" htmlFor="number">Numbers</label>
      </div>


      {/* character */}
      <div className="flex gap-2 items-center">
      <input 
      defaultChecked={charAllowed}
      onChange={()=> setCharAllowed((perv)=> !perv )}
      className="scale-150 cursor-pointer" type="checkbox"  id="character" /> 
      <label className="text-lg" htmlFor="character">Characters</label>
      </div>

      </div>


      </div>




    </div>
  );
}
