export default (state: any, action: any) => {
  switch (action.type) {
    case 'changeTheme':
      return {
        ...state,
        theme: action.newTheme,
      };

    default:
      return state;
  }
};
