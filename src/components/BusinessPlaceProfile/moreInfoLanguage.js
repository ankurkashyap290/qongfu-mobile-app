import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import MoreInfoList from './moreInfoList';

const BusinessLanguagesUpdate = props => {
  const {languages, place, navigation} = props;

  const runDone = navigation.getParam('runDone');

  return (
    <MoreInfoList
      dataList={languages}
      selectedDataList={place.languages}
      runDone={runDone}
      dataLabel="language"
      addNewLine="Can’t find your language?"
      pageName="language"
      label="Language"
      suggestionDescription="If you weren't able to find a language you speak, help us to add it to our database"
    />
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    languages: state.app.languages,
    place: state.business.place,
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
