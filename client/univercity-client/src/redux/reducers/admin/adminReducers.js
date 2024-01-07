import React from 'react';
import { adminConstants } from '../../constants/admin/adminConstants';

export default (state = [], action) => {
  switch (action.type) {
    case adminConstants.SET_ADMIN:
      return {
        ...state,
        admin: action.payload
      };
    case adminConstants.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state
  }
}