
import {ApiClient} from "../../services/apiClient";
import {IGetConversation} from "./res/getOrCreateConversation-model";

class Support extends ApiClient {

  controller = 'conversation';

  getList() {
    return this.post(`conversations`, {model: {}});
  }

  getConversation() {
    return this.post(`getOrCreateConversation`, {});
  }

  getMessages(data: {conversationId: number, size: number, skip: number}) {
    return this.get<IMessagesModel>(`getListWithSkip`, data);
  }

  send(data: {}) {
    return this.post(`sendTextMessage`, data);
  }

  sendFile(data: {conversationId: number, messageUniqueId: number, files:FormData}) {
    return this.post(`sendFileMessage?conversationId=${data.conversationId}&messageUniqueId=${data.messageUniqueId}`,  data.files);
  }
}

export default new Support()