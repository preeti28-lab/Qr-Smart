// import { useAuth0 } from "@auth0/auth0-react";

// const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

const handleLogout = () => {
  // Clear local storage
  localStorage.clear();
  window.location.replace('/');
  // logout();
}

export default handleLogout;