export default (state = {}, action) => {
  switch (action.type){
    case 'SELECT_SCHOOL':
        return {
          ...state,
          school: action.school
        }
    default:
          return state;
  }
};
