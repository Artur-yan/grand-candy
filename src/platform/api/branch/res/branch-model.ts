import {WorkDayEnum} from "../../../enums/workDay";

export interface IBranchModel {
  address: string
  enableDelivery: boolean
  enablePickUp: boolean
  favorite: boolean
  id: number
  imageUrl: string
  latitude: number
  longitude: number
  phoneNumber: string
  title: string
  workingDateHours:Array<{
    endTime: number,
    startTime: number,
    workDayEnumValue: WorkDayEnum,
  }>
}
