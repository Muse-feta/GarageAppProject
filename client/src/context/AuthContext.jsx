import react, { createContext, useState, useEffect, useContext } from 'react'
import getAuth from '../../util/auth'


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoged, setIsLoged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [employee, setEmployee] = useState(null);
    console.log(employee)

    const value = {
        isLoged,
        setIsLoged,
        isAdmin,
        setIsAdmin,
        employee,
        setEmployee
    }

    useEffect(() => {
        const loggedInEmployee = getAuth();
        loggedInEmployee.then((res) => {
            console.log(res)
            if(res.iat){
                setIsLoged(true)
            }
            if(res.employee_role === 3){
                setIsAdmin(true)
            }
            setEmployee(res)
        })
        
    },[ isAdmin, isLoged ])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}