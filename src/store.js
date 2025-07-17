//zustand chapter
import { create } from "zustand";

export const toperson=create((set)=>({
    user:"",
    setUser: (new_user)=>set((state)=>({user: new_user})),

}))

export const isopenmenustore=create((set)=>({
    isopenmenu:false,
    setIsOpenMenu: (current)=>set((state)=>({isopenmenu:current}))

}))

export const fromstore=create((set)=>({
    from:[],
    setFrom:(current)=>set((state)=>({from:current})),
    addednewf:(data)=>set((state)=>({from:from.push(data)}))
}))

export const tostore=create((set)=>({
    to:[],
    setTo:(current)=>set((state)=>({to:current})),
    addednewt:(data)=>set((state)=>({to:to.push(data)}))
}))

export const messagesstore=create((set)=>({
    messages:[],
    setMessages:(current)=>set((state)=>({messages:current})),
    addednewm:(data)=>set((state)=>({messages:messages.push(data)}))
}))

export const timestampstore=create((set)=>({
    timestamp:[],
    setTimestamp:(current)=>set((state)=>({timestamp:current})),
    addednewtm:(data)=>set((state)=>({timestamp:timestamp.push(data)}))
}))
