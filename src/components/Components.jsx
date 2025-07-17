import { useRef, useState } from "react"
import { isopenmenustore, toperson } from "../store";
import socket from "../socket";



export default function Logo(){
return(
<><div className="w-70 h-70 bg-[url(./src/assets/Innovation_freaks-removebg-preview.png)] bg-contain bg-no-repeat bg-center
 md:w-80 md:h-80 lg:w-85 lg:h-85"/>
</>
)
}
export function InputText({p_name,it_type,val}){
    
    return(<input type={it_type} placeholder={p_name} ref={val} className="w-[80%] max-w-[500px] h-[40px] text-white p-2 
        border-2 border-[#2bc3e8] rounded-2xl focus:outline-none "/>
    )
}
export function InputButton({onclickfunction}){
    return(<button onClick={onclickfunction} className="w-[80%] max-w-[500px] h-[50px] items-center text-center text-white p-2 bg-[#2bc3e8] rounded-3xl text-[1.5rem] hover:bg-blue-300">Login</button>
    )
}

export function InputMessage(){
      const {user,setUser}=toperson();
    const [textfocus,setTextFocus]=useState(false);
    let inpid=useRef(null);
    let bdid=useRef();
    let btid=useRef();

    let sendbuttonstyle="w-[30px]  h-[30px] fixed bottom-[4px] sm:bottom-[4px] right-[4px] border-[#6C6C6C]  rounded-[50%] bg-size-[80%] bg-no-repeat bg-center";
    
    function sendmsg()
    {

    if (inpid.current.value!=""){
          const d=new Date();
    socket.emit("user_message",{
      
      from:localStorage.getItem("name"),
      to:user,
      msg:inpid.current.value,
      timestamp:`${d.getHours()}:${d.getMinutes()}`,
     });
        inpid.current.value="";
        btid.current.className=sendbuttonstyle+" bg-[url(/src/assets/send.png)] bg-transparent ";
    }
    }

    function active()
    {

    if (inpid.current.value!="")
    btid.current.className=sendbuttonstyle+" bg-[url(/src/assets/send_white.png)] bg-[#2bc3e8]";
    else
    btid.current.className=sendbuttonstyle+" bg-[url(/src/assets/send.png)] bg-transparent ";
    }
    return(<div ref={bdid} className={`w-[90vw] fixed left-[50vw] h-[40px] bottom-[10px]  -translate-x-[50%] sm:-translate-x-[0%] sm:w-[60vw]  text-white p-2 border-[0.7px] sm:bottom-[10px] sm:left-[32.5vw] rounded-[35px] ${textfocus?`border-white`:`border-[#6C6C6C]`}`}>        
    <input type="text" ref={inpid} onFocus={()=>{setTextFocus(true)}} onBlur={()=>{setTextFocus(false)}} onChange={active} placeholder="Enter message" className={`w-[60vw] outline-none border-none pr-[50px]`}/>
        <div ref={btid} onClick={sendmsg} className={sendbuttonstyle+" bg-[url(/src/assets/send.png)] bg-transparent "} ></div>
        </div> )
}



export function EachUsers({name, isonline}){
const {user,setUser}=toperson();
const {isopenmenu,setIsOpenMenu}=isopenmenustore();
var userstyle="w-[40px] h-[40px] rounded-[50%] border-2 flex justify-center items-center";
function touchuser() {
socket.emit("asak","on");
setUser(name);
setIsOpenMenu(false);
}
return(<div className="z-40"><div onClick={touchuser} className="flex flex-col hover:bg-white/50">
    <div className="h-[10px]"></div>
<div className="flex flex-row text-white items-center justify-start">
    {isonline?<div className={userstyle+" border-[#2bc3e8]"}><p>{name[0]}</p> </div>:<div className={userstyle+" border-white"}><p>{name[0]}</p> </div>} 
 <div className="w-[5px]"></div>
 <p>{name}</p> 

 </div>
<div className="h-[10px]"></div>
<div className="w-full h-[1px] bg-white"></div>

</div>

</div>);
}

export function MyMsg({sms,timestamp}){
    return ( <div className="flex flex-col items-end"> <div className="whitespace-normal wrap-break-word max-w-[30vw] p-[10px] bg-[#2bc3e8]/40 mr-[5px] rounded-t-3xl rounded-es-3xl">
    <p className="text-white">{sms}</p>
    </div>
    <p className="text-md text-white pr-[5px]">{timestamp}</p>
        <div className="h-[10px]"></div>
    </div>)
}
export function HisMsg({sms,timestamp}){
    return ( <div className="flex flex-col items-start"> <div className="whitespace-normal wrap-break-word h-auto max-w-[30vw] p-[10px] bg-[#B9B9B9]/40 ml-[5px] rounded-t-3xl rounded-br-3xl">
    <p className="w-full h-auto text-white">{sms}</p>
    </div>
    <p className="text-md text-white pl-[5px]">{timestamp}</p>
    <div className="h-[10px]"></div>
    </div>)
}