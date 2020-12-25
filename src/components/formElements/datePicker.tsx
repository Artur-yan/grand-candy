import React, {useState, useEffect} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import pink from "@material-ui/core/colors/pink";

export function DatePicker({onChange, minDate = new Date('01/01/1940'), maxDate = null, type = 'date', defaultValue = null, placeholder = ''}) {

  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [selectedTime, setSelectedTime] = useState(defaultValue);
  const styles = {background: '#f1f1f1', borderRadius: '40px', width:'100%', marginTop: 0, padding: '4px'}

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: pink,
    },
  });

  useEffect(() => {
    if (selectedDate) {
      if (typeof selectedDate !== 'number') {
        const newDate = new Date(selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()).getTime();
        onChange(newDate)
      } else {
        onChange(selectedDate)
      }
    }
  }, [selectedDate])

  useEffect(() => {

    if (selectedTime && typeof selectedTime !== 'number') {
      onChange(selectedTime.getTime())
    } else {
      onChange(selectedTime)
    }

  }, [selectedTime])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={defaultMaterialTheme}>
        {/*disablePast, disableFuture*/}
        {type === 'date' &&
          <KeyboardDatePicker
            // disableToolbar
            InputProps={{
              disableUnderline: true,
            }}
            minDate={minDate}
            maxDate={maxDate}
            style={styles}
            keyboardIcon={<i className='icon-ic_arrowdown G-arrow-down-sm'></i>}
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            onError={(err, val) => {}}
            placeholder={placeholder ? placeholder : "Select date"}
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        }

        {type === 'time' &&
          <KeyboardTimePicker
            disableToolbar
            margin="normal"
            ampm={false}
            InputProps={{
              disableUnderline: true,
            }}
            style={styles}
            keyboardIcon={<i className='icon-ic_arrowdown G-arrow-down-sm'></i>}
            id="time-picker-inline"
            value={selectedTime}
            placeholder={placeholder ? placeholder : "Select time"}
            onChange={date => setSelectedTime(date)}
          />
          // <TextField
          //   id="time"
          //   color='primary'
          //   fullWidth={true}
          //   type="time"
          //   InputLabelProps={{
          //     shrink: true,
          //   }}
          //   variant={'filled'}
          //   inputProps={{
          //     step: 300, // 5 min
          //   }}
          // />
        }
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}
