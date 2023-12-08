import * as dao from "./dao.js";
let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {};
  const deleteUser = async (req, res) => {};
  const findAllUsers = async (req, res) => {};

  const findUser = async (req, res) => {
    const username = req.params.username;
    currentUser = await dao.findUserByUsername(username);
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    currentUser = await dao.findUserByCredentials(username, password);
    res.json(currentUser);
    console.log(currentUser);
  };

  const account = async (req, res) => {
    res.json(currentUser);
  };
  const updateUser = async (req, res) => {
    const { username } = req.params;
    const status = await dao.updateUser(username, req.body);
    const currentUser = await dao.findUserByUsername(username);
    // req.session["currentUser"] = currentUser;
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
      currentUser = await dao.createUser(new_user);
      res.json(currentUser);
    }
  };
  const signout = (req, res) => {
    currentUser = null;
    res.json(200);
  };

  app.get("/api/users/:username", findUser);
  app.post("/api/users/register", signup);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);

  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/login", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;
