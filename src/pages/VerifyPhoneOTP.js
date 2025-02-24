import React from 'react';
import ConfirmOTP from '../components/auth/ConfirmOTP';

const VerifyPhoneOTP = () => {
  return <ConfirmOTP mode="phoneVerify" resetType="sms" />;
};

export default VerifyPhoneOTP;
