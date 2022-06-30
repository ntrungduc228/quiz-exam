export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    // return { 'x-access-token': user.accessToken };
    return user.accessToken;
  } else {
    return false;
  }
}

// function check token is expired
export function isAuthenticated() {}
