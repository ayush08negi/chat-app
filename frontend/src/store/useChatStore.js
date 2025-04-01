import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set,get) => ({
    messages : [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    
    getUsers: async() =>{
        set({ isUsersLoading : true });
        try{
            const res = await axiosInstance.get("/messages/users");
           
            set({users: res.data});
        }catch(error){
           toast.error(error.response.data.message);
        } finally{
           set({ isUsersLoading : false});
        }
    },

    getMessages : async(userId) =>{
        set({ isMessagesLoading : true });
        try{
          const res = await axiosInstance.get(`/messages/${userId}`);
          set({ messages: res.data });

        } catch(error){
            toast.error(error.response.data.message);
        } finally{
            set({isMessagesLoading : false})
        }
    },

    sendMessages: async(messageData) =>{
        console.log(messageData);
        const {selectedUser,messages} = get();
        // console.log("selectedUser",selectedUser);
        // console.log("messages",messages);

        console.log("Selected User ID:", selectedUser?._id);
    
       try{
         const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
         set({messages : [...messages, res.data]})
       } catch(error){
         toast.error(error.response.data.message)
       }
    },

    subscribeToMessage:() => {
        const { selectedUser } = get();
        if(!selectedUser) return ;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage) =>{
            if(newMessage.senderId !== selectedUser._id) return ;
            set({ 
                messages: [...get().messages,newMessage],
            })
        })
    },

    unsubscribeFromMessages :() =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),


}))