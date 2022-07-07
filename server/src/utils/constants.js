const STATE = {
  active: 1,
  needConfirm: 2,
  lock: 0,
};

const ROLES = {
  admin: 0,
  teacher: 1,
  student: 2,
};

const LEVEL = {
  easy: 0,
  medium: 1,
  hard: 2,
};

module.exports = { STATE, ROLES, LEVEL };
