import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import AddIcon from '@mui/icons-material/Add';

const ListDetail = ({list}) => 
{
    const [currentTask, setCurrentTask] = useState();
    const [allTasks, setAllTasks] = useState([]);

    useEffect(()=>
    {
        setAllTasks(list.tasks);
    })


    const Handleclick = ({key}) =>
    {
        setCurrentTask(allTasks[key]);
    }

    const AddTask = () =>
    {
        setAllTasks(...allTasks, {title:"New task", executionDate:Date.now()})
        setCurrentTask(allTasks[allTasks.length-1])
    }

    const RemoveTask = ({task}) =>
    {
      /*  if(allTasks.length >2)
            setAllTasks(allTasks.filter(x => x !== task))
        else
            alert("Une liste doit avoir au moins une tâche de programmée.")*/
    }

    return(
        <> 
            <div style={{ borderStyle:'solid', height:470, display:'flex', flexDirection:'column'}}>
                {/* <h2>{list.title}</h2> */}
                <div style={{marginLeft:25, width:'500px'}}>
                    <h2>Éditer List</h2>
                    <TextField id="outlined-basic" label={list.title} variant="outlined" size='small'/>

                    <div style={{overflowY:'auto', textAlign:'left', width:'200vh', height:'300px',border:'1px', solid:'#ccc',margin:'10px' }}>
                        <ul style={{marginTop:25}}>
                            {allTasks.map((props, key) => (
                                <>
                                    <li onClick={() => Handleclick({key})}  key={props.id} style={{marginBottom:30, display:'flex', flexDirection:'row', alignItems:'center'}} >
                                        <h3 style={{marginRight:50}}>{props.title}</h3>
                                        <div style={{borderStyle:'solid', textAlign:'center', borderRadius:10}}>
                                             <h3 style={{marginLeft:20, marginRight:20}}>{props.executionDate}</h3>
                                        </div>
                                        <DeleteIcon fontSize='large' onClick={() => RemoveTask(props)} />
                                    </li>
                                </>
                            ))}
                        </ul>  
                 
                    </div>  
                    <AddIcon onClick={() => AddTask} size="large"/>                     
                </div>
            </div>
            {/* Affiche une section permettant d'ajouter un élément à la liste en cours */}
            <div>
                {currentTask !== undefined ? <TaskForm task={currentTask} setTask={setCurrentTask} /> : <></>}
                    
            </div>
        </>)
}

export default ListDetail;