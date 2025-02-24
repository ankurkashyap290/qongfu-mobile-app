import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageLayout from '../../layout/PageLayout';
import LifestyleAndQongfuUpdate from '../LifestyleAndQongfus/LifestyleAndQongfuUpdate';

const BusinessLifestylesAndQongfuUpdate = props => {
  const {businessUpdateStatus, error, place, navigation, loading} = props;

  const runDone = navigation.getParam('runDone');

  return (
    <PageLayout>
      <LifestyleAndQongfuUpdate
        selectedLifestylesData={place.lifestyles}
        selectedQongfusData={place.qongfus}
        runDone={runDone}
        buttonText="Confirm"
        pageName="businessPlace"
        error={error}
        updateStatus={businessUpdateStatus}
        loading={loading}
      />
    </PageLayout>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    place: state.business.place,
    loading:
      state.business.loading['update-place-lifestyles-and-qongfus'] || false,
    error: state.business.error['update-place-lifestyles-and-qongfus'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus[
        'update-place-lifestyles-and-qongfus'
      ] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessLifestylesAndQongfuUpdate);
