import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setView, addNewEvent } from '../../state/features/events/eventsSlice';
import LoginPrompt from './LoginPrompt';
import { Form, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment';

const CreateEvent = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const event = useAppSelector(state => state.events.event);
  // console.log(event);

  //* local state for form values
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm'));
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value);
  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value);

  const canSubmit = !!location && !!description && !!eventName && addRequestStatus === 'idle';
  const handleSubmit = () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewEvent({
          name: eventName,
          host: currentUser.id,
          location: location,
          description: description,
          startDate: date, //new Date(date),
          startTime: time,
          user: {
            id: currentUser.id,
            name: currentUser.name,
          }
        })).unwrap();
      } catch (error) {
        console.error('Failed to save event', error);        
      } finally {
        dispatch(setView('list'));
        setAddRequestStatus('idle');
      }
    }
  };

  return currentUser.name.length ?
    (
      <Form style={{ marginBottom: '0.2rem'}}>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
          <Form.Label>Event Name</Form.Label>
          <Form.Control className='bootstrap-textbox' type="text" placeholder="What is the name of your event?"
            onChange={onNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
          <Form.Label>Location </Form.Label>
          <Form.Control className='bootstrap-textbox' type="text" placeholder="address" 
            onChange={onLocationChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control className='bootstrap-textbox' as="textarea" placeholder="describe your event in one or two sentences" rows={3} 
            onChange={onDescriptionChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput3">
              <Form.Label>Date</Form.Label>

              <Form.Control className='bootstrap-textbox' type="date" 
                onChange={onStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput4">
              <Form.Label>Time</Form.Label>

              <Form.Control className='bootstrap-textbox' type='time' 
                onChange={onTimeChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className='bootstrap-button' variant="primary" type="submit" disabled={!canSubmit}
          onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    ) : <LoginPrompt/>;
};

export default CreateEvent;
