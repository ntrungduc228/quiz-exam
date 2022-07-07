import React, { useState } from 'react';
import Toasts from '../../../components/Toasts';
import { Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const Subject = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      Subject
      <Toasts show={show} setShow={setShow} />
      <Button variant="primary" onClick={() => toast.error('Here is your toast.')}>
        set
      </Button>
    </>
  );
};

export default Subject;
