import React, { useEffect } from 'react'
import { getConversations } from '../apis/conversation'

export const useConversations = () => {
const [loading, setLoading] = React.useState(true)
const [conversations, setConversations] = React.useState([])
 useEffect(() => {
    const fetchConversations = async () => {
      try {
         const response = await getConversations()
         console.log(response)
         setConversations(response.data)
         setLoading(false)
         return conversations
      } catch (error) {
         console.error(error)
      }
    }
    fetchConversations()
 }, [])
 return {loading, conversations}
}

export default useConversations

