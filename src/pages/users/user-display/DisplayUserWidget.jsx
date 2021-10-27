import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserById } from "../../../services/UserService";
import { Widget } from "../../../shared/widget/Widget";

const DisplayUserWidget = ({ id, close }) => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    DOB: "",
  });
  useEffect(async () => {
    try {
      let response = await getUserById(id);
      setUser(response.data);
    } catch (err) {
      close();
    }
  }, [id, close]);
  return (
    <Widget title="Account">
      <div className="UserWidget-container">
        <p>{user.email}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.isVeteran ? "Veteran" : "Not Veteran"}</p>
        <p>{user.phone}</p>
        <button className="button" onClick={() => close()}>
          Close
        </button>
      </div>
    </Widget>
  );
};

DisplayUserWidget.propTypes = {
  id: PropTypes.number,
  close: PropTypes.func,
};

export default DisplayUserWidget;
