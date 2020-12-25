import React from 'react';
import { FormattedMessage } from 'react-intl';

const t = (id, value = {}) => <FormattedMessage id={id} values={{ ...value }} />;

export default t;