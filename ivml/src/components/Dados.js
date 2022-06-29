import { Stage, Layer, Rect, Text, Group} from 'react-konva';

const Dados = (props) => {


  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
    <Group draggable>
    <Text text={props.title}  fontSize={15} />
    <Rect 
      x={20}
      y={50}
      width={100}
      height={100}
      fill="white"
      shadowBlur={10}
    
    />
    </Group>
  </Layer>
</Stage>

  )
}

export default Dados
