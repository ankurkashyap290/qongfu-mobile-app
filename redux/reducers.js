// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import userReducer from './user/reducer';
import appReducer from './app/reducer';
import mapReducer from './map/reducer';
import ratingsReducer from './ratings/reducer';
import placesReducer from './places/reducer';
import friendsReducer from './friends/reducer';

import businessReducer from './business/reducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  map: mapReducer,
  ratings: ratingsReducer,
  places: placesReducer,
  business: businessReducer,
  friends: friendsReducer,
});
// Exports
export default rootReducer;
