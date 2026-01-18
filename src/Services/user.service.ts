import User from "../Models/user.model";

export const allUser = async () => {
  const users = await User.find(
    {},
    {
      userName: 1,
      name: 1,
      email: 1,
      profilePhoto: 1,
      isOnline: 1,
    },
  );

  if (!users) {
    throw new Error("User not get");
  }
  return users;
};
