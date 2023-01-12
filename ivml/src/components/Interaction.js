import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'

import filtragem from "../imagens/Icones/Filtragem.PNG"
import destaque from "../imagens/Icones/Destaque.PNG"
import {NodeResizer} from "@reactflow/node-resizer";

const handleStyle = { 
  height: '1px',
  width:  '1px'
};

const removeStyle = {
  color: 'red'
}




function AcaoDadosComponente({data, selected}) {

  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }

  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }
  
  const actonType = () => {
    switch(data.actionResultType){
      case "filtragem": return filtragem;
      case "destaque": return destaque;
    }
  }

  return (
    <div className="acao-dados-node" >
        <div className='componentNameStyleWithoutCounter' style={adaptaptableWidth}>
        <b>{data.name}</b>
        </div>
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button name="Add" > <FaPlus pointerEvents={'none'}/> Adicionar </button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} style={sizeValues} minWidth={75} minHeight={75} />
        <div className='actionIconContainer' >
         <img className='actionIcon'src={actonType()}></img>
        </div>
        {<Handle type="target" position={Position.Left} style={handleStyle}/> }
        {<Handle type="source" position={Position.Right} id="a" style={handleStyle} />}

    </div>
  );
  }
export default AcaoDadosComponente;
