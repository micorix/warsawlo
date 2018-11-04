export default (state = {}, action) => {
  switch (action.type){
    case 'UPDATE_NAV_HEIGHT':
        return Object.assign({}, state, {navHeight: action.navHeight})
    default:
          return state;
  }
};
