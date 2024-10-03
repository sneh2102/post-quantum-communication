import React from 'react'
import { sendMessage } from '../apis/messages'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

export const useMessages = () => {
    
    const [loading, setLoading] = React.useState(false)
    const {messages,setMessages,selectedConversations,setSelectedConversations} = useConversation()
    
    const send = async (data) => {
        setLoading(true)
        try {
            const response = await sendMessage(selectedConversations._id,data)
            if(response.status===400) {
                throw new Error(response.data.error)
            }
            else {
            setMessages([...messages,response.data.data])
            setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }
    
    return {loading, send}
}
