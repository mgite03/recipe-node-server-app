import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (username, user) =>
  model.updateOne({ username: username }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const getHighestId = async () => model.findOne().sort({ id: -1 }).exec();
