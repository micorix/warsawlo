export default (state = {
  isModalOpen: false
}, action) => {
  switch (action.type){
    case 'TOGGLE_MODAL':
        return {
          ...state,
          isModalOpen: action.isOpen
        }
    default:
          return state;
  }
};
