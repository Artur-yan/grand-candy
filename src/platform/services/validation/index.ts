import messages from "../../../i18n/messages"
import LanguageStorage from "../../../platform/services/storages/languageStorage";

export const validatePhoneNumber = (value:string, setMessage:Function) => {
  let res = value.split(''),
    haveCountryCode = `${res[0]}${res[1]}${res[2]}${res[3]}` === '+374',
    withoutPlus = `${res[0]}${res[1]}${res[2]}` === '374',
    haveZero = `${res[0]}` === '0',
    result = value,
    letters = /^[0-9+]+$/

  if (!value.match(letters)) {
    setMessage(messages[LanguageStorage.getLanguage()]['error_phone_number'])
    return false
  }

  if (res.length === 12) {
    if (haveCountryCode) {
      setMessage(null)
      return result
    }
  }

  if (res.length === 8) {
    result = `+374${value}`
    setMessage(null)
    return result
  }

  if (res.length === 9) {
    if (haveZero) {
      result = `+374${value.replace('0', '')}`
      setMessage(null)
      return result
    }
  }

  if (res.length === 11) {
    if (withoutPlus) {
      result = `+${value}`
      setMessage(null)
      return result
    }
  }

  setMessage(messages[LanguageStorage.getLanguage()]['error_phone_number'])
  return false
}

export const validateEmail = (value:string, setMessage:Function) => {

  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!value.match(re) && value !== '') {
    setMessage('Incorrect Email!')
    return false
  } else {
    setMessage(null)
    return true
  }
}

export const validateNumber = (value, setMessage:(message) => void) => {
  if (isNaN(value)) {
    setMessage('Must input numbers')
    return false
  } else {
    setMessage(null)
    return true
  }
}
