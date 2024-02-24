// import react and useeffct and usestate
import { useEffect, useState } from "react";

// import react router dom
import { useNavigate } from "react-router-dom";

import getAuth from "../../../../util/auth";

const PrivateAuthRoute = ({ role, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLoged, setIsLoged] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(()=>{
        const loggedInEmployee = getAuth();
        loggedInEmployee.then((res) => {
            if(res.iat){
                setIsLoged(true);
                if(role && role.length > 0 && role.includes(res.employee_role)){
                    setIsAuthorized(true);
                }
            }
            setIsChecked(true);
        })
    },[role])

    const navigate = useNavigate();
    if(isChecked){
        if(!isLoged){
            navigate('/login');
        }
        if(!isAuthorized){
            navigate('/unauthorized');
        }
    }

    return children;
}

export default PrivateAuthRoute