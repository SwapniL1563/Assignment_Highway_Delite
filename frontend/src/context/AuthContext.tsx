import { createContext, useContext, useState } from "react";

interface AuthContextInterface {
    token:string | null,
    setToken: (token:string | null) => void
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const [ token , setToken ] = useState<string | null>( 
        localStorage.getItem("token")
    );

    const updateToken = (newToken:string | null) =>  {
         if(newToken) {
            localStorage.setItem("token",newToken)
         } else {
            localStorage.removeItem("token");
         };

         setToken(newToken)
    }
    
    return <AuthContext.Provider value={{token,setToken:updateToken}}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}