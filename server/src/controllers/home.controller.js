const homeService = require("../services/home.service");
const { transErrorsVi } = require("../../lang/vi");

let getDashBoardAdmin = async (req, res) => {
  try {
    let data = await homeService.getDashBoardAdmin();
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

let getDashBoardTeacher = async (req, res) => {
  try {
    let data = await homeService.getDashBoardTeacher();
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
  getDashBoardAdmin,
  getDashBoardTeacher,
};
