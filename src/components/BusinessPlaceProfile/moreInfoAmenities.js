import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import MoreInfoList from './moreInfoList';

const BusinessLanguagesUpdate = props => {
  const {navigation, amenities, place} = props;

  const runDone = navigation.getParam('runDone');
  const getAmenities = () => {
    return amenities.filter(item => item.label !== 'Client type');
  };
  const getSelectedAmenities = () => {
    return place.amenities.filter(item => item.label !== 'Client type');
  };

  return (
    <MoreInfoList
      dataList={getAmenities()}
      selectedDataList={getSelectedAmenities()}
      runDone={runDone}
      dataLabel="info"
      addNewLine="Can’t find something?"
      pageName="amenity"
      label="Amenity"
      suggestionDescription="If you weren't able to find an amenity available at your premises add it to our database!"
    />
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    place: state.business.place,
    languages: state.app.languages,
    amenities: state.app.amenities,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessLanguagesUpdate);
