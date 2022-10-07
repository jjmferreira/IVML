
const AcaoDadosForm = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <button onClick={props.handleClose}>x</button>
          {props.content}
        </div>
      </div>
    );
  };

export default AcaoDadosForm
