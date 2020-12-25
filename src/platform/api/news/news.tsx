import { ApiClient } from "../../services/apiClient";
import { INewsModel } from "./res/news-model";
import { IPagingResponse } from "../../interfaces/paging-response";

class News extends ApiClient {

  controller = 'news';

  news = (page: number, size: number) => {
    return this.get<IPagingResponse<INewsModel>>(`getAllActiveNewsForMobile/${page}/${size}`)
  }

  newsPage = (id: number) => {
    return this.get<INewsModel>(`getNewsById`, {newsId:id})
  }
}

export default new News();
