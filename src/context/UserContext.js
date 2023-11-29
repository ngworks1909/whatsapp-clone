import { createContext, useState} from "react";


export const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [active, setActive] = useState(false);
    return (
        <UserContext.Provider value={{active,setActive}}>
           {children}
        </UserContext.Provider>
    );

}