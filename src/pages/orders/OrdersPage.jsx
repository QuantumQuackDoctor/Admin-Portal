import Header from "../../shared/header/Header";
import {WidgetContainer} from "../../shared/widget/Widget";
import FindOrderForm from "../orders/find/FindOrderForm";
import UpdateOrderForm from "../orders/update/UpdateOrderForm";
import DeleteOrderForm from "../orders/delete/DeleteOrderForm";
import { Route } from "react-router";

const OrdersPage = () => {
    return (
        <Header>
            <WidgetContainer>
                <Route exact path="/orders" component={FindOrderForm} />
                <Route path="/orders/:id" component={DeleteOrderForm} />
            </WidgetContainer>
        </Header>
    );
};

export default OrdersPage;
