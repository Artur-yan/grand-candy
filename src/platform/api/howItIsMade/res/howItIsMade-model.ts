import {FileEnum} from "../../../enums/fileEnum";

export interface IHowItIsMadeModel {
  createdDate: number
  id: number
  multipartFiles: Array<{
    fileType: FileEnum,
    imageFileUrl: string,
    videoFileUrl: string
  }>
  title: string
  viewCount: number
}
