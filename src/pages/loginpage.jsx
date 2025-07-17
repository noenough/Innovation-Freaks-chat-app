import { useEffect, useRef } from "react";
import Logo, { InputButton, InputText, } from "../components/Components"
import { api_check_auth, api_url, api_users } from "../variables";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

function LoginPage() {
  
    let navigate=useNavigate();
    useEffect(()=>{
   const token=localStorage.getItem("token");
    if (token!=null)
    {
    
    fetch(api_check_auth,{
        method: "POST",
        headers: {"Authorization":`Bearer ${token}`}
        
    }).then((value)=>{
     return value.json();
    }).then((value)=>{

     if (value=="Yes")
      navigate('/chat');

    });

      
    }
    else
    navigate("/loginpage");
    },[]);
    let nameref=useRef("");
    let passref=useRef("");
    const login_button_click=()=>{
  
    fetch(api_users,{
      method:"POST",
      headers:{'Content-Type': 'application/json',},
      body: JSON.stringify({name:nameref.current.value,
        pass:passref.current.value}),
    }).then(e=>{
      if (e.error)
      {
        alert("Error");
        return "error";
      }
      if (e.ok)
      {
 
      alert("Success")
      return e.json();
      }
    }).then(value=>{
        const token=value.token;
        localStorage.setItem("token",token);
        localStorage.setItem("name",nameref.current.value);
        navigate('/chat');

    });
  }
  return(<>
  <div className="w-screen h-screen bg-[url(./assets/bg-photo.jpg)] bg-cover">
  <div className="w-screen h-screen backdrop-blur-[5px] justify-center items-center">
<div className="w-screen h-screen w- flex flex-col justify-center items-center">
  <Logo />
  <InputText p_name={"Enter Name"} it_type={"text"} val={nameref} />
  <div className="h-[10px]"></div>
  
  <InputText p_name={"Enter Password"} it_type={"password"} val={passref} />
    <div className="h-[10px]"></div>
    <InputButton it_id={"login_button"} onclickfunction={login_button_click} />
  </div>
  </div>
</div>  
  </>)  
}

export default LoginPage;