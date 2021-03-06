import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userProfileReducer from './features/userProfile/userProfileSlice';
import infoReducer from './features/info/infoSlice';
import jobsReducer from './features/jobs/jobSlice';
import { mapReducer } from './features/map/mapSlice';
import communityEventsReducer from './features/events/eventsSlice';
import petPlantReducer from './features/petPlant/petPlantSlice';
import chatReducer from './features/chat/chatSlice';



export const store = configureStore({
  reducer: {
    events: communityEventsReducer,
    userProfile: userProfileReducer,
    info: infoReducer,
    job: jobsReducer,
    map: mapReducer,
    petPlant: petPlantReducer,
    chat: chatReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
