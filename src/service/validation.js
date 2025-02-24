
export const EMAIL_VALIDATION={
    required:'Email is required',
    pattern:{
      value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
      message:'Email is invalid'
    }
  }

  export const PASSWORD_VALIDATION = {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
      message: 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character'
    }
  };

  export const USERNAME_VALIDATION = {
    required: 'UserName is required',
    minLength: {
      value: 3,
      message: 'UserName must be at least 3 characters'
    },
    pattern: {
      value: /^[A-Za-z]+\d+$/, 
      message: 'UserName must contain letters and end with numbers without spaces'
    }
  };
  

  export const COUNTRY_VALIDATION={
    required: 'Country is required',
    minLength: {
      value: 3,
      message: 'Country must be at least 3 characters'
    }
  }

  export const PHONE_VALIDATION={
    required: 'Phone is required',
    pattern: {
      value: /^01(0|1|2)[0-9]{8}$/,
      message: 'Phone is invalid must start with (011-012-010)'
    },
    maxLength: {
      value: 11,
      message: 'Phone must be at 11 characters'
    }
  }

  export const OTP_VALIDATION={
    required: 'Otp is required',
    maxLength: {
      value: 6,
      message: 'Otp must be at 6 characters'
    },
  }

