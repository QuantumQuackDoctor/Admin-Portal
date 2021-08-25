import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOrder, deleteOrder, updateOrder} from "../../../services/OrderService";
import {Widget} from "../../../shared/widget/Widget";
import {Button, Form, Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import cloneDeep from 'lodash/cloneDeep';

const DeleteOrderForm = () => {

    let {id} = useParams();
    console.log(id);
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

    const [modalState, setModalState] = useState("close");
    const [editField, setEditField] = useState("");
    const [updateField, setUpdateField] = useState("");
    const [updateTimeField, setUpdateTimeField] = useState("");
    const [updateDateField, setUpdateDateField] = useState("");


    const handleClose = () => setModalState("close");
    const handleDeleteModal = () => setModalState("delete");
    const handleUpdateModal = () => setModalState("update");
    const handleEditModal = (field) => {
        setEditField(field)
        setModalState("edit");
    }
    const handleEditTimeModal = (field) => {
        setEditField(field)
        setModalState("editTime");
    }

    const handleClear = () => {
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
        fetchData().then(res => {
            localStorage.setItem(id, JSON.stringify(res.data));
            console.log(JSON.parse(localStorage.getItem(id)));
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await getOrder(id);
                console.log(request);
                setOrders(request.data)
                return request;
            }
            catch (err) {
                history.push("/orders");
            }
        }
        if (localStorage.getItem(id) === null) {
            fetchData().then(res => {
                localStorage.setItem(id, JSON.stringify(res.data));
                console.log(JSON.parse(localStorage.getItem(id)));
            });
        }
        else {
            console.log(JSON.parse(localStorage.getItem(id)));
            setOrders(JSON.parse(localStorage.getItem(id)));
        }
    }, [id]);

    const deleteThisOrder = (id) => {
        setModalState("close");
        let copy = cloneDeep(orders);
        copy.refunded = "true";

        setOrders(copy);
        localStorage.setItem(id, JSON.stringify(copy));

        updateOrder(JSON.parse(localStorage.getItem(id))).then();
        history.push("/orders");
    };

    const updateThisOrder = () => {
        setModalState("close");
        updateOrder(JSON.parse(localStorage.getItem(id))).then();
    };

    const convertToIso = (time, date) => {
        console.log(date.toString() + "T" + time.toString() + ":00.000Z");
        return date.toString() + "T" + time.toString() + ":00.000Z";
    }

    const updateOrderField = (field) => {
        let copy = cloneDeep(orders);
        setModalState("close");
        switch (field) {
            case "Order Type":
                copy.orderType = updateField;
                break;
            case "Driver Id":
                copy.driverId = updateField;
                break;
            case "Restaurant Id":
                copy.restaurantId = updateField;
                break;
            case "Driver Notes":
                copy.driverNote = updateField;
                break;
            case "Address":
                copy.address = updateField;
                break;
            case "Order Placed Time":
                copy.orderTime.orderPlaced = convertToIso(updateTimeField, updateDateField);
                break;
            case "Restaurant Accept Time":
                copy.orderTime.restaurantAccept = convertToIso(updateTimeField, updateDateField);
                break;
            case "Restaurant Start Time":
                copy.orderTime.restaurantStart = convertToIso(updateTimeField, updateDateField);
                break;
            case "Restaurant Complete Time":
                copy.orderTime.restaurantComplete = convertToIso(updateTimeField, updateDateField);
                break;
            case "Driver Accept Time":
                copy.orderTime.driverAccept = convertToIso(updateTimeField, updateDateField);
                break;
            case "Delivered Time":
                copy.orderTime.delivered = convertToIso(updateTimeField, updateDateField);
                break;
            case "Delivery Slot":
                copy.orderTime.deliverySlot = convertToIso(updateTimeField, updateDateField);
                break;
            case "Refunded Status":
                copy.refunded = updateField;
                break;
            case "Food Price":
                copy.price.food = updateField;
                break;
            case "Delivery Price":
                copy.price.delivery = updateField;
                break;
            case "Tip Price":
                copy.price.tip = updateField;
                break;
        }
        setOrders(copy);
        localStorage.setItem(id, JSON.stringify(copy));
        setUpdateField("");
    };

    const formatTime = (time) => {
        if (time == null) {
            return null;
        }
        let parts = time.slice(0, -1).split('T');
        let dateComponent = parts[0];
        let timeComponent = parts[1];
        return timeComponent.toString().substring(0, 5) + " " + dateComponent.toString();
    }


    console.log(orders);

    let title = "Id: " + orders.id;

    return <Widget title={title}>
        <dl>
            <dt>Order Type: {orders.orderType || "null"}
                <button className="editButton" onClick={() => handleEditModal("Order Type")}>Edit</button></dt>
            <dt>Driver Id: {orders.driverId || "null"}
                <button className="editButton" onClick={() => handleEditModal("Driver Id")}>Edit</button></dt>
            <dt>Restaurant Id: {orders.restaurantId || "null"}
                <button className="editButton" onClick={() => handleEditModal("Restaurant Id")}>Edit</button></dt>
            <dt>Driver Notes: {orders.driverNote || "null"}
                <button className="editButton" onClick={() => handleEditModal("Driver Notes")}>Edit</button></dt>
            <dt>Address: {orders.address || "null"}
                <button className="editButton" onClick={() => handleEditModal("Address")}>Edit</button></dt>
            <dt>Order Placed Time: {orders.orderTime.orderPlaced || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Order Placed Time")}>Edit</button></dt>
            <dt>Restaurant Accept Time: {formatTime(orders.orderTime.restaurantAccept) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Restaurant Accept Time")}>Edit</button></dt>
            <dt>Restaurant Start Time: {formatTime(orders.orderTime.restaurantStart) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Restaurant Start Time")}>Edit</button></dt>
            <dt>Restaurant Complete Time: {formatTime(orders.orderTime.restaurantComplete) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Restaurant Complete Time")}>Edit</button></dt>
            <dt>Driver Accept Time: {formatTime(orders.orderTime.driverAccept) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Driver Accept Time")}>Edit</button></dt>
            <dt>Delivered Time: {formatTime(orders.orderTime.delivered) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Delivered Time")}>Edit</button></dt>
            <dt>Delivery Slot: {formatTime(orders.orderTime.deliverySlot) || "null"}
                <button className="editButton" onClick={() => handleEditTimeModal("Delivery Slot")}>Edit</button></dt>
            <dt>Refunded: {orders.refunded || "false"}
                <button className="editButton" onClick={() => handleEditModal("Refunded Status")}>Edit</button></dt>
            <dt>Food Price: {orders.price.food || "null"}
                <button className="editButton" onClick={() => handleEditModal("Food Price")}>Edit</button></dt>
            <dt>Delivery Price: {orders.price.delivery || "null"}
                <button className="editButton" onClick={() => handleEditModal("Delivery Price")}>Edit</button></dt>
            <dt>Tip Price: {orders.price.tip || "null"}
                <button className="editButton" onClick={() => handleEditModal("Tip Price")}>Edit</button></dt>
            <button onClick={handleDeleteModal}>Delete</button>
            <button onClick={handleClear}>Clear</button>
            <button className="updateButton" onClick={handleUpdateModal}>Update</button>

        </dl>
        <Modal animation={false} show={modalState === "delete"} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you would like to delete this order? Please provide a reason for this action

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter reason" />
                    </Form.Group>
                    <Button variant="primary" onClick={() => deleteThisOrder(id)}>
                        Submit
                    </Button>
                </Form></Modal.Body>
        </Modal>
        <Modal animation={false} show={modalState === "update"} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you would like to update this order? Pressing submit will update the current edits

                <Form>
                    <Button variant="primary" onClick={() => updateThisOrder()}>
                        Submit
                    </Button>
                </Form></Modal.Body>
        </Modal>
        <Modal animation={false} show={modalState === "edit"} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {editField}</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will not update the order until the update button is pressed

                <Form>
                    <Form.Control type="text" placeholder="Enter new value" value={updateField} onChange={e => setUpdateField(e.target.value)} />
                    <Button variant="primary" onClick={() => updateOrderField(editField)}>
                        Submit
                    </Button>
                </Form></Modal.Body>
        </Modal>
        <Modal animation={false} show={modalState === "editTime"} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {editField}</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will not update the order until the update button is pressed

                <Form>
                    <div>Enter Time in format "HH:MM"</div>
                    <Form.Control type="text" placeholder="Enter new Time" value={updateTimeField} onChange={e => setUpdateTimeField(e.target.value)} />
                    <div>Enter Date in format "YYYY-MM-DD"</div>
                    <Form.Control type="text" placeholder="Enter new Date" value={updateDateField} onChange={e => setUpdateDateField(e.target.value)} />
                    <Button variant="primary" onClick={() => updateOrderField(editField)}>
                        Submit
                    </Button>
                </Form></Modal.Body>
        </Modal>
    </Widget>;
};

export default DeleteOrderForm;