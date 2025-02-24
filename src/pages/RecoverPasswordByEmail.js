import React from 'react';
import SendOTPByEmail from '../components/auth/SendOTPByEmail';

const RecoverPasswordByEmail = () => {
  return (
    <SendOTPByEmail
      mode="passwordReset"
      title="Password Reset"
      subTitle="Enter your registered email ID."
    />
  );
};

export default RecoverPasswordByEmail;
