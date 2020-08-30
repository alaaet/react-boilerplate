import { fetchWrapper } from "@/_helpers";
import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/tags`;
export const tagService = {
  activate,
  getAll,
  getAllByUser,
  getById,
  getMaterialTypes,
  getDimensionTypes,
  create,
  update,
  delete: _delete,
};

function activate(tagCode, actCode) {
  return fetchWrapper.post(`${baseUrl}/activate`, { tagCode, actCode });
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}
function getAllByUser() {
  return fetchWrapper.get(`${baseUrl}/by-user`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getMaterialTypes() {
  return fetchWrapper.get(`${baseUrl}/material-types`);
}

function getDimensionTypes() {
  return fetchWrapper.get(`${baseUrl}/dimension-types`);
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
