import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [ userDetails, setUserDetails ] = useState({
        username : "",
        email : ""
});
    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}