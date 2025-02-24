import React from 'react';
import SendOTP from '../components/auth/SendOTP';

const RecoverPasswordByPhone = () => {
  return (
    <SendOTP
      mode="passwordReset"
      title="Password Reset"
      subTitle="Enter your registered mobile number."
    />
  );
};

export default RecoverPasswordByPhone;
