import {useState} from "react";
import {FaTrashAlt, FaTimes} from "react-icons/fa";
import {NodeToolbar} from "reactflow";

const ParameterBindingForm = ({handleActionStart, handleActionFinish, handleClose, changeDataName, createComp, newList, nodesName, parameterNodes, handleSetupSourceIcon}) => {

let keyCounter = 0;
const [options, setOptions] = useState([]);
const [optionName, setOptionName] = useState("");



const addOption = () => {
  if(optionName !== "" && !options.includes(optionName)){
    setOptions([...options, optionName]);
    console.log("Options " + [...options, optionName]);
    newList([...options, optionName]);
  }
}

const deleteOption = (option) => {
    if(option !== ""){
      setOptions(options.filter(op => !op.includes(option)));
      console.log("Options " + options.filter(op => !op.includes(option)));
      newList(options.filter(op => !op.includes(option)));
    }
  }

const aux = (curNode) => {
  let nodeName = curNode.data.name;
  if(curNode.data.compCounter !== undefined){
    return curNode.data.compCounter;
  } else{
    let string = "";
    nodesName.map((node) => {
      if(node.id === curNode.parentNode){
        //console.log(nodeName + "(" + node.data.compCounter + ")")
        string = nodeName + "(" + node.data.compCounter + ")";
        return string
      }
    })
    return string;
  }
}

  return (
    <div className="popup-box">
      <div className="box">
        <button className="closeButtonTop" onClick={handleClose}>x</button>
        <br></br>
        <div><b><label htmlFor="text">Título do componente:</label></b>
        <input id="text" type="text" onChange={(e) => changeDataName(e)}/>
        <br></br><br></br>
        <b><label htmlFor="text">Parâmetro:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionStart(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o parâmetro:</option>
            {parameterNodes.map((node) => (
            <option key={node.id} value={node.id}>
            {node.data.compCounter}              
            </option>
          ))}
        </select>
        <br></br> <br></br>
        <b><label htmlFor="text">Tipo de interação:</label></b>
          <br></br><br></br>
          <select name="category" defaultValue={'DEFAULT'} onChange={event => handleSetupSourceIcon(event.target.value)}>
            <option value="DEFAULT" disabled>Escolhe o tipo:</option>
            <option>Clique</option>
            <option>Hover</option>
          </select>
        <br></br><br></br>
        <b><label htmlFor="text">Componente de Chegada:</label></b>
        <br></br> <br></br>
        <select name="category" defaultValue={'DEFAULT'} onChange={event => handleActionFinish(event.target.value)}>
        <option value="DEFAULT" disabled>Escolhe o componente:</option>
            {nodesName.map((node) => (
            <option key={node.id} value={node.id}>
              {aux(node)}
            </option>
          ))}
        </select>
          <br></br> <br></br>
        <div><b><label htmlFor="text">Nova opção:</label></b>
          <input id="text" type="text" onChange={(e) => setOptionName(e.target.value)}/>
          <button onClick={addOption}> Adicionar!</button></div>
        <ul>
          {options.map(option => <li key={keyCounter++}> {option}
            <button style={{marginLeft:"3px"}} onClick={() => deleteOption(option)} > <FaTimes pointerEvents={'none'}/></button>
          </li>)}
        </ul>
        </div>
       
        <button className="formButton"  onClick={ () => {createComp()}}> Criar Parameter Binding!</button>
      </div>
    </div>
  );
};

export default ParameterBindingForm;