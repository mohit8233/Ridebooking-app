export const getToken = () => localStorage.getItem("rideflow_token");

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("rideflow_user")) || null;
  } catch {
    return null;
  }
};

export const getRole = () => getUser()?.role || null;

export const saveAuth = (token, user) => {
  localStorage.setItem("rideflow_token", token);
  localStorage.setItem("rideflow_user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("rideflow_token");
  localStorage.removeItem("rideflow_user");
};

export const roleHome = (role) => {
  if (role === "admin") return "/admin";
  if (role === "driver") return "/driver";
  return "/dashboard";
};
