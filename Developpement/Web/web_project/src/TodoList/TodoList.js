import '../Styles/ButtonStyles.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Stack,Divider,Typography} from "@mui/material";
import {useState} from 'react';
import '../App.css';
import TasksItemGrid from './TasksItemGrid';
import LabelsItemGrid from './LabelsItemGrid';
import IconButton from '@mui/material/IconButton';
import TaskForm from './TaskForm';



const TodoList = () =>
{
    const [currentTask, setCurrentTask] = useState();
    const [allTasks, setAllTasks] = useState
    ([       
        {
            title:"Faire les papiers",
            executionDate:'2022-05-07',
            labels:
            [
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                },
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                },
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                },
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                },
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Faire les valises",
            executionDate:'2022-07-07',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Faire Organiser les repas",
            executionDate:'2022-05-14',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-11',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-04',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-30',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-03-07',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-07',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]

        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-04-07',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Préparer psychologiquement les enfants",
            executionDate:'2022-04-07',
            labels:
            [
                {
                title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        },
        {
            title:"Trouver voiture de location",
            executionDate:'2022-04-07',
            labels:
            [
                {
                    title:'Label1',
                },
                {
                    title:'Label2'
                },
                {
                    title:'Label3'
                }
            ]
        }
    ])
  
    const [allLabels, setAllLabels] = useState(
        [
            {
                title:'Label1'
            },
            {
                title:'Babel2'
            },
            {
                title:'Label3'
            },
            {
                title:'Label5'
            },
            {
                title:'Babel6'
            },
            {
                title:'Label33'
            },
            {
                title:'Label1'
            },
            {
                title:'Babel2'
            },
            {
                title:'Label3'
            },
            {
                title:'Label5'
            },
            {
                title:'Babel6'
            },
            {
                title:'Label3333333'
            },
        ]
    )

    const OnAddLabel = ({label}) =>
    {
        setAllLabels(...allLabels, label);
    }

    const OnSelectTask = ({task}) => 
    {
        setCurrentTask(allTasks[task]);
    }

    const OnAddTask = ({label}) =>
    {
        setAllTasks(...allTasks, label);
    }

    const OnRemoveTask = ({task}) =>
    {
    
    }

    const OnAddLabelToTask = ({label, task}) => 
    {
        
    }

    const OnRemoveLabelToTask = ({label, task}) =>{

    }

    const OnDeleteLabel = ({label}) =>{

    }

    return(
        <>             
        
                <div style={{ height:'100%', width:'100%', display:'flex', flexDirection:'row'}}>
                    <Stack
                    direction="column"
                    alignItems='flex-start'
                    divider={<Divider orientation="horizontal" flexItem />}
                    style={{ height: "100%", width: "100%" }}>

                        <Typography variant="h3">Todo List</Typography>

                        <Stack
                         direction='column'
                         divider={<Divider orientation="horizontal" flexItem />}
                         style={{ height: "65%", width: "100%" }}>

                            <Typography margin='20px' variant="h3">Tasks</Typography>
                            <TasksItemGrid tasks={allTasks} OnRemoveLabelToTask={OnRemoveLabelToTask} OnSelectTask={OnSelectTask} />       
                         </Stack> 
                         <IconButton aria-label="Add">
                            <AddCircleIcon sx={{fontSize:'50px'}} />
                        </IconButton>

                        {
                            currentTask !== null ?
                             <TaskForm /> :
                              ""
                        }    
                    </Stack>
                   
                    <Divider orientation='vertical'/>
                    <Stack
                        direction="column"
                        alignItems='flex-start'
                        divider={<Divider orientation="horizontal" flexItem />}
                        style={{ height: "100%", width: "50%" }}>  

                        <Stack
                         direction='column'
                         divider={<Divider orientation="horizontal" flexItem />}
                         style={{ height: "100%", width: "80%" }}>

                            <Typography margin='20px' variant="h3">Labels</Typography>

                            <LabelsItemGrid labels={allLabels} OnAddLabel={OnAddLabel} OnDeleteLabel={OnDeleteLabel} />

                         </Stack>   
                    </Stack> 
                </div>              
        </>
    )
}

export default TodoList;