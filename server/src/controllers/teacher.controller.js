let adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

let teacherBoard = (req, res) => {
  res.status(200).send("Teacher Content.");
};

module.exports = { adminBoard, teacherBoard };
