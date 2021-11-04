import React from "react";
import Header from "../../shared/header/Header";
import { WidgetContainer } from "../../shared/widget/Widget";
import { useStickyState } from "../../util/stickyHook";
import DisplayUserWidget from "./user-display/DisplayUserWidget";
import FindUserWidget from "./user-search/FindUserWidget";

const UsersPage = () => {
  const [openUsers, setOpenUsers] = useStickyState([], "openUsers");

  const openUser = (id) => {
    let num = parseInt(id);
    if (!openUsers.includes(num)) setOpenUsers([...openUsers, num]);
  };

  const createCloseFunction = (id) => {
    return () => {
      setOpenUsers(openUsers.filter((val) => val !== id));
    };
  };
  return (
    <Header>
      <WidgetContainer>
        <FindUserWidget openUser={openUser} />
        {openUsers.map((id) => (
          <DisplayUserWidget key={id} id={id} close={createCloseFunction(id)} />
        ))}
      </WidgetContainer>
    </Header>
  );
};

export default UsersPage;
