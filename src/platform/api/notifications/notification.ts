import {ApiClient} from "../../services/apiClient";
import {IPagingResponse} from "../../interfaces/paging-response";
import {INotificationModel} from "./res/notification-model";


class Notification extends ApiClient {

  controller = 'notification';

  notifications = (page: number, size: number) => {
    return this.get<IPagingResponse<INotificationModel>>(`getParticipantNotifications/${page}/${size}`, {})
  }

  notSeen = () => {
    return this.get(`getUnseenNotificationsCount`, {})
  }
}

export default new Notification()