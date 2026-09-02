import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        // .min(6, 'Password must be at least 6 characters long')
        // .max(20, 'Password cannot exceed 20 characters')
        // .matches(
        //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must include an uppercase letter, a lowercase letter, a number, and a special character'
        // ),
});

export const otpSchema = yup.object().shape({
    otp: yup.string().required('OTP is required.'),
})