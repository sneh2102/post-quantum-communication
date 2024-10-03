import React, { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { getMessages } from "../apis/messages";

export const useGetMessages = () => {
    const [loading, setLoading] = React.useState(true);
   const {messages, setMessages, selectedConversations } = useConversation()
   useEffect(()=>{
       const getMessage = async () => {
           setLoading(true);
           try {
               const response = await getMessages(selectedConversations._id);
               if (response.status === 400) {
                   console.log(response.response.data.error);
                   throw new Error(response.data.error);
               }
               else {
                   setMessages(response.data.data);
                   setLoading(false);
               }
           }
           catch (error) {
               toast.error(error.response.data.error);
           }
           finally {
               setLoading(false);
           }
       };
         if (selectedConversations?._id) {
             getMessage();
         }
   },[selectedConversations?._id,setMessages])
    return { loading, messages };
}
