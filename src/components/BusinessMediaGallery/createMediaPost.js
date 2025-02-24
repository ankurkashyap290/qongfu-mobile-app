import React from 'react';
import {Text} from 'react-native';
import styles from '../../styles/mediaGallery.style';
import PageLayout from '../../layout/PageLayout';
import MediaPost from './MediaPost';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const CreateMediaPost = ({isParentScrollDisabled}) => {
  return (
    <PageLayout scrollDisabled={isParentScrollDisabled}>
      <MediaPost mode="create" />
      <Text style={styles.addingPostText}>
        By adding, only You can see your{'\n'} post until you publish it.
      </Text>
    </PageLayout>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    isParentScrollDisabled: state.app.isParentScrollDisabled,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateMediaPost);
