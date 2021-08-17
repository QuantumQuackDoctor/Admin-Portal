import { useState } from "react";
import { getCurrentUser } from "../../../services/UserService";
import { Widget } from "../../../shared/widget/Widget";
import { useEffect } from "react";
import { useAuth } from "../../../services/contex-provider/ServiceProvider";
import "./UserWidget.css";

const UserWidget = ({ authenticated }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    email: "",
    DOB: "",
    firstName: "",
    lastName: "",
    phone: "",
    veteranStatus: "",
    points: 0,
    settings: {
      notifications: {
        email: false,
        text: false,
      },
      theme: "light",
    },
  });
  const authService = useAuth();

  useEffect(() => {
    if (authenticated) {
      getCurrentUser().then((res) => {
        setCurrentUser(res.data);
      });
    }
  }, [authenticated]);
  return (
    <>
      {authenticated ? (
        <Widget title="Account">
          <div className="UserWidget-container">
            <p>{currentUser.email}</p>
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
            <p>{currentUser.DOB}</p>
            <div className="UserWidget-left-right">
              <button
                className="FormWidget-submit"
                onClick={() => {
                  authService.logout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </Widget>
      ) : (
        ""
      )}
    </>
  );
};

export default UserWidget;
