export default (state = {school: null}, action) => {
  switch (action.type){
    case 'UPDATE':
      let toAdd = {

      }
        return {
          ...state,
          school: action.school
        }
    default:
          return state;
  }
};
