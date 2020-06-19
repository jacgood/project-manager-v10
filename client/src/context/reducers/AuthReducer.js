export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(employee => employee.id !== action.payload),
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'EDIT_USER':
      const updatedUser = action.payload;
      const updatedUsers = state.users.map(user => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };
    default:
      return state;
  }
};
