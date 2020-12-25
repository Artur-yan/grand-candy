import React from 'react';
import {IContextBase} from "../platform/interfaces/context-base";

const StateContext = React.createContext<IContextBase>(null);

export default StateContext;