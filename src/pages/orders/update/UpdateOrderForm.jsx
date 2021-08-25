import {FormBuilder} from "../../../shared/form-widget/FormWidget";
import {FaHashtag} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import { getOrder, updateOrder } from "../../../services/OrderService";
import "./UpdateOrderForm.css"

const UpdateOrderForm = () => {
    let {id} = useParams();
    const history = useHistory();

    const [orders, setOrders] = useState({
        id: 0,
        orderType: null,
        driverId: null,
        restaurantId: null,
        driverNote: null,
        address: null,
        orderTime: {
            orderPlaced: null,
            restaurantAccept: null,
            restaurantStart: null,
            restaurantComplete: null,
            driverAccept: null,
            delivered: null,
            deliverySlot: null,
        },
        refunded: null,
        price: {
            food: 0.0,
            delivery: 0.0,
            tip: 0.0,
        },
        food: null,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await getOrder(id);
                console.log(request);
                setOrders(request.data)
                return request;
            }
            catch (err) {
                // history.push("/orders");
            }
        }
        fetchData();
    }, [id]);

    console.log(orders);



    let builder = new FormBuilder("Update Order");
    const [errorMessage, setErrorMessage] = useState("");
    builder

        .addField("Id: " + orders.id, "id")
        .setIcon(<FaHashtag />)
        .and()

        .addField("Order Type", "orderType")
        .setInitialValue(orders.orderType)
        .setPlaceholder(orders.orderType)
        .and()

        .addField("Driver Id", "driverId")
        .setInitialValue(orders.driverId)
        .setPlaceholder(orders.driverId)
        .and()

        .addField("Restaurant Id", "restaurantId")
        .setInitialValue(orders.restaurantId)
        .setPlaceholder(orders.restaurantId)
        .and()

        .addField("Driver Note", "driverNote")
        .setInitialValue(orders.driverNote)
        .setPlaceholder(orders.driverNote)
        .and()

        .addField("Address", "address")
        .setInitialValue(orders.orderTime.orderPlaced)
        .setPlaceholder(orders.orderTime.orderPlaced)
        .and()

        .addField("Order Placed Time", "orderPlaced")
        .setInitialValue(orders.orderTime.orderPlaced)
        .setPlaceholder(orders.orderTime.orderPlaced)
        .and()

        .addField("Restaurant Accept Time", "restaurantAccept")
        .setInitialValue(orders.orderTime.restaurantAccept)
        .setPlaceholder(orders.orderTime.restaurantAccept)
        .and()

        .addField("Restaurant Start Time", "restaurantStart")
        .setInitialValue(orders.orderTime.restaurantStart)
        .setPlaceholder(orders.orderTime.restaurantStart)
        .and()

        .addField("Restaurant Complete Time", "restaurantComplete")
        .setInitialValue(orders.orderTime.restaurantComplete)
        .setPlaceholder(orders.orderTime.restaurantComplete)
        .and()

        .addField("Driver Accept Time", "driverAccept")
        .setInitialValue(orders.orderTime.driverAccept)
        .setPlaceholder(orders.orderTime.driverAccept)
        .and()

        .addField("Delivered Time", "delivered")
        .setInitialValue(orders.orderTime.delivered)
        .setPlaceholder(orders.orderTime.delivered)
        .and()

        .addField("Delivery Slot", "deliverySlot")
        .setInitialValue(orders.orderTime.deliverySlot)
        .setPlaceholder(orders.orderTime.deliverySlot)
        .and()

        .addField("Refunded", "refunded")
        .setInitialValue(orders.refunded)
        .setPlaceholder(orders.refunded)
        .and()

        .addField("Food Price", "food")
        .setInitialValue(orders.price.food)
        .setPlaceholder(orders.price.food)
        .and()

        .addField("Delivery Price", "delivery")
        .setInitialValue(orders.price.delivery)
        .setPlaceholder(orders.price.delivery)
        .and()

        .addField("Tip Price", "tip")
        .setInitialValue(orders.price.tip)
        .setPlaceholder(orders.price.tip)
        .and()



    const submitFunction = (orderFields) => {
        let orderData = changeFormDataToOrder(orderFields);
        console.log(orderData);
        updateOrder(orderData).then(
            (res) => {

            },
            (err) => {
                switch (err.response.status) {
                    case 400:
                        setErrorMessage("*missing field");
                        break;
                    default:
                        setErrorMessage("Update failed");
                }
            }
        );
    };

    const changeFormDataToOrder = (obj) => {
        return {
            id: orders.id,
            orderType: (obj.orderType === "") ? orders.orderType : obj.orderType,
            driverId: (obj.driverId === "") ? orders.driverId : obj.driverId,
            restaurantId: (obj.restaurantId === "") ? orders.restaurantId : obj.restaurantId,
            driverNote: (obj.driverNote === "") ? orders.driverNote : obj.driverNote,
            address: (obj.address === "") ? orders.address : obj.address,
            orderTime: {
                orderPlaced: (obj.orderPlaced === "") ? orders.orderTime.orderPlaced : obj.orderPlaced,
                restaurantAccept: (obj.restaurantAccept === "") ? orders.orderTime.restaurantAccept : obj.restaurantAccept,
                restaurantStart: (obj.restaurantStart === "") ? orders.orderTime.restaurantStart : obj.restaurantStart,
                restaurantComplete: (obj.restaurantComplete === "") ? orders.orderTime.restaurantComplete : obj.restaurantComplete,
                driverAccept: (obj.driverAccept === "") ? orders.orderTime.driverAccept : obj.driverAccept,
                delivered: (obj.delivered === "") ? orders.orderTime.delivered : obj.delivered,
                deliverySlot: (obj.deliverySlot === "") ? orders.orderTime.deliverySlot : obj.deliverySlot,
            },
            refunded: (obj.refunded === "") ? orders.refunded : obj.refunded,
            price: {
                food: (obj.food === null) ? orders.price.food : obj.food,
                delivery: (obj.delivery === null) ? orders.price.delivery : obj.delivery,
                tip: (obj.tip === null) ? orders.price.tip : obj.tip,
            },
            food: orders.food,
        };
    };

    return <>{builder.build(submitFunction)}</>;
};

export default UpdateOrderForm;