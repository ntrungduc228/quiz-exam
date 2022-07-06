const transErrorsVi = {
  account_login_incorrect: "Tài khoản hoặc mật khẩu không chính xác",
  email_not_found: "Không tìm thấy email, vui lòng kiểm tra lại thông tin",
  account_in_use: "User này đã được sử dụng",
  email_is_exist: "Email này đã tồn tại",
  account_removed:
    "Tài khoản này đã bị dỡ khỏi hệ thống, nếu cho rằng đây là hiêu lầm, vui lòng liên hệ với bộ phần hỗ trợ của chúng tôi.",
  account_not_active:
    "Tài khoản này đẫ bị khóa, vui lòng liên hệ với bộ phần hỗ trợ của chúng tôi.",
  account_undefined: "Tài khoản này không tồn tại.",
  token_undefined: "Token không tồn tại!",
  signin_failed: "Sai tài khoản hoặc mật khẩu!",
  server_error: "Có lỗi phía server",
  invalid_value: "Dữ liệu không hợp lệ",
  createNew: (newInstance) => {
    return `Tạo mới ${newInstance} thất bại!`;
  },
  updateInstance: (instance) => {
    return `Cập nhật ${instance} thất bại!`;
  },
  deleteInstance: (instance) => {
    return `Xóa ${instance} thất bại!`;
  },
  instanceIsExits: (instance) => {
    return `${instance} đã tồn tại.`;
  },
  instanceIsNotExits: (instance) => {
    return `Không tìm thấy ${instance}.`;
  },
};

const transSuccessVi = {
  userCreated: (userEmail) => {
    return `Tài khoản ${userEmail} đã được tạo, kiểm tra email Active tài khoản trước khi đăng nhập, cảm ơn`;
  },
  account_actived:
    "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập ứng dụng.",
  loginSuccess: "Đăng nhập thành công!",
  send_reset_password_success:
    "Gửi mail reset mật khẩu thành công, vui lòng kiểm tra mail",
  user_password_updated: "Cập nhật mật khẩu thành công.",
  createNew: (newInstance) => {
    return `Tạo mới ${newInstance} thành công!`;
  },
  updateInstance: (instance) => {
    return `Cập nhật ${instance} thành công!`;
  },
  deleteInstance: (instance) => {
    return `Xóa ${instance} thành công!`;
  },
};

const transMailVi = {
  subject: "Quiz exam: Tài khoản mới đã được tạo",
  template: (username, password, link) => {
    return `
       <h2>Tài khoản liên kết email này đã được tạo trên Quiz exam</h2>
       <h3>Username của bạn là: <strong>${username}</strong></h3>
       <h3>Mật khẩu mới của bạn là: <strong>${password}</strong></h3>
       <h3>Đăng nhập tại <a href="${link}" target="blank">đây</a></h3>
       <h4>Nếu tin rằng đây là nhầm lẫn, hãy bỏ qua nó. Cảm ơn.</h4>
   `;
  },
  send_failed:
    "Có lỗi trong quá trình gửi email, vui lòng liên hệ với bộ phận hỗ  trợ của chúng tôi.",
};

module.exports = { transErrorsVi, transSuccessVi, transMailVi };
