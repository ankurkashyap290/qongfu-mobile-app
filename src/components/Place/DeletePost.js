import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Portal, Dialog, Button} from 'react-native-paper';
import styles from '../../styles/mediaGallery.style';
import theme from '../../styles/theme.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  deletePlaceMedia,
  resetUpdatedStatusFlag,
} from '../../../redux/places/actions';
import CustomAlert from '../custom/customAlert';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
const DeletePost = ({
  post,
  visible,
  toggleDeleteModal,
  token,
  deletePlaceMedia,
  resetUpdatedStatusFlag,
  deleteLoading,
  deleteError,
  deleteStatus,
}) => {
  useEffect(() => {
    if (deleteStatus) {
      resetUpdatedStatusFlag('deletePost');
      toggleDeleteModal(false, true);
    }
  }, [deleteStatus]);

  const handlePostDelete = () => {
    deletePlaceMedia(post.id, token);
  };
  return (
    <React.Fragment>
      <GlobalOverlayLoading loading={deleteLoading} textContent="" />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            toggleDeleteModal(false, false);
          }}
          style={{padding: 16, borderRadius: 16}}>
          <Text style={styles.deleteHeading}>Delete this post</Text>
          <Text style={styles.deleteText}>
            This post will be permanently deleted from your media gallery
          </Text>
          {deleteError && <CustomAlert error={deleteError} />}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
              marginTop: 16,
            }}>
            <Button
              mode="contained"
              style={styles.deleteButton}
              labelStyle={styles.deleteButtonLabel}
              onPress={() => {
                handlePostDelete();
              }}>
              Delete
            </Button>
            <Button
              mode="contained"
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonLabel}
              onPress={() => {
                toggleDeleteModal(false, false);
              }}>
              Cancel
            </Button>
          </View>
        </Dialog>
      </Portal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    token: state.user.token,
    deleteLoading: state.places.loading['deletePost'] || false,
    deleteError: state.places.error['deletePost'] || false,
    deleteStatus: state.places.updatedStatus['deletePost'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      deletePlaceMedia,
      resetUpdatedStatusFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DeletePost);
