let errorJwt = (data) => {
  if (data?.errToken) {
    return true;
  }
  return false;
};

export default errorJwt;
