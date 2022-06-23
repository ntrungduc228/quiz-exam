const authService = require("../services/auth.service");

let login = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "missing params required", success: false });
  }
  try {
    let response = await authService.login(username, password);

    if (response && response.success) {
      return res.status(200).json({ ...response });
    }
    return res.status(400).json(response);
  } catch (error) {
    console.log("err", error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports = { login };
