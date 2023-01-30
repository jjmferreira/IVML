import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from 'react-bootstrap/Button';


const Tooltips = ({nodes, parent, getName, createTooltip, eliminateTooltip}) => {

    const [tooltip, setTooltip] = useState({title: '', dataComps: '', description: ''});

    const [title, setNewTitle] = useState(parent.data.tooltip !== '' ? parent.data.tooltip.title : '')
    const [targetData, setTargetData] = useState(parent.data.tooltip !== '' ? parent.data.tooltip.dataComps : []);
    const [description, setDescription] = useState(parent.data.tooltip !== '' ? parent.data.tooltip.description : '')

    //Set new data name value
    const [toCreate, setToCreate] = useState(false)
    const [newDataName, setNewDataName] = useState('');
    const [newNamesList, setNewNamesList] = useState(parent.data.tooltip !== '' ? parent.data.tooltip.dataComps : []);

    //PROBLEMA QUANDO SAO DE LSITAS DIFERETNTES -> DATACMPS


    const getDataChilds = () => {
        let childs = [];
        nodes.map(n => {
            if(n.parentNode === parent.id && n.type === "dados"){
                childs.push(n);
            }
        })
        return childs;
    }

    //verificar se está no componente de visualização
    const addTargetComponent = () =>{
        const targetID = document.getElementById("targets").value;
        if(targetID === "DEFAULT"){
          alert("You didn't choose an option!")
        } if(!newNamesList.includes(newDataName)){
            if(targetID === "Outro" ){
              if(newDataName !== ""){
                setNewNamesList([...newNamesList, newDataName]);
                setNewDataName("");
              } else{
                alert('The data component must have a name!')
              }
            } else{
              setNewNamesList([...newNamesList, targetID]);
              setNewDataName("");
            }
          }
        
      }
    
      const deleteTargetComp = (target) => {
        if(target !== ""){
          setNewNamesList(newNamesList.filter(t => t !== target));
        }
      }

      const createTool = () => {
        tooltip.title = title;
        tooltip.dataComps = newNamesList;
        tooltip.description = description;
        setTooltip([tooltip]);
        createTooltip(tooltip, parent);
      }

      const eliminateTool = () => {
        document.getElementById("targets").value = "DEFAULT"
        setNewTitle('');
        setNewNamesList([]);
        setNewDataName('')
        setDescription('');
        setTooltip({title: '', dataComps: '', description: ''});
        setToCreate(false);
        eliminateTooltip(parent);
      }

    

    return(
        <div className="box">
                <div>
                    <b><label htmlFor="text">Título do componente:</label></b>
                    <input id="text" type="text" value={title} onChange={(e) => setNewTitle(e.target.value)}/>
                    <br/><br/>
                    <b><label htmlFor="text">Componentes de Dados da Visualização:</label></b>
                    <br/> <br/>
                    <select id="targets" name="category" defaultValue={'DEFAULT'} onChange={e => e.target.value === "Outro" ? setToCreate(true) : setToCreate(false)}>
                    <option value="DEFAULT" disabled>Escolher...</option>
                        {getDataChilds().map((dataN) => (            
                            <option key={dataN.id} value={getName(dataN)}>
                            {getName(dataN)}
                            </option>
                        ))}
                        <option key={"Outro"} value={"Outro"}>Outro</option>
                    </select>
                    {toCreate ? 
                    <>
                    <br></br><br></br>
                    <b><label htmlFor="text">Nome dos dados a adicionar:</label></b>
                    <input id="text" type="text" onChange={(e) => setNewDataName(e.target.value)}/>
                    <br/><br/>
                    </> : ""}
                    {' '}<Button onClick={() => {addTargetComponent()}} variant="outline-success">Adicionar</Button>
                    <ul>
                    {newNamesList.map(newData => <li key={newData}> {newData} 
                    <button onClick={() => deleteTargetComp(newData)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
                    </ul>
                    <br></br>
                    <>
                    <label>
                        Descrição da tooltip:
                        <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    </>
                </div>
                <br></br>
                <Button onClick={() => createTool()} variant="success">Criar tooltip</Button>{'  '}<Button onClick={() => eliminateTool()} variant="danger">Eliminar</Button>

        </div>

    );
};

export default Tooltips;
