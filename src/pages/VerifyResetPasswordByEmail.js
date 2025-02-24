import React from 'react';
import ConfirmOTP from '../components/auth/ConfirmOTP';

const VerifyResetPasswordByEmail = () => {
  return <ConfirmOTP mode="passwordReset" resetType="email" />;
};

export default VerifyResetPasswordByEmail;
