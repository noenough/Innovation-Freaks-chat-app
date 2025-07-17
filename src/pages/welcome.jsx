import { isopenmenustore } from "../store";

export function WelcomePage() {
          const {isopenmenu,setIsOpenMenu}=isopenmenustore();
    return(<div className="h-screen flex flex-col">
         <div className="w-screen h-screen flex flex-col sm:w-[75vw] sm:flex-1">
        
            <div className="w-[40px] h-[45px] m-[10px] bg-[#2BC3E8]/37 rounded-2xl sm:hidden">

        <div onClick={()=>setIsOpenMenu(!isopenmenu)} className="w-full h-full rounded-2xl flex justify-center items-center sm:hidden">
          <img className="w-[30px] h-[30px]" src="/src/assets/menu.png"/></div></div>

    <div className="w-full h-full flex flex-col justify-center items-center">
       <img className="w-[300px] h-[300px]" src="/src/assets/Innovation_freaks-just-logo.png" alt="" />
       <p className="bg-linear-to-bl from-[#2bc3e8] to-white text-5xl font-extralight  bg-clip-text text-transparent">Nailow Goyun</p>
    </div>
  
</div>     
</div>
)
}

