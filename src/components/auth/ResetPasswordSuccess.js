import React from 'react';
import SuccessModal from './mobileConfirmSuccess';
import * as NavigationService from '../../navigators/NavigationService';
const ResetPasswordSuccess = () => {
  return (
    <React.Fragment>
      <SuccessModal
        title="Password Updated!"
        onDone={() => NavigationService.navigate('SignIn')}
        mode="passwordUpdate"
      />
    </React.Fragment>
  );
};

export default ResetPasswordSuccess;
