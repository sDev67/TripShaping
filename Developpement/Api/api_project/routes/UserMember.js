const user_ctrl = require("../controllers/user");
const usermember_ctrl = require("../controllers/UserMember");

module.exports = [

    {
		url: '/user/:user_id/members',
		method: 'get',
		func: [user_ctrl.load_by_id ,usermember_ctrl.get_all_member_by_user_id]
	},
]