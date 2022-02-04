import '../Styles/ButtonStyles.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button } from '@mui/material';
import {useState} from 'react';
import ListDetail from './ListDetail';

const TodoList = () =>
{
    const [currentList, setCurrentList] = useState();
    const [allLists, setAllLists] = useState
    ([       
            {
                title:'Ma première liste',
                tasks:
                [
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

                ]
            },
            {
                title:"Ma deuxième liste",
                tasks:
                [
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
                    }
                ]
            },
            {
                title:"Ma troisième liste",
                tasks:
                [
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
                ]
            }     
    ])

    const Handleclick = ({key}) =>
    {
        setCurrentList(allLists[key]);
    }

    const RemoveList = ({list}) =>
    {
      /*  if(allTasks.length >2)
            setAllTasks(allTasks.filter(x => x !== task))
        else
            alert("Une liste doit avoir au moins une tâche de programmée.")*/
    }

    return(
        <>             
                <div style={{ borderStyle:'solid', height:250}}>
                    <h1 style={{textAlign:'center', marginTop:0}}>My lists</h1>
                    {/* A changer avec les requete */}
                    <div style={{margin:50,display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

                        {allLists.map((list, key) => 
                            (
                                <>
                                    <li style={{listStyle: 'none', alignItems:'center'}} key={list.id}>
                                        <Button size="large" variant="outlined" onClick={() =>Handleclick({key}) } >{list.title}</Button>
                                        <DeleteIcon fontSize='medium' onClick={() => RemoveList(list)} />
                                    </li>
                                </>      
                            )) 
                        }
                     
                    </div>

                  
                    <div style={{marginLeft:'50px'}}>
                        <AddCircleOutlineRoundedIcon fontSize='large'/>      
                    </div>

                </div>
                {/* EPHEMERE */
      
                    currentList !== undefined ? <ListDetail list={currentList} /> : <></>
                }

              
        </>
    )
}

export default TodoList;