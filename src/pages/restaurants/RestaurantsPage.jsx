import React from "react";
import Header from "../../shared/header/Header";
import { WidgetContainer } from "../../shared/widget/Widget";
import CreateRestaurantCsv from "./restaurant-csv/CreateRestaurantCsv";

const RestaurantsPage = () => {
  return (
    <Header>
      <WidgetContainer>
        <CreateRestaurantCsv />
      </WidgetContainer>
    </Header>
  );
};

export default RestaurantsPage;
