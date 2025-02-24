import React, {useEffect} from 'react';
import PageLayout from '../../layout/PageLayout';
import AddMediaSection from './addMediaSection';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getMediaPost} from '../../../redux/places/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import MediaPost from './MediaPost';

const UpdateMediaPost = ({
  navigation,
  postLoading,
  getMediaPost,
  token,
  mediaPost,
  isParentScrollDisabled,
}) => {
  const postId = navigation.getParam('postId');
  useEffect(() => {
    if (postId && !isLoadedPost()) {
      setTimeout(() => {
        getMediaPost(postId, token);
      }, 500);
    }
  }, [postId]);
  const isLoadedPost = () => {
    if (!postLoading && mediaPost && mediaPost.id === postId) {
      return true;
    }
    return false;
  };
  return (
    <PageLayout scrollDisabled={isParentScrollDisabled}>
      <GlobalOverlayLoading loading={postLoading} textContent="" />
      {isLoadedPost() ? <MediaPost mode="update" /> : null}
    </PageLayout>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    mediaPost: state.places.mediaPost,
    postLoading: state.places.loading['getPost'] || false,
    isParentScrollDisabled: state.app.isParentScrollDisabled,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getMediaPost}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMediaPost);
