const db = require('../models');

module.exports = {

	get_all_member_by_travel_id: (req, res, next) => {

        return req.travel.getMembers({
            order: ['firstname'],
            where
        })
            .then(members => res.json(members))
            .catch(next);
    },

    get_member_id_by_travel_id: (req, res, next) => 
    {
        return req.travel.getMembers({
            order: ['firstname'],
            where:{
                lastname: req.lastname
            }
        })
        .then(member => res.json(member))
        .catch(next);
    },

	add_member_id_by_travel_id: (req, res, next) => 
    {
		return req.travel.addMember(req.member)
			.then(res.status(200).send("Membre ajouté"))
			.catch(next);
	},

	delete_member_id_by_travel_id: (req, res, next) => {
		return req.travel.removeMember(req.member)

			.then(res.status(200).send("Membre supprimé"))
			.catch(next);
	},




};
