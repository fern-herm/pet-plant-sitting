import React, { useState, useContext } from 'react';
import { useAppDispatch } from '../../state/hooks';
import moment from 'moment';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteApplication } from '../../state/features/jobs/jobSlice';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from '../../App';

const AppliedJobsBoard = ({
  job,
  startDate,
  petPlants,
  location,
  id,
  status,
}) => {
  const theme = useContext(ThemeContext);
  //console.log(location);
  const dispatch = useAppDispatch();
  //console.log('job in board', job);
  //console.log(id, 'id'); //job id
  // console.log('startDate', startDate);
  //console.log('petPlants', petPlants);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cancelApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  // console.log('petPlants', petPlants);
  //'bootstrap-card job-application-container'
  return (
    <Card className='landing-applications-card bootstrap-card'>
      <Card.Body>
        <Card.Title className='landing-application-card-title'>
          Application For{' '}
          {petPlants.map((pet) => {
            return `${pet.pet_plant.name} | `;
          })}{' '}
        </Card.Title>
        <p className='landing-application-date'>
          {moment(startDate).format('dddd MMMM Do, YYYY')}
        </p>
        <p className='landing-application-status'>
          Status for Job ID # {job.id}:{' '}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
        <img
          className='landing-application-status-card-image'
          src={petPlants[0].pet_plant.image}
          alt=''
        />

        <Card.Text className='landing-application-job-description'>
          Species:{' '}
          {petPlants.map((pet) => {
            return `${pet.pet_plant.species} | `;
          })}
          <p className='huh'>
            About:{' '}
            {petPlants.map((pet) => {
              return `${pet.pet_plant.bio} | `;
            })}
          </p>
        </Card.Text>
        {/* <Button
          className='application-status-card-btn'
          // variant='primary'
          onClick={() => cancelApplication(id)}
        >
          Delete
        </Button> */}

        <Button className='application-status-card-btn bootstrap-button' onClick={handleShow}>
          Delete
        </Button>

        <Modal show={show} onHide={handleClose}
          contentClassName={theme === 'dark' && 'dark'}
        >
          <Modal.Header closeButton className={theme === 'dark' && 'btn-close-white'}>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Deleting will permanently remove this application from this page.
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}
              className={theme === 'dark' && 'bootstrap-modal-button'}
            >
              No
            </Button>
            <Button
              variant='danger'
              onClick={() => cancelApplication(id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default AppliedJobsBoard;
