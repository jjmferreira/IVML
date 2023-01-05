import cor from "../imagens/Cor.PNG"
import tamanho from "../imagens/Tamanho.PNG"
import forma from "../imagens/Forma.PNG"
import {NodeToolbar, Position} from "reactflow";
import {FaInfo, FaPlus, FaTrashAlt} from "react-icons/fa";
import {NodeResizer} from "@reactflow/node-resizer";





function VarVisuaisImgComponente({data, selected}) {

  const switchVariable = () => {
    switch(data.varName){
      case "Cor": return (<img src={cor} alt="test" className='var-node'></img>)
      case "Tamanho": return (<img src={tamanho} alt="test" className='var-node'></img>)
      case "Forma": return (<img src={forma} alt="test" className='var-node'></img>)
    }
  } 

  return (
    <div >
      <div>
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
          <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        {switchVariable()}
      </div>
    </div>
  );
}

export default VarVisuaisImgComponente;
