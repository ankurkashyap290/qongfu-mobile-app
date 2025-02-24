import React, {useEffect} from 'react';
import {View} from 'react-native';
import HeaderLogoRow from '../Place/HeaderLogoRow';
import PlaceInfo from '../Place/PlaceInfo';
import LogoAndCoverHeader from './LogoAndCoverHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const Header = ({
  isAdmin,
  showPlaceInfo,
  place,
  token,
  updatePlace,
  resetBusinessUpdateStatus,
  updateMediaLoading,
  updateMediaError,
  updateMediaStatus,
  progressPercentage,
}) => {
  useEffect(() => {
    if (updateMediaStatus) {
      resetBusinessUpdateStatus('update-place-media');
    }
  }, [updateMediaStatus]);

  const handleUpdateMedia = (updateType, mediaPayload) => {
    updatePlace(mediaPayload, token, 'media');
  };

  return (
    <React.Fragment>
      <GlobalOverlayLoading
        loading={updateMediaLoading}
        textContent={updateMediaLoading ? progressPercentage : ''}
      />
      <LogoAndCoverHeader
        place={place}
        totalReviews={0}
        isAdmin={isAdmin}
        onCoverUpdate={handleUpdateMedia}
      />
      <View
        style={{
          elevation: 1,
          marginBottom: 10,
          flexDirection: 'column',
        }}>
        <HeaderLogoRow
          place={place}
          isAdmin={isAdmin}
          onLogoUpdate={handleUpdateMedia}
        />
        {showPlaceInfo ? <PlaceInfo place={place} isAdmin={isAdmin} /> : null}
      </View>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    updateMediaLoading: state.business.loading['update-place-media'] || false,
    updateMediaError: state.business.error['update-place-media'] || '',
    updateMediaStatus:
      state.business.businessUpdateStatus['update-place-media'] || false,
    progressPercentage: state.business.progressPercentage || 0,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updatePlace,
      resetBusinessUpdateStatus,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
