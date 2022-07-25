import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, } from '../../state/features/jobs/jobSlice';
import { ThemeContext } from '../../App';

const LoginPrompt = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoginRoute = () => {
    handleClose();
    navigate('/login');
    // window.location.href = '/login';
  };
  const handleOtherRoute = () => {
    handleClose();
    dispatch(changeView('list'));
  };

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <>
      <Modal
        contentClassName={theme === 'dark' && 'dark'}
        show={show}
        onHide={handleOtherRoute}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className={theme === 'dark' && 'btn-close-white'}>
          <Modal.Title>Login Redirect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Login or Signup to create a job. 
        </Modal.Body>
        <Modal.Footer>
          <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant="secondary" onClick={handleOtherRoute}>
          No, Thanks
          </Button>
          <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant="primary" onClick={handleLoginRoute}>Take Me There</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPrompt;

