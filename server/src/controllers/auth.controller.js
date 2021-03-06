const authService = require("../services/auth.service");
const { transErrorsVi } = require("../../lang/vi");

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

let updateAccount = async (req, res) => {
  let { username, newData } = req.body;
  if (!username || !newData?.email || !newData?.state) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.updateAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let updateState = async (req, res) => {
  let { username, newData } = req.body;
  if (!username || (!newData?.state && newData?.state != 0)) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.updateState(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let verifyResetAccount = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.verifyResetAccount(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let forgetPassword = async (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.forgetPassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let updateProfileInfo = async (req, res) => {
  let { username, newData } = req.body;
  if (!username || !newData) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.updateProfileInfo(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

let changePassword = async (req, res) => {
  let { username, password, newData } = req.body;
  if (!username || !password || !newData?.password) {
    return res.status(400).json({
      message: "Vui lòng cung cấp đầy đủ dữ liệu !!!",
      success: false,
    });
  }
  try {
    let data = await authService.changePassword(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: transErrorsVi.server_error,
      error: error,
    });
  }
};

module.exports = {
  login,
  updateAccount,
  updateState,
  verifyResetAccount,
  forgetPassword,
  updateProfileInfo,
  changePassword,
};
