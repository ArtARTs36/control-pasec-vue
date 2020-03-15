/* eslint max-len: ["error", 120] */
// check if current path is /auth/*
export const isAuthPage = ({ route }) =>
  route || (route && route.path.includes('/auth'));

// check if navigation should be displayed
// if route.path does not exist yet returns false
export const shouldShowNavigation = ({ route }, getters) =>
  route && route.path ? !getters.isAuthPage : false;
