import { fetchWrapper } from "@/_helpers";
import { accountService } from "./account.service";
const baseUrl = `${accountService.serverUrl}/mail`;
export const emailService = {
  send,  
};

function send(data) {
  return fetchWrapper.post(baseUrl, data);
}
