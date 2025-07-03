export const ADD_NOTICE = 'ADD_NOTICE';
export const addNotice = (data = {
  message: ''
}) => ({
  type: ADD_NOTICE,
  data: {
    message: data.message,
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0
  }
});