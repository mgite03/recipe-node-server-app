import data from "../accounts.json" assert { type: "json" };
const Accounts = (app) => {
  app.post("/api/accounts", (req, res) => {
    const maxId = data.reduce((max, course) => {
      return course.id > max ? course.id : max;
    }, 0);
    const account = {
      ...req.body,
      id: maxId + 1,
    };
    data.push(account);
    res.send(account);
  });
  app.get("/api/accounts", (req, res) => {
    res.send(data);
  });

  app.post("/api/accounts/login", (req, res) => {
    const { username, password } = req.body;

    const acct = data.find(
      (a) => a.username == username && a.password == password
    );
    if (!acct) {
      res.status(404).send("Username/Pw combo doesn't match");
    } else {
      res.send(acct);
    }
  });
};

export default Accounts;
