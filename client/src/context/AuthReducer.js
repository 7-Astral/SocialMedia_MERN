const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
        case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings:[...state.user.followings,action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings:state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
      case "IMAGE":
        return {
          ...state,
          user: {
            ...state.user,
            profilePicture:action.payload,
          },
        };
        case "UPDETAIL":
        return {
          ...state,
          user: {
            ...state.user,
            city:action.payload.city,
            from:action.payload.from,
            relationship:action.payload.relationship,
          },
        };

      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error:false,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;