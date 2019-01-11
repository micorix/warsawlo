export default (state = {schoolID: null}, action) => {
  switch (action.type){
    case 'SELECT_SCHOOL':
        return {
          ...state,
          schoolID: action.schoolID
        }
    default:
          return state;
  }
};
