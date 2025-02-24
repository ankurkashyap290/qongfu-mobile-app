import React from 'react';
import ConfirmOTP from '../components/auth/ConfirmOTP';

const VerifyResetPasswordByPhone = () => {
  return <ConfirmOTP mode="passwordReset" resetType="sms" />;
};

export default VerifyResetPasswordByPhone;
