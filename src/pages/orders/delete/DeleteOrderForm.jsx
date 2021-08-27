import { useHistory } from "react-router-dom";
import { useState } from "react";
import { getOrder, updateOrder } from "../../../services/OrderService";
import { Widget } from "../../../shared/widget/Widget";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import cloneDeep from "lodash/cloneDeep";
import { useSingletonCall } from "../../../util/SingletonHook";

const DeleteOrderForm = ({ id, close }) => {
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

  const hanuleClose = () => setModalState("close");
  const hanuleDeleteModal = () => setModalState("delete");
  const hanuleUpdateModal = () => setModalState("update");
  const hanuleEditModal = (field) => {
    setEditField(field);
    setModalState("edit");
  };
  const hanuleEditTimeModal = (field) => {
    setEditField(field);
    setModalState("editTime");
  };

  const hanuleClear = () => {
    async function fetchData() {
      try {
        const request = await getOrder(id);
        console.log(request);
        setOrders(request.data);
        return request;
      } catch (err) {}
    }
    fetchData().then((res) => {
      localStorage.setItem(id, JSON.stringify(res.data));
      console.log(JSON.parse(localStorage.getItem(id)));
    });
  };

  useSingletonCall(() => {
    async function fetchData() {
      try {
        const request = await getOrder(id);
        console.log(request);
        setOrders(request.data);
        return request;
      } catch (err) {
        close(id);
      }
    }
    if (localStorage.getItem(id) === null) {
      fetchData().then((res) => {
        localStorage.setItem(id, JSON.stringify(res.data));
        console.log(JSON.parse(localStorage.getItem(id)));
      });
    } else {
      console.log(JSON.parse(localStorage.getItem(id)));
      setOrders(JSON.parse(localStorage.getItem(id)));
    }
  });

  const deleteThisOrder = (id) => {
    setModalState("close");
    let copy = cloneDeep(orders);
    copy.refunded = "true";

    setOrders(copy);
    localStorage.setItem(id, JSON.stringify(copy));

    updateOrder(JSON.parse(localStorage.getItem(id))).then();
    close();
  };

  const updateThisOrder = () => {
    setModalState("close");
    updateOrder(JSON.parse(localStorage.getItem(id))).then();
  };

  const convertToIso = (time, date) => {
    console.log(date.toString() + "T" + time.toString() + ":00.000Z");
    return date.toString() + "T" + time.toString() + ":00.000Z";
  };

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
        copy.orderTime.orderPlaced = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Restaurant Accept Time":
        copy.orderTime.restaurantAccept = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Restaurant Start Time":
        copy.orderTime.restaurantStart = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Restaurant Complete Time":
        copy.orderTime.restaurantComplete = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Driver Accept Time":
        copy.orderTime.driverAccept = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Delivered Time":
        copy.orderTime.delivered = convertToIso(
          updateTimeField,
          updateDateField
        );
        break;
      case "Delivery Slot":
        copy.orderTime.deliverySlot = convertToIso(
          updateTimeField,
          updateDateField
        );
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
      default:
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
    let parts = time.slice(0, -1).split("T");
    let dateComponent = parts[0];
    let timeComponent = parts[1];
    return (
      timeComponent.toString().substring(0, 5) + " " + dateComponent.toString()
    );
  };

  return (
    <Widget title={`Id: ${orders.id}`}>
      <ul className="Orders-list">
        <li>
          Order Type: {orders.orderType || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Order Type")}
          >
            Edit
          </button>
        </li>
        <li>
          Driver Id: {orders.driverId || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Driver Id")}
          >
            Edit
          </button>
        </li>
        <li>
          Restaurant Id: {orders.restaurantId || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Restaurant Id")}
          >
            Edit
          </button>
        </li>
        <li>
          Driver Notes: {orders.driverNote || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Driver Notes")}
          >
            Edit
          </button>
        </li>
        <li>
          Address: {orders.address || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Address")}
          >
            Edit
          </button>
        </li>
        <li>
          Order Placed Time: {orders.orderTime.orderPlaced || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Order Placed Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Restaurant Accept Time:{" "}
          {formatTime(orders.orderTime.restaurantAccept) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Restaurant Accept Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Restaurant Start Time:{" "}
          {formatTime(orders.orderTime.restaurantStart) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Restaurant Start Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Restaurant Complete Time:{" "}
          {formatTime(orders.orderTime.restaurantComplete) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Restaurant Complete Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Driver Accept Time:{" "}
          {formatTime(orders.orderTime.driverAccept) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Driver Accept Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Delivered Time: {formatTime(orders.orderTime.delivered) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Delivered Time")}
          >
            Edit
          </button>
        </li>
        <li>
          Delivery Slot: {formatTime(orders.orderTime.deliverySlot) || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditTimeModal("Delivery Slot")}
          >
            Edit
          </button>
        </li>
        <li>
          Refunded: {orders.refunded || "false"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Refunded Status")}
          >
            Edit
          </button>
        </li>
        <li>
          Food Price: {orders.price.food || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Food Price")}
          >
            Edit
          </button>
        </li>
        <li>
          <span>Delivery Price: {orders.price.delivery || "null"}</span>
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Delivery Price")}
          >
            Edit
          </button>
        </li>
        <li>
          Tip Price: {orders.price.tip || "null"}
          <button
            className="Orders-button Orders-editbutton"
            onClick={() => hanuleEditModal("Tip Price")}
          >
            Edit
          </button>
        </li>
      </ul>
      <div className="Orders-action-buttons">
        <button onClick={hanuleDeleteModal} className="Orders-button">
          Delete
        </button>
        <button
          className="Orders-button Orders-updateButton"
          onClick={hanuleUpdateModal}
        >
          Update
        </button>
        <button onClick={hanuleClear} className="Orders-button">
          Clear
        </button>
        <button onClick={close} className="Orders-button">
          Close
        </button>
        <button
          onClick={() => {
            history.push(`drivers/${orders.driverId}`);
          }}
          className="Orders-button"
        >
          Open Driver
        </button>
      </div>
      <Modal
        animation={false}
        show={modalState === "delete"}
        onHide={hanuleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to delete this order? Please provide a
          reason for this action
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter reason" />
            </Form.Group>
            <Button variant="primary" onClick={() => deleteThisOrder(id)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        animation={false}
        show={modalState === "update"}
        onHide={hanuleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to update this order? Pressing submit will
          update the current edits
          <Form>
            <Button variant="primary" onClick={() => updateThisOrder()}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        animation={false}
        show={modalState === "edit"}
        onHide={hanuleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will not update the order until the update button is pressed
          <Form>
            <Form.Control
              type="text"
              placeholder="Enter new value"
              value={updateField}
              onChange={(e) => setUpdateField(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={() => updateOrderField(editField)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        animation={false}
        show={modalState === "editTime"}
        onHide={hanuleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will not update the order until the update button is pressed
          <Form>
            <div>Enter Time in format "HH:MM"</div>
            <Form.Control
              type="text"
              placeholder="Enter new Time"
              value={updateTimeField}
              onChange={(e) => setUpdateTimeField(e.target.value)}
            />
            <div>Enter Date in format "YYYY-MM-DD"</div>
            <Form.Control
              type="text"
              placeholder="Enter new Date"
              value={updateDateField}
              onChange={(e) => setUpdateDateField(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={() => updateOrderField(editField)}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Widget>
  );
};

export default DeleteOrderForm;
