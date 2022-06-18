const express = require("express");
let router = express.Router();

const initRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.json({ message: "Home page" });
  });

  return app.use("/api", router);
};

module.exports = initRoutes;
