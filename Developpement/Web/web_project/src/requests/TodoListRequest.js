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

    getStepsOfTravel: idTravel => {
        //const token = window.localStorage.getItem('token');
        return fetch(`${url_prefix}/travel/${idTravel}/steps`, {
            // headers: {
            //     Authorization: 'Bearer ' + token
            // }
        })
            .then(checkStatus)
            .then(res => res.json())
    },

    addLabelToTask : ({title,idTask, idLabel}) => 
    {
        return fetch(`${url_prefix}/${idTask}/label/${idLabel}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({ title,idLabel })
        })
            .then(checkStatus)
            .then(res => res.json());
    },
    updateLabelToTask : ({title,idTask, idLabel}) => 
    {
        return fetch(`${url_prefix}/${idTask}/label/${idLabel}`, {
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
    deleteLabelOfTask : ({title,idTask, idLabel}) => 
    {
        return fetch(`${url_prefix}/${idTask}/label/${idLabel}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //  Authorization: 'Bearer ' + token
            },
            
        })
        .then(checkStatus)
    },

};
      
export default TodoListRequest;