import React , {useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactContext = React.createContext();

export function useContact(){
  return useContext(ContactContext);
}

export function ContextProvider({children}) {
  const [contact ,setContact] = useLocalStorage('contact',[]);

  function createContact(id,name){
    setContact(prev=>{
      return [...prev,{id,name}];
    })
  }  
  return (
    <ContactContext.Provider value={{contact,createContact}}>
      {children}
    </ContactContext.Provider>
  )
}