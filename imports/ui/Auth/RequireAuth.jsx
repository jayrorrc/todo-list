import React from 'react';

import {
  useLocation,
  Navigate,
} from "react-router-dom";

import { useAuth } from "/imports/hooks/use-auth"

export const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { authed } = useAuth()

  return (authed || sessionStorage.getItem('authed') === 'true')
    ? (children)
    : (<Navigate to="/singin" replace state={{ path: location.pathname }} />)
}