const init = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  avatar_url: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  console.log("wew");
  if (action.type === "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      address: action.payload.address,
      avatar_url: action.payload.avatar_url,
    };
  } else if (action.type === "logout") {
    return init;
  }

  return state;
}

export default userReducer;
