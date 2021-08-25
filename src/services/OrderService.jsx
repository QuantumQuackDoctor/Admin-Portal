import axios from "axios";

export default class OrderService {

}

export function getOrder(id) {
    return axios.get("/order", {params: {id: id}});
}

export function updateOrder(order) {
    return axios.patch("/orders", order);
}

export function deleteOrder(id) {
    return axios.delete("/order", {params: {id: id}});
}