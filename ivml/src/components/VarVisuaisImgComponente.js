import cor from "../imagens/Cor.PNG"
import tamanho from "../imagens/Tamanho.PNG"
import forma from "../imagens/Forma.PNG"
import {FaTrashAlt} from 'react-icons/fa'







function VarVisuaisImgComponente({data}) {

  const removeStyle = {
    color: 'red'
  }

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
        {switchVariable()}
        <button className='miniButtonSize1 miniIconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
      </div>
    </div>
  );
}

export default VarVisuaisImgComponente;
