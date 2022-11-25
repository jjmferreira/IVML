import {Handle, Position } from 'react-flow-renderer';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'

import filtragem from "../imagens/Icones/Filtragem.PNG"
import destaque from "../imagens/Icones/Destaque.PNG"

const handleStyle = { 
  height: '3px',
  width:  '3px'
};

const removeStyle = {
  color: 'red'
}




function AcaoDadosComponente({data}) {

  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }

  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }
  
  const actonType = () => {
    console.log(data.actionResultType)
    switch(data.actionResultType){
      case "filtragem": return filtragem;
      case "destaque": return destaque;
    }
  }

  return (
    <div className="acao-dados-node" style={sizeValues}>
        <div className='componentNameStyleWithoutCounter' style={adaptaptableWidth}>
        <b>{data.name}</b>
        </div>
        <div className='miniContainer'>
        <button className='miniButtonSize iconSize' name="Info"> <FaInfo pointerEvents={'none'}/> </button>
        <button className='miniButtonSize iconSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button  className='miniButtonSize iconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
        <div className='actionIconContainer' >
         <img className='actionIcon'src={actonType()}></img>
        </div>
        {<Handle type="target" position={Position.Left} style={handleStyle}/> }
        {/*<Handle type="source" position={Position.Right} id="a" style={handleStyle} /> */}

    </div>
  );
  }
export default AcaoDadosComponente;
