const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Member.findAll({
			order: ['lastname']
		})
			.then(member => res.json(member))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Member.findByPk(req.params.member_id)
			.then(member => {
				if (!member) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				req.member = member;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Member.findByPk(req.params.member_id)
			.then(member => {
				if (!member) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return res.json(member);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		if (req.params.UserLogin == ! "") {
			db.User.findAll({
				attributes: [
					'username'
				],
				where: {
					username: req.params.UserLogin
				}
			})
				.then(resp => {
					if (resp == "") {
						return res.status(404).send('Username does not exist');
					}
					else {
						return db.Member.create({
							name: req.params.name,
							UserId: resp[0].id,
							TravelId: req.params.TravelId,
							userLogin: req.params.userLogin
						})
							.then(member => res.json(member))
							.catch(next);
					}
				})
		}
		else {
			return db.Member.create(req.body)
				.then(member => res.json(member))
				.catch(next);
		}
	},

	update_by_id: (req, res, next) => {
		return db.Member.findByPk(req.params.member_id)
			.then(member => {
				if (!member) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				Object.assign(member, req.body);
				return member.save();
			})
			.then(member => res.json(member))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Member.findByPk(req.params.member_id)
			.then(member => {
				if (!member) {
					throw { status: 404, message: 'Requested Group not found' };
				}
				return member.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
