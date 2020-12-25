import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import { locales } from './locales';
import messages from './messages';

const Provider = ({ children, locale = locales.EN }) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

Provider.displayName = 'I18nProvider';

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  locale: PropTypes.oneOf(Object.values(locales)),
};

Provider.defaultProps = {
  locale: locales.EN,
};

export default Provider;