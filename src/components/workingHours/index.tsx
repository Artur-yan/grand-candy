import React, {useEffect, useState} from "react";
import {MomentTime} from "../../platform/services/helpers";
import {WorkDayEnum} from "../../platform/enums/workDay";
import {WorkDays} from "../../platform/statics/workDays";

interface IProps {
  className?: string,
  days: Array<{
    startTime: number,
    endTime: number,
    workDayEnumValue: WorkDayEnum,
  }>
}

export const WorkingHours = (props: IProps) => {

  const [days, setDays] = useState(null)

  useEffect(() => {
    let newDays = []
    props.days.map((day, key) => {

      let lastElementKey = newDays.length - 1;

      if (newDays.length === 0) {
        newDays.push(day)
      } else {
        if (
          day.startTime !== props.days[key - 1].startTime || day.endTime !== props.days[key - 1].endTime
        ) {
          newDays[lastElementKey].endDayEnumValue = day.workDayEnumValue - 1;
          newDays.push(day)
        } else if (key === (props.days.length - 1)) {
          if (day.startTime === props.days[key - 1].startTime || day.endTime === props.days[key - 1].endTime) {
            newDays[lastElementKey].endDayEnumValue = day.workDayEnumValue;
          }
        }
      }
    })
    setDays(newDays)
  }, [])

  return (
    <div>
      {days && days.map((days, index) => {
       return <div key={index} className={props.className}>
          <span className='G-mr-1'>{WorkDays[days.workDayEnumValue]}  {days.endDayEnumValue !== days.workDayEnumValue && WorkDays[days.endDayEnumValue] && ` - ${WorkDays[days.endDayEnumValue]}`}</span>
          <div className='G-mr-1'>
            <MomentTime milliSec={days.startTime}/>-<MomentTime milliSec={days.endTime}/>
          </div>
        </div>
      })}
    </div>
  )
}
