import React from 'react'

const Sidebar = () => {
  const {getUsers,users,selectedUser,setSelectedUser, isUsersLoading} = useChatStore();
  
  const onlineUsers = [];

  useEffect(()=>{
     getUsers();
  }, [getUsers])

  if(isUsersLoading)  return <SidebarSkeleton/>

  return (
    <div>Sidebar</div>
  )
}

export default Sidebar