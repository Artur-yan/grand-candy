import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

export const AddressValidation =
  [
    {
      name: 'addressName',
      message: messages[LanguageStorage.getLanguage()]['error_address_text']
    },
    {
      name: 'title',
      message: messages[LanguageStorage.getLanguage()]['error_title']
    }
  ]

