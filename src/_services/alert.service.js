import { fetchWrapper } from "@/_helpers";
import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/alerts`;
export const alertService = {
  getAllByUser,
  getById,
  create,
  update,
  delete: _delete,
};

function getAllByUser() {
  return fetchWrapper.get(`${baseUrl}/by-user`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
