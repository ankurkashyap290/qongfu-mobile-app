import React from 'react';
import SendOTP from '../components/auth/SendOTP';

const ConfirmPhone = () => {
  return (
    <SendOTP
      mode="phoneVerify"
      title={`Get moving with\nQongfu`}
      subTitle="Choose your country code and enter your mobile number. We will send an OTP to confirm if your number is valid."
    />
  );
};

export default ConfirmPhone;
