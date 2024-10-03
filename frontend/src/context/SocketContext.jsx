import React,{ createContext, useEffect, useContext } from "react"
import { AuthContext } from "./auth";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext)
} 

export const SocketProvider = ({ children }) => {
    const [socket,setSocket] = React.useState(null)
    const[onlineUsers,setOnlineUsers] = React.useState([])
    const {auth} = useContext(AuthContext)
    useEffect(() => {
        if(auth){
            const socket = io("http://localhost:5000",{
                query: {
                    userId: auth.id
                }
            })
            setSocket(socket)
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
                console.log("-----------------",users)
            })
            return () => socket.close()
        } else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }

    }, [auth])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}