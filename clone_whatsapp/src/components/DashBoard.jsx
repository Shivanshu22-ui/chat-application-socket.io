import React from 'react'
import Sidebar from './Sidebar'
import OpenConversations from './OpenConversations'
import { useConversation } from '../context/ConverationProvider'

export default function DashBoard({id}) {
  const {selectedConversation} = useConversation();
  return (
    <div className='d-flex' style={{height:'100vh'}}>
        <Sidebar id={id}/>
        {selectedConversation && <OpenConversations/>}
        {/* <OpenConversations/> */}
    </div>
  )
}
