import { useCallback, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };


function TextUpdaterNode() {
  const [toggleButton, setToggle] = useState(false)
  console.log(toggleButton);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <button onClick={() => {setToggle(!toggleButton)}}> Try it!</button>
        <h4>{toggleButton ? "Resultou" : "Carrega no botão"}</h4>
        <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />  
      </div>
    </div>
  );
}

export default TextUpdaterNode;
