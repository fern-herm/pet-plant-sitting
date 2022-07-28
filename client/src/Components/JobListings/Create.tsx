import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, setJobs } from '../../state/features/jobs/jobSlice';
import {
  Row,
  Col,
  Button,
  Form,
  ToggleButton,
  ButtonGroup,
  Alert,
} from 'react-bootstrap';
import LoginPrompt from './LoginPrompt';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = ({ setShowCreated }): JSX.Element => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userProfile.value);
  const myPets = useAppSelector((state) =>
    state.petPlant.petPlants.filter((pet) => pet.owner_id === user.id)
  );
  const petPlants = useAppSelector((state) => state.petPlant.petPlants).reduce(
    (ans, pet, ind, array) => {
      if (pet.owner_id === user.id) {
        ans.push(pet.id);
      }
      return ans;
    },
    []
  );
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(
    moment().add(1, 'days').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment().add(2, 'days').format('YYYY-MM-DD')
  );
  const [description, setDescription] = useState('');
  const [feed, setFeed] = useState(
    myPets.reduce((arr) => {
      arr.push(false);
      return arr;
    }, [])
  );
  const [disabled, setDisabled] = useState(true);
  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');
    dispatch(setJobs(jobs.data));
  };
  
  const postJob = async (newJob: any) => {
    return await axios
      .post('/api/jobs/create', newJob)
      .then((res: any) => {
        return res;
      })
      .then((newJob) => {
        newJob.data.pet_plant.forEach((pet) => {
          axios.post('/api/jobs/jobPetsPlants/create', {
            job_id: newJob.data.id,
            pet_plant_id: pet,
          });
        });
      })
      .then(() => {
        getJobs();
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };

  const handleChangeStartDate = (e: Event) => {
    setStartDate(e.target.value);
  };
  const handleChangeEndDate = (e: Event) => {
    setEndDate(e.target.value);
  };
  const handleChangeDescription = (e: Event) => {
    setDescription(e.target.value);
  };

  const petFeedButton = (e, index) => {
    const newFeed = feed.reduce((a, e) => {
      a.push(e);
      return a;
    }, []);
    newFeed[index] = !newFeed[index];
    setFeed(newFeed);
  };
  const handleSubmit = () => {
    setShowCreated(true);
    console.log(myPets.reverse());
    console.log(feed);
    const jobPetsPlants = myPets.reduce((acc, pet, i) => {
      if (feed[i] === true) {
        acc.push(pet.id);
      }
      return acc;
    }, []);
    const obj = {
      location: user.location,
      employer_id: user.id,
      pet_plant: jobPetsPlants,
      startDate: startDate,
      endDate: endDate,
      isCompleted: false,
      description: description,
    };
    postJob(obj);

    dispatch(changeView('list'));
    return;
  };
  useEffect(() => {
    feed.some((ele) => {
      return ele === true;
    })
      ? setDisabled(false)
      : setDisabled(true);
  }, [feed]);
  return user.name !== '' ? (
    user.pet_plants.length > 0 ? (
      <Form>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
          <Form.Label>
            Job Location: <div>{user.location}</div>
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
          <Form.Label>Pets/Plants</Form.Label>
          <br />
          <ButtonGroup className="mb-2">
            {user.pet_plants.map((radio, idx) => (
              <ToggleButton
                className = {feed[idx] ? 'petButton1' : 'petButton2'}
                key={idx}
                id={`checkbox-${idx}`}
                type="checkbox"
                variant={feed[idx] ? 'success' : 'outline-success'}
                name="radio"
                value={radio.name}
                checked={feed[idx]}
                onChange={(e) => {
                  petFeedButton(e, idx);
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="createEventForm.ControlTextarea1"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="bootstrap-textbox"
            as="textarea"
            placeholder={'Describe the job in one or two sentences.'}
            rows={3}
            onChange={(e) => {
              handleChangeDescription(e);
            }}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="createEventForm.ControlInput3"
            >
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                className="bootstrap-textbox"
                type="date"
                value={startDate}
                onChange={(e) => {
                  handleChangeStartDate(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="createEventForm.ControlInput3"
            >
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                className="bootstrap-textbox"
                type="date"
                value={endDate}
                onChange={(e) => {
                  handleChangeEndDate(e);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          disabled={disabled}
          className="bootstrap-button"
          variant="primary"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    ) : (
      <Alert variant="warning">
        Add a pet or plant to{' '}
        <Alert.Link
          onClick={() => {
            navigate('/profile/' + user.id);
          }}
        >
          your profile
        </Alert.Link>{' '}
        first!
      </Alert>
    )
  ) : (
    <LoginPrompt />
  );
};

Create.propTypes = {};

export default Create;
