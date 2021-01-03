import { fetchWrapper } from "@/_helpers";
import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/comments`;
export const commentService = {
  send,
  getByTagCode,
};

function send(data) {
  return fetchWrapper.post(`${baseUrl}`, data);
}

function getByTagCode(tagCode) {
  return fetchWrapper.get(`${baseUrl}/by-tag-code/${tagCode}`);
}
