
import DeleteOrderForm from "./DeleteOrderForm";
import Router, {MemoryRouter, Route} from "react-router-dom";
import {render} from "@testing-library/react";


const renderComponent = ({orderId}) => {
    render(
        <MemoryRouter initialEntries={[`/orders/${orderId}`]}>
            <Route path="/orders/:orderId">
                <DeleteOrderForm />
            </Route>
        </MemoryRouter>
        );
}

it("renders form", () => {
    renderComponent({orderId: 1})
});
