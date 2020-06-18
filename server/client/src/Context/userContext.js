import React, { createContext, useState } from 'react';

export const UserContext = createContext();

// Create a provider component that will export provider method that comes with the userContext we just created.
const UserProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(null || localStorage.getItem('user'));

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider