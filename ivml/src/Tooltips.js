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
    const [newNamesList, setNewNamesList] = useState([]);

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
        } else if (targetID === "Outro"){
          if(!newNamesList.includes(newDataName) && newDataName !== ""){
            setNewNamesList([...newNamesList, newDataName]);
            setNewDataName("");
          }
        } else{
          if(!targetData.includes(targetID)){
          setTargetData([...targetData, targetID])
        }
        }
        
      }
    
      const deleteTargetComp = (target) => {
        if(target !== ""){
          setTargetData(targetData.filter(t => t !== target));
          setNewNamesList(newNamesList.filter(t => t !== target));

        }
      }

      const getDataCompNames = () => {
        
        let listNames = [];
        targetData.map(target =>{
            listNames = [...listNames, getName(nodes.find(node => node.id === target))]
        })
        return listNames;
      }

      const createTool = () => {
        let fullList = [...getDataCompNames(), ...newNamesList];
        tooltip.title = title;
        tooltip.dataComps = fullList;
        tooltip.description = description;
        setTooltip([tooltip]);
        createTooltip(tooltip, parent);
      }

      const eliminateTool = () => {
        document.getElementById("targets").value = "DEFAULT"
        setNewTitle('');
        setTargetData([]);
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
                    <b><label htmlFor="text">Especificação de Dados:</label></b>
                    <br/>
                    <select id="targets" style={{width:"18vh"}} name="category" defaultValue={'DEFAULT'} onChange={e => e.target.value === "Outro" ? setToCreate(true) : setToCreate(false)}>
                    <option value="DEFAULT" disabled>Escolher...</option>
                        {getDataChilds().map((dataN) => (            
                            <option key={dataN.id} value={dataN.id}>
                            {getName(dataN)}
                            </option>
                        ))}
                        <option key={"Outro"} value={"Outro"}>Outro</option>
                    </select>
                    {toCreate ? 
                    <><br/><br/>
                    <b><label htmlFor="text">Nome dos dados:</label></b>
                    <input style={{width:"18vh"}} id="text" type="text" onChange={(e) => setNewDataName(e.target.value)}/>
                    </> : ""}
                    {' '}<Button onClick={() => {addTargetComponent()}} variant="outline-secondary">Adicionar</Button>
                    <ul style={{marginTop:"10px"}}>
                    {targetData.map(targetC => <li key={targetC}> {getName(nodes.find(node => node.id === targetC) )} 
                    <button onClick={() => deleteTargetComp(targetC)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
                    {newNamesList.map(newData => <li key={newData}> {newData} 
                    <button onClick={() => deleteTargetComp(newData)} > <FaTimes pointerEvents={'none'}/></button> </li>)}
                    </ul>
                    <>
                    <label >
                        <b>Descrição da tooltip:</b>
                        <textarea
                            style={{width:"100%"}}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                    </>
                </div>
                <br></br>
                <Button onClick={() => createTool()} variant="secondary">{parent.data.tooltip !== '' ? "Editar" : "Criar"} tooltip</Button>
            {'  '}{parent.data.tooltip !== '' ? <Button onClick={() => eliminateTool()} variant="danger">Eliminar</Button> : null}

        </div>

    );
};

export default Tooltips;
