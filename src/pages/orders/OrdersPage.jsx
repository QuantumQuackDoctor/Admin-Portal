import Header from "../../shared/header/Header";
import { WidgetContainer } from "../../shared/widget/Widget";
import FindOrderForm from "../orders/find/FindOrderForm";
import DeleteOrderForm from "../orders/delete/DeleteOrderForm";
import { useState } from "react";
import "./UpdateOrderForm.css";

const OrdersPage = () => {
  const [openOrders, setOpenOrders] = useState([]);
  const openNewOrder = (id) => {
    if (openOrders.find((val) => val === id)) return;
    setOpenOrders([...openOrders, id]);
  };

  const closeOrder = (id) => {
    setOpenOrders(openOrders.filter((val) => val !== id));
  };

  return (
    <Header>
      <WidgetContainer>
        {openOrders.map((id) => (
          <DeleteOrderForm key={id} id={id} close={() => closeOrder(id)} />
        ))}
        <FindOrderForm openOrder={openNewOrder} />
      </WidgetContainer>
    </Header>
  );
};

export default OrdersPage;
