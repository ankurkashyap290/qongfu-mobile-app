import React from 'react';
import SuccessModal from '../auth/mobileConfirmSuccess';
import * as NavigationService from '../../navigators/NavigationService';
const SignupSuccess = () => {
  return (
    <SuccessModal
      title="Get moving with Qongfu"
      subTitle={
        'You mobile number is confirmed. Please setup your Qongfu account next.'
      }
      onDone={() => NavigationService.navigate('Step1')}
    />
  );
};

export default SignupSuccess;
