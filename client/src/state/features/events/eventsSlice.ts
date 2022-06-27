import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
// import { RootState } from '../../store';

//! REFACTOR: Async THUNK

interface Event {
  id: number;
  name: string;
  host: number;
  location: string;
  description: string;
  event_comments: Array<{
    id: number;
    comment: string;
    user: {
      name: string;
      image: string;
    };
  }>;
  event_participants: Array<{
    id: number;
    user: {
      name: string;
      image: string;
    };
  }>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}



const initialState: any = {
  view: 'list',
  events: [],
  event: {
    name: '',
    host: 0,
    location: '',
    description: '',
    event_comments: [],
    event_participants: [],
    startDate: new Date(),
    startTime: new Date(),
  },
  upcomingEvents: [], //check to see how this is connected? I'm still not sure how
};

//Thunk Action Creator
export const fetchUpcomingEvents = createAsyncThunk(
  'events/upcomingEvents',
  async () => {
    const response = await axios.get('/api/events/all');
    //console.log('42 response from backend', response);
    const upcomingEvents = response.data.filter((event : {startDate: Date}) => {
      const currentDate = moment();//'2022-06-03'
      //console.log('current date backend', currentDate);
      //returning endDates that have not yet surpassed the currentDate
      return moment(event.startDate).isAfter(currentDate);
    });
    console.log('backend', upcomingEvents);
    return upcomingEvents;
  }
);


export const communityEventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {

    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
      return state;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      return state;
    },
    setEventObj: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
      // console.log(state.event);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
      //console.log('event action 104', action);
      state.upcomingEvents = action.payload;
    });
  }
});

export const { setView, setEvents, setEventObj } =
  communityEventsSlice.actions;

export default communityEventsSlice.reducer;
