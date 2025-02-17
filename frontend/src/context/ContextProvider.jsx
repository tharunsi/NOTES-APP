import React,{ createContext, useContext, useState,useEffect} from 'react'
import axios from 'axios';


const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [notes, setNotes] = useState([]); 
    const login = (user) => {
        setUser(user)
    }
    const logout = () => {
      localStorage.removeItem('token')
      setUser(null)
      setNotes([]);
    }

    useEffect(() => {
      const verifyUser = async () => {
        console.log("verifyUser function is running...");
        
        try{
          // const token = localStorage.getItem("token");
         

    // if (!token) {
    //   console.log("No token found, user is not authenticated.");
    //   return;
    // }
          const res = await axios.get('http://localhost:5000/api/auth/verify',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          // console.log("Token from localStorage:", token);
          if(res.data.success) {
            setUser(res.data.user)
          } else{
            setUser(null)
          }
        }catch(error){
          console.log(error)
        }
      }
      verifyUser()
    }, [])
  return (
    <authContext.Provider value={{ user,login,logout}}>
        {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext)
export default ContextProvider
