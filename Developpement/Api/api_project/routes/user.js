const user_ctrl = require("../controllers/user");

function client_is_user_id(req, res, next) {
  if (req.user.id == req.params.user_id) {
    return next();
  } else {
    throw { status: 403, message: "Action is not authorized" };
  }
}

module.exports = [
  {
    url: "/users",
    method: "get",
    func: user_ctrl.get_all,
  },
  {
    url: "/user/signup",
    method: "post",
    func: user_ctrl.signup,
  },
  {
    url: "/user/signin",
    method: "post",
    func: user_ctrl.signin,
  },
  {
    url: "/user/whoami",
    method: "get",
    func: [user_ctrl.identify_client, user_ctrl.whoami],
  },
  {
    url: "/user/:user_id",
    method: "get",
    func: user_ctrl.get_by_id,
  },
  {
    url: "/user/:user_id",
    method: "put",
    func: [
      user_ctrl.identify_client,
      client_is_user_id,
      user_ctrl.update_by_id,
    ],
  },
  {
    url: "/user/:user_id",
    method: "delete",
    func: [
      user_ctrl.identify_client,
      client_is_user_id,
      user_ctrl.delete_by_id,
    ],
  },
];
