import {create} from 'zustand';

const useConversation = create((set) => ({
    selectedConversations: [],
    setSelectedConversations: (selectedConversations) => set({selectedConversations}),
    messages:[],
    setMessages: (messages) => set({messages}),
}));

export default useConversation;