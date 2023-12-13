import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {};
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUser = async (req, res) => {
    const username = req.params.username;
    const currentUser = await dao.findUserByUsername(username);
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      const currentUser = user;
      console.log(currentUser);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
      return;
    } else {
      res.sendStatus(403);
    }
  };

  const account = async (req, res) => {
    const currentUser = req.session["currentUser"];
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { username } = req.params;
    const status = await dao.updateUser(username, req.body);
    const currentUser = await dao.findUserByUsername(username);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => {
    let user = await dao.findUserByUsername(req.body.username);
    const new_id = await dao.getHighestId();

    if (user) {
      res.status(400).json({ message: "Username already taken" });
    } else {
      const new_user = { ...req.body, id: new_id.id + 1 };
      console.log(new_user);
      const currentUser = await dao.createUser(new_user);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    }
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.username);
    res.json(status);
  };

  const signout = async (req, res) => {
    req.session.destroy();
    // currentUser = null;
    res.json(200);
  };
  const addLikedRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const currentUser = {
      ...req.body,
      likes: [...req.body["likes"], recipeId],
    }; // Adds this recipeId to likes
    req.session["currentUser"] = currentUser;
    const status = await dao.updateUser(currentUser.username, currentUser); // Updates the current user in mongoDB
    res.json(status);
  };
  const unLikedRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    let likeList = req.body["likes"];
    let newLikeList = [];
    // Removes the any recipeId that is the same as the given one to "unlike" it
    for (const repId in likeList) {
      if (repId != recipeId) {
        newLikeList.push(repId)
      }
    }
    const currentUser = {
      ...req.body,
      likes: newLikeList,
    }; // Adds this recipeId to likes
    req.session["currentUser"] = currentUser;
    const status = await dao.updateUser(currentUser.username, currentUser); // Updates the current user in mongoDB
    res.json(status);
  };

  app.get("/api/users/:username", findUser);
  app.post("/api/users/register", signup);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.put("/api/users/like/:recipeId", addLikedRecipe);
  app.put("/api/users/unlike/:recipeId", unLikedRecipe);

  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:username", deleteUser);
  app.post("/api/users/login", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
