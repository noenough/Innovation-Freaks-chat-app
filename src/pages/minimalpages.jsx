import { isopenmenustore, toperson } from "../store";
import { HisMsg, InputMessage, MyMsg } from "../components/Components";
import socket from "../socket";
import { useEffect, useRef, useState } from "react";

export function Communication({f:from, t:to,m:messages,tm:timestamp}) {
  const [fromm,setFromm]=useState([]);
  const [too,setToo]=useState([]);
  const [msgg,setMsgg]=useState([]);
  const [tmstmp,setTmstmp]=useState([]);
  const endsection=useRef();
  const {isopenmenu,setIsOpenMenu}=isopenmenustore();
    const {user,setUser}=toperson();
    let flag="";
    
  useEffect(()=>{

    socket.on("asak",()=>{
   endsection.current.scrollIntoView({behavior:"smooth"});
    });


    //msg almaly
    
      socket.on("receive_message",(data)=>{
        if (flag=="")
        {
        flag=data.message;
       setFromm(query=>[...query,data.from]);
       setToo(query=>[...query,data.to]);
       setMsgg(query=>[...query,data.message]);
       setTmstmp(query=>[...query,data.timestamp]);
           setTimeout(()=>{endsection.current.scrollIntoView({behavior:"smooth"});},10)
        }
        else
        flag="";

        })



  },[])

    return(<div className="h-screen flex flex-col">
         <div className="w-screen h-screen flex flex-col sm:w-[75vw] sm:flex-1">
<div className="w-[40px] h-[50px] m-[10px] bg-[#2BC3E8]/37 rounded-2xl sm:hidden">

        <div onClick={()=>setIsOpenMenu(!isopenmenu)} className="w-full h-full rounded-2xl flex justify-center items-center sm:hidden">
          <img className="w-[30px] h-[30px]" src="/src/assets/menu.png"/></div></div>
          <p className="text-white absolute top-[10px] left-[50vw] sm:left-[62.5vw] -translate-x-[50%]  text-xl">{user}</p>
 
    <div className="w-full sm:h-[60px] border-white border-b-[0.7px] sm:mt-[11px] sm:w-[100%] flex justify-start items-center" />

       <div className="right-3 h-full overflow-auto overflow-x-hidden">
      <div className="flex p-1 flex-col">
        {
      messages.map((msg, index) => {return (from[index]==localStorage.getItem("name"))?(to[index]==user)&&<MyMsg key={index} sms={msg} timestamp={timestamp[index]}/>:
      (from[index]==user)&&(to[index]==localStorage.getItem("name"))&&<HisMsg key={index} sms={msg} timestamp={timestamp[index]}/>}) 
      
       }
      {msgg.map((msg,index)=> {return (fromm[index]==localStorage.getItem("name"))?(too[index]==user)&&<MyMsg key={index} sms={msg} timestamp={tmstmp[index]} />:
      (fromm[index]==user)&&(too[index]==localStorage.getItem("name"))&&<HisMsg key={index} sms={msg} timestamp={tmstmp[index]}/>})
      }
      </div>
    <div ref={endsection}></div>
     </div>
       
   <div className="h-[65px]"></div>
      
    <InputMessage />

</div>
</div>
)
}