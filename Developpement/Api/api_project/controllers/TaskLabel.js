const db = require("../models");

module.exports = {
  get_all_label_by_task_id: (req, res, next) => {
    return res.locals.task
      .getLabels({
        order: ["title"],
      })
      .then((labels) => res.json(labels))
      .catch(next);
  },
  get_label_id_by_task_id: (req, res, next) => {
    return res.locals.task
      .getLabels({
        where:
        {
          id:req.params.label_id
        },
      })
      .then((label) => res.json(label))
      .catch(next);
  },
  get_all_task_by_label_id: (req, res, next) => {
    return res.locals.label
      .getTasks({
        order: ["title"],
      })
      .then((tasks) => res.json(tasks))
      .catch(next);
  },

  add_label_id_by_task_id: (req, res, next) => {
    console.log("-------------------------------" + res.locals.label + "-------------------------------")
     return res.locals.task.addLabel(res.locals.label)
     .then(res.json(res.locals))
     .catch(next);
  },

  delete_label_id_by_task_id: (req, res, next) => {
    return res.locals.task
      .removeLabel(res.locals.label)

      .then(res.json(res.locals))
      .catch(next);
  },
  update_label_by_task_id: (req, res, next) => {
    return db.Travel.findByPk(req.params.task_id)
      .then((task) => {
        if (!task) {
          throw { status: 404, message: "Requested Group not found" };
        }
        Object.assign(task, req.body);
        return task.save();
      })
      .then((task) => res.json(task))
      .catch(next);
  },
};
