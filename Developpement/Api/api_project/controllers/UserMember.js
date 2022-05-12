const db = require("../models");

module.exports = {
  get_all_member_by_user_id: (req, res, next) => {
      if(res.locals.user){
          return res.locals.user
            .getMembers()
            .then((members) => res.json(members))
            .catch(next);
      }
  },
};
