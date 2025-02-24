import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogout} from '../../redux/user/actions';

const Logout = ({loading, userLogout, token}) => {
  useEffect(() => {
    userLogout(token);
  }, []);
  return <ActivityIndicator />;
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userLogout,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
