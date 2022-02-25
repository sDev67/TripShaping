import '../Styles/ButtonStyles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import {useState} from 'react';
import '../App.css';


const TodoList = () =>
{
    const [currentTask, setCurrentTask] = useState();
    const [allTasks, setAllTasks] = useState
    ([       
        {
            title:"Faire les papiers",
            executionDate:'2022-05-07'
        },
        {
            title:"Faire les valises",
            executionDate:'2022-07-07'
        },
        {
            title:"Faire Organiser les repas",
            executionDate:'2022-05-14'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-11'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-04'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-30'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-03-07'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-05-07'

        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-04-07'
        },
        {
            title:"Préparer psychologiquement les enfants",
            executionDate:'2022-04-07'
        },
        {
            title:"Trouver voiture de location",
            executionDate:'2022-04-07'
        },
        {
            title:"Faire Organiser les repas",
            executionDate:'2022-04-07'
        },
        {
            title:"Trouver un gardiens pour le chien",
            executionDate:'2022-04-07'
        },
        {
            title:"Oui",
            executionDate:'2022-04-07'
        },
        {
            title:"Bateau",
            executionDate:'2022-04-07'
        },
        {
            title:"Gateau",
            executionDate:'2022-04-07'
        },
        {
            title:"Gogo",
            executionDate:'2022-04-07'
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

    const RemoveTask = ({task}) =>
    {
      /*  if(allTasks.length >2)
            setAllTasks(allTasks.filter(x => x !== task))
        else
            alert("Une liste doit avoir au moins une tâche de programmée.")*/
    }

    return(
        <>             
                <div style={{ height:250, marginLeft:100}}>

                    <h1 style={{textAlign:'left', marginTop:10, marginLeft:50}}>Todo List</h1>
                    <hr style={{width:"85vw", marginLeft:50, borderWidth:'2px'}}/>

                    <div style={{display:'flex', flexDirection:'row', alignItems:'space-between'}}>

                        <div style={{display:'flex', flexDirection:'column', width:'150px'}}>

                            <h1 style={{textAlign:'left', marginTop:10, marginLeft:50, marginBottom:0}}>Tâches</h1>
                            <hr style={{width:"750%", marginLeft:60, marginTop:0}}/>

                            <div style={{overflowY:'auto', textAlign:'left', width:'100vh', height:'300px',border:'1px', solid:'#ccc',margin:'10px', marginBottom:'50px' }}>

                                {allTasks.map((x, key) => (
                                
                                    <>
                                        <hr style={{width:"75%", marginLeft:60, marginTop:0}}/>

                                        <div style={{display:'flex', flexDirection:'row',height:'120px', alignContent:'space-between'}} color="black">
                                            <h2 key={key} style={{marginLeft:50, marginTop:0}}>{x.title}</h2>
                                            <h4 style={{height:'40px', marginLeft:100, padding:5, borderStyle:'solid', borderWidth:'2px', borderRadius:10}}>{x.executionDate}</h4>
                                            <DeleteIcon style={{marginLeft:100}} fontSize='large' onClick={() => RemoveTask(x)} />
                                        </div>
                                        <div>
                                            {/* ici requeter pour get tout les labels */}
                                        </div>

                                    </>
                                ))
                                }

                            </div>
                          

                            <hr style={{width:"650%", marginLeft:60, marginTop:0}}/>

                        </div>   
                        <div style={{position:'fixed', right:0, marginRight:'5vh'}}>
                            <div style={{display:'flex', flexDirection:'row', marginTop:0}}>
                                <rh class="hr-v" />
                                <div style={{display:'flex', flexDirection:'column',marginRight:0}}>
                                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginLeft:'10%'}}>
                                        <h1>Labels</h1>
                                    </div>
                                    <hr style={{width:"90%", marginLeft:35}}/>
                                    <div style={{overflowY:'auto', alignContent:'center', width:'40vh', height:'350px',border:'1px', solid:'#ccc',margin:'10px', marginBottom:'50px' }}>

                                        {allLabels.map((x, key) => (

                                            <>
                                                <div style={{display:'flex', textAlign:'center', flexDirection:'row',margin:10, alignContent:'space-between',borderStyle:'solid', borderWidth:'2px', borderRadius:5, marginLeft:60}}>
                                                    <h2 key={key} style={{ marginTop:5}}>{x.title}</h2>
                                                    <DeleteIcon style={{marginLeft:20}} fontSize='large' onClick={() => RemoveTask(x)} />
                                                </div>
                                            </>
                                        ))
                                        }

                                    </div>
                                    <hr style={{width:"90%", marginLeft:35}}/>
                                    <div style={{fontSize:'inherit', marginLeft:20, marginBottom:10}}>
                                        <AddCircleOutlineRoundedIcon sx={{ fontSize: 65 }} />
                                    </div>
                                    <hr style={{width:"90%", marginLeft:16}}/>
                                    <div style={{top:0, marginLeft:'3%'}}>
                                        <h2 >Ajouter Label</h2>
                                        <form onSubmit={OnAddLabel} style={{textAlign:'center'}}>
                                            <input style={{width:'100%', height:'20px'}} type="text"/>   
                                            <input style={{width:'70%', height:'35px', marginTop:10}} type="submit" value='Ajouter Label'/> 
                                        </form>
                                    </div>
                                </div>
                            </div>                     
                        </div>                
                    </div>

                    <div style={{fontSize:'inherit', marginLeft:65, marginBottom:40, width:'50vh'}}>
                        <AddCircleOutlineRoundedIcon sx={{ fontSize: 50 }} />
                    </div>           
                    <hr style={{width:"70%", marginLeft:30}}/>
                    <div style={{top:0, marginLeft:'3%'}}>
                        <h2 >Ajouter/Modifier Label</h2>
                        <form onSubmit={OnAddLabel}  style={{alignContent:'space-between'}}>
                            <input style={{width:'25%', height:'20px', left:0, margin:10}} type="text" placeholder={currentTask}/>   
                            <input type="date" style={{margin:10}} />
                            <input style={{width:'15%', height:'35px', marginTop:10}} type="submit" value="Ajouter/Modifier"/> 
                            
                            <div style={{fontSize:'inherit', marginLeft:65, marginBottom:40, width:'50vh'}}>
                                <AddCircleOutlineRoundedIcon sx={{ fontSize: 50 }} />
                            </div>     
                        </form>
                    </div>

                </div>              
        </>
    )
}

export default TodoList;