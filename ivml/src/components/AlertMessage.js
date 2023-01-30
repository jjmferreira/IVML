
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


function AlertMessage({isValid}) {

  const [test, setTest] = useState(isValid);

  return (
    <>
    <Alert show={test} key={'warning'} variant={'warning'}>
      This is a {'warning'} alert—check it out!
    <button onClick={() => setTest(false)}>Ok!</button>
    </Alert>
    </>

  );
}

export default AlertMessage;