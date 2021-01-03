import { fetchWrapper } from "@/_helpers";
import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/messaging`;
export const inboxService = {
  getAllByUser,
  create,
  delete: _delete,
};

function getAllByUser() {
  return fetchWrapper.get(`${baseUrl}/by-user`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
