const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Something went wrong';

export default getErrorMessage;
