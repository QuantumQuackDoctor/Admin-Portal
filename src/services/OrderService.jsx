import axios from "axios";
import environment from "../environment";

export default class OrderService {}

export function getOrder(id) {
  return axios.get(environment.basePath + "/order", { params: { id: id } });
}

export function updateOrder(order) {
  return axios.patch(environment.basePath + "/orders", order);
}

export function deleteOrder(id) {
  return axios.delete(environment.basePath + "/order", { params: { id: id } });
}
