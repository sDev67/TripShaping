import { checkStatus, url_prefix } from "../utils";

const TodoListRequest = {

    getLabelOfTask: idTask => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/task/${idTask}/label`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    getTaskByLabelId: (idLabel) => {

        return fetch(`${url_prefix}/label/${idLabel}/task`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                //  Authorization: 'Bearer ' + token
            },
        })
        .then(checkStatus)
        .then(res => res.json())

    },
    getLabelIdOfTaskId: (taskLabel) => {
        const TaskId = taskLabel.task.id;
        const LabelId = taskLabel.label.id; 
        return fetch(`${url_prefix}/task/${TaskId}/label/${LabelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                //  Authorization: 'Bearer ' + token
            },
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    addLabelToTask : (taskLabel) => 
    {
        const TaskId = taskLabel.task.id;
        const LabelId = taskLabel.label.id; 

        return fetch(`${url_prefix}/task/${TaskId}/label/${LabelId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/text',
                //  Authorization: 'Bearer ' + token
            },
            body: taskLabel
        })
        .then(checkStatus)
        .then(res => res.json());
    },
    updateLabelToTask : ({title,idTask, idLabel}) => 
    {
        return fetch(`${url_prefix}/task/${idTask}/label/${idLabel}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title,idLabel })
        })
            .then(checkStatus)
            .then(res => res.json());
    },
    deleteLabelOfTask : (taskLabel) => 
    {
        const TaskId = taskLabel.task.id;
        const LabelId = taskLabel.label.id; 
        return fetch(`${url_prefix}/task/${TaskId}/label/${LabelId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            
        })
        .then(checkStatus)
        .then(res => res.json());
    },
    updateTaskById: ({title, date,isDone, idTask, idTravel}) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/task/${idTask}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body:JSON.stringify({title, date,isDone, idTask, idTravel})
        })
            .then(checkStatus)
            .then(res => res.json())
    },
    updateLabelById: ({title, idLabel,idTravel }) => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/label/${idLabel}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body:JSON.stringify({title, idLabel, idTravel})
        })
            .then(checkStatus)
            .then(res => res.json())
    },

};
      
export default TodoListRequest;