import React from 'react';
import { Meteor } from 'meteor/meteor';

import {
  useTracker
} from 'meteor/react-meteor-data';

import {
  useLocation,
  Navigate,
} from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const user = useTracker(() => Meteor.user());
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/singin" replace state={{ path: location.pathname }} />
  );
}