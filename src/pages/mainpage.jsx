import { createElement, useContext, useEffect, useRef, useState } from "react";
import {  api_messages, api_users } from "../variables";
import { useNavigate } from "react-router-dom";
import { Communication } from "./minimalpages";
import { fromstore, isopenmenustore, messagesstore, timestampstore, toperson, tostore } from "../store";
import socket from "../socket";
import { EachUsers } from "../components/Components";
import { WelcomePage } from "./welcome";

function MainPage() {
      const [isuserconnect,setIsUserConnect]=useState([]);
      const {user,setUser}=toperson();
       const {isopenmenu,setIsOpenMenu}=isopenmenustore();
      //messages
       
       const {from,setFrom,addednewf}=fromstore();
       const {to,setTo,addednewt}=tostore();
       const {messages,setMessages,addednewm}=messagesstore();
       const {timestamp,setTimestamp,addednewtm}=timestampstore();

       //---
  let navigate=useNavigate();
  const [users,setUsers]=useState([]);

  useEffect(()=>{
    if (localStorage.getItem("token")==null)
    navigate("/loginpage");
    socket.emit("register",localStorage.getItem("name"));
    
    socket.on("all_connected",(data)=>{
      setIsUserConnect(data);
    })
    //user connect
    socket.on("user_connect",(data)=>{
      if (isuserconnect.find((element)=>element==data)==undefined)
      setIsUserConnect(prevmessage=>[...prevmessage,data]);
      
      

    })
    //user disconnect
    socket.on("user_disconnect",(data)=>{
    const newarray=[...isuserconnect];
    newarray.splice(newarray.indexOf(data),1);
    setIsUserConnect(newarray);
      
    })
    //api den user alyarys
    getmessages();
    getusers();
    socket.on("current_users",(data)=>{
    setUsers(data);
    })
   },[]);
   function getmessages() {
   fetch(api_messages).then((value)=>{
    return value.json();

   }).then((value)=>{
    setFrom(value.f);
    setTo(value.t);
    setMessages(value.m);
    setTimestamp(value.tm);
    
   })
   }
   function getusers() {    
   fetch(api_users).then((value)=>{
    return value.json();
   }).then((data)=>{
   setUsers(data);
   });
   
  }

  return(<>
      
<div className="w-screen h-screen bg-[url(./assets/bg-photo.jpg)] bg-cover">

  <div className="w-screen h-screen backdrop-blur-[5px] justify-center items-center flex flex-row">
{//users

      <div className={`h-screen w-[50vw] rounded-tr-3xl bg-gray-700 rounded-br-3xl overflow-auto sm:overflow-hidden overflow-x-hidden sm:rounded-none ${isopenmenu?`visible`:`hidden`} sm:bg-transparent absolute left-0 z-50 sm:relative border-white sm:flex sm:flex-col sm:w-[25vw] sm:border-r-[0.7px]`}>
      <div className="absolute sm:fixed left-[25vw] sm:left-[12vw] -translate-x-[50%] top-[10px] z-40 text-xl text-white"><p>{localStorage.getItem("name")}</p></div>
<div className="w-[50vw] h-screen sm:relative flex absolute border-white sm:border-b-[0.7px] sm:w-[25vw] sm:h-[58px]"></div>

       <div className="flex flex-col overflow-auto">  
<div className="h-[40px] sm:hidden"></div>

<div className="flex flex-col">
{users.map((value)=>{return (value!=localStorage.getItem("name")?<EachUsers isonline={isuserconnect.find((element)=>element==value)==value} key={value} name={value} />:<div key={value}></div>)})}
</div>
</div>
</div>
}

{user!=""?<Communication f={from} t={to} m={messages} tm={timestamp} />:<WelcomePage />}
    <div onClick={()=>setIsOpenMenu(false)} className={`w-screen h-screen ${isopenmenu?'visible':'hidden'} absolute bg-black/80 z-40 sm:hidden`}></div>


</div>
</div>
  </>)  
} 

export default MainPage;