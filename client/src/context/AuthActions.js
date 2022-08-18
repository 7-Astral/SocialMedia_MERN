export const LoginStart = (userCredtintial) => ({ type: "LOGIN_START" })
export const LoginSuccess = (user) => ({ type: "LOGIN_SUCCESS", payload: user })
export const LoginFailure = (error) => ({ type: "LOGIN_FAILURE", payload: error })
export const Follow = (userId) => ({ type: "FOLLOW", payload: userId, });
export const Unfollow = (userId) => ({
  type: "UNFOLLOW", payload: userId,
});
export const IMAGE = (profilePicture) => ({ type: "IMAGE", payload: profilePicture});
export const UPDETAIL = (detail) => ({ type: "UPDETAIL", payload: detail});
export const LogOut = () => ({ type: "LOGOUT" });

