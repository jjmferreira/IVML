import {NodeToolbar, Handle, Position } from 'reactflow';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';


const handleStyleC = { 
  height: '1px',
  width:  '1px',
  top: '35%',
  opacity: '0'
};

const handleStyleH = { 
  height: '1px',
  width:  '1px',
  opacity: '0'
};



const Vis = ({data, selected}) => {

  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }

  const hasclicks = () => {
    let result = false;
    if(data.actions.length !== 0){
      data.actions.map((action) =>{
        if(action.trigger === "Clique") {
          result = true;
          return result;
        }
      })
    }
    return result;
  }

  const hasHovers = () => {
    let result = false;
    if(data.actions.length !== 0){
      data.actions.map((action) =>{
        if(action.trigger === "Hover") {
          result = true;
          return result
        }
      })
    }
    return result;
  }



  return (
    <>
      <div className="vis-node" >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button name="Add" > <FaPlus pointerEvents={'none'}/> Adicionar </button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
            <button   name="Interação"> Criar interação!</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={75} minHeight={75} />
             <Handle type="source" position={Position.Right} id="Clique" style={( hasclicks() ? {  top: '35%',  backgroundImage: `url(${"/static/media/Clique.8618a6227aea47d462ae.PNG"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '10px', height:'10px'} : handleStyleC)}/>
             <Handle type="source" position={Position.Right} id="Hover" style={( hasHovers() ? {backgroundImage: `url(${"/static/media/Hover.95d3aff6deae4093e569.PNG"})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '10px', height:'10px'}: handleStyleH)}/>
        <div className='corner-element'>{data.compCounter}  </div>
        <div className='componentNameStyle' style={adaptaptableWidth}>
            <b>{data.name}</b>
        </div>
        {<Handle type="target" position={Position.Left} id="a" style={{opacity: '0'}} /> }
      </div>
    </>
    
  );
  }
export default Vis;
