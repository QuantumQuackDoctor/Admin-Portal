import {FormBuilder} from "../../../shared/form-widget/FormWidget";
import {FaHashtag} from "react-icons/fa";
import {useState} from "react";
import { useHistory } from 'react-router-dom';
import {getOrder} from "../../../services/OrderService";

const FindOrderForm = () => {
    const history = useHistory();
    let builder = new FormBuilder("FindOrder");
    const [errorMessage, setErrorMessage] = useState("");
    builder
        .addErrorMessageState(errorMessage)

        .addField("Id", "id")
        .setPlaceholder("Order Id")
        .setErrorMessage("*Id required")
        .setIcon(<FaHashtag />)
        .and()


    const submitFunction = (orderId) => {
        let order = orderId.id;
        if (order != "") {
            getOrder(order).then(res => {
                if (order === res.data.id) {
                    if (res.data.refunded === true) {
                        history.push("/orders/" + order);
                    }
                }
            }).catch(err => {
                setErrorMessage("*Invalid Id " + err);
            })
        }
        else {
            setErrorMessage("*Id required");
        }
    };

    return <>{builder.build(submitFunction)}</>;
};

export default FindOrderForm;