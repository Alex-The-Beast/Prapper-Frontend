import axios from "../../config/axiosConfig.js";

export const getMe = async () => {
  try {
    const user = await axios.get("/profile");
    console.log(user, "From getMe function.");
    return user;
  } catch (err) {
    console.log(err, "From get me ");
    throw err;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post("/logout", {});
    return res.data;
  } catch (error) {
    console.log("Logout Failed", error);
  }
};
