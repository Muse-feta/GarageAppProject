import React from "react";
import { useAuth } from "../../../context/AuthContext";

const HeaderTop = () => {
  const { isLogged, setIsLogged, employee } = useAuth();
  console.log(employee);
  return (
    <div>
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text">Enjoy the Beso while we fix your car</div>
              <div className="office-hour">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="right-column">
              {employee ? (
                <div className="text">Welcome {employee?.first_name}</div>
              ) : (
                <div className="phone-number">
                  Schedule Your Appontment Today :{" "}
                  <strong>1800 456 7890</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
