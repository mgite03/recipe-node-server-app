import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => { };
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
    // const likes = req.body["likes"];
    const givenUser = req.body;
    const likeList = givenUser.likes;
    const currentUser = {
      ...req.body,

      likes: likeList.includes(parseInt(recipeId)) ? req.body["likes"] : [...req.body["likes"], recipeId]
    }; // Adds this recipeId to likes
    req.session["currentUser"] = currentUser;
    const status = await dao.updateUser(currentUser.username, currentUser); // Updates the current user in mongoDB
    res.json(status);
  };
  const unLikedRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const givenUser = req.body;
    const likeList = givenUser.likes;
    const newLikeList = likeList.filter((id) => id !== parseInt(recipeId, 10));

    console.log("Recipe id: " + recipeId);
    console.log("Original liked list array: " + likeList)
    console.log("New Liked list array removing: " + recipeId + " List: " + newLikeList)
    const currentUser = {
      ...req.body,
      likes: newLikeList,
    }; // Adds this recipeId to likes
    req.session["currentUser"] = currentUser;
    console.log(currentUser)
    const status = await dao.updateUser(currentUser.username, currentUser); // Updates the current user in mongoDB
    res.json(status);
  };

  const followUser = async (req, res) => {
    const username = req.params.username;
    const currentUser = {
      ...req.body,
      follows: [...req.body["follows"], username],
    }; // Adds this new user to this follows list

    // Gets the the following user
    let followingUser = await dao.findUserByUsername(username)
    console.log("Following:"+ followingUser)
    console.log("Current UserName: " + currentUser.username)
    followingUser["followers"] = [...followingUser["followers"], currentUser.username]
    console.log("Following Change: " + followingUser)
    req.session["currentUser"] = currentUser;
    const status = await dao.updateUser(currentUser.username, currentUser); // Updates the current user in mongoDB
    const status2 = await dao.updateUser(followingUser.username, followingUser); // Updates the following user in mongoDB
    console.log(status2)
    res.json(status);
  };
  const unfollowUser = async (req, res) => {
    const username = req.params.username;
    let followList = req.body["follows"];
    let newFollowList = [];
    // Removes the any users that are the same as the given one to "unfollow" it
    for (const user in followList) {
      if (user != username) {
        newFollowList.push(user)
      }
    }
    const currentUser = {
      ...req.body,
      follows: newFollowList,
    }; // Adds this new follow list to this user
    req.session["currentUser"] = currentUser;

    const currUsername = currentUser.username
    const followingUser = await dao.findUserByUsername(username)
    let followerList = followingUser.followers;
    // Removes the any users that are the same as the given one to "unfollow" it
    console.log("Remove " + currUsername + " from followers:" + followerList)
    const newFollowerList = followerList.filter((user) => user !== currUsername);
    console.log("Shoud not have " + currUsername + " in this new list: "+ newFollowerList)
    followingUser.followers = newFollowerList;
    console.log("newfolloweruser: " + followingUser)
    const status = await dao.updateUser(currUsername, currentUser); // Updates the current user in mongoDB
    const status2 = await dao.updateUser(username, followingUser); // Updates the following user in mongoDB
    res.json(status);
  };

  app.get("/api/users/:username", findUser);
  app.post("/api/users/register", signup);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.put("/api/users/like/:recipeId", addLikedRecipe);
  app.put("/api/users/unlike/:recipeId", unLikedRecipe);
  app.put("/api/users/follow/:username", followUser);
  app.put("/api/users/unfollow/:username", unfollowUser);

  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:username", deleteUser);
  app.post("/api/users/login", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
