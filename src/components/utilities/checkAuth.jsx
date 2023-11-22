import Cookies from 'js-cookie';

// Function to check if the user is logged in based on the token in cookies
export const checkUserLoginStatus = () => {
  // Check if the token exists in cookies
  const token = Cookies.get('authToken'); // Replace with your actual cookie name

  if (token) {
    // User is logged in
    return true;
  } else {
    // User is not logged in
    return false;
  }
};
