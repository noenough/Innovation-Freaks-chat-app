import { io } from "socket.io-client";
import { api_url } from "./variables";

const socket=io(api_url,{})

export default socket;