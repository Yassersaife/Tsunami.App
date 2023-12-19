import React, {createContext, useState} from 'react';



 const AuthContext = createContext();

 const AuthProvider = ({children}) => {

    const [UserID,setuserID] = useState('');


   
    return (
        <AuthContext.Provider value={
           [
            UserID,setuserID
           ]
        }>
          {children}
        </AuthContext.Provider>
      );
};
export { AuthContext, AuthProvider };