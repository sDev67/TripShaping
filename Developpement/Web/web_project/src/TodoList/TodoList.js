import '../Styles/ButtonStyles.css';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const TodoList = () =>
{
    return(
        <>             
                <div style={{ borderStyle:'solid', height:250}}>
                    <h1 style={{textAlign:'center', marginTop:0}}>My lists</h1>
                    {/* A changer avec les requete */}
                    <div style={{margin:50,display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <li>
                            <button className="ListButton">Ma liste 1</button>
                        </li>
                        <li>
                            <button className="ListButton">Ma liste 2</button>
                        </li>
                        <li>
                            <button className="ListButton">Ma liste 3</button>
                        </li>
                    </div>

                    <div style={{marginRight:'200px'}}>
                        <AddCircleOutlineRoundedIcon fontSize='large'/>      
                    </div>
           
                </div>
        </>
    )
}

export default TodoList;