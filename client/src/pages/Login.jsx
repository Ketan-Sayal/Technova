import { auth } from '../appwrite/auth';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../components';
import { useStateContext } from '../context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setAuthState } = useStateContext();
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    
    const defaultValues = {
        email: '',
        password: '',
    };
    
    const handleSubmit = async (data, { setSubmitting }) => {
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            
            let session = await auth.getSession();
    
            if (!session) {
                const { email, password } = data;
                session = await auth.login({ email, password });
            }
            
            Cookies.set('session', JSON.stringify(session), { expires: 7, secure: true });

            setAuthState({ isLoggedIn: true, user: session });
            navigate('/');
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            setIsSubmitting(true);
            setErrorMessage('');
            await auth.googleAuth();
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'Google login failed. Please try again.');
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className='absolute inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col'>
            <Formik
                initialValues={defaultValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting: formikSubmitting, errors, touched }) => (
                    <Form className='flex flex-col rounded-lg gap-8 h-[450px] w-[405px] items-center p-4'>
                        <div>
                            <span className='text-white font-bold text-4xl text-epilogue'>Login</span>
                        </div>
                        
                        {errorMessage && (
                            <div className="text-red-300 text-sm text-center w-full">
                                {errorMessage}
                            </div>
                        )}
                        
                        <div className="w-full flex flex-col">
                            <Field
                                placeholder='Email'
                                type='email'
                                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
                                name='email'
                            />
                            {errors.email && touched.email && (
                                <span className="text-red-500 text-sm self-start mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        
                        <div className="w-full flex flex-col">
                            <Field
                                placeholder='Password'
                                type='password'
                                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
                                name='password'
                            />
                            {errors.password && touched.password && (
                                <span className="text-red-500 text-sm self-start mt-1">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        
                        <CustomButton
                            btnType="submit"
                            title={(isSubmitting || formikSubmitting) ? 'Logging in...' : 'Submit Now'}
                            styles="bg-purple-400 text-white"
                            disabled={isSubmitting || formikSubmitting}
                        />
                        
                        <div className="w-full flex items-center justify-center">
                            <div className="border-t border-[#3a3a43] w-full"></div>
                            <span className="text-white mx-2">or</span>
                            <div className="border-t border-[#3a3a43] w-full"></div>
                        </div>
                        
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 w-full py-[15px] rounded-[10px] border border-[#3a3a43] bg-transparent hover:bg-[#1f1f23] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            <span className="text-white text-[14px] font-epilogue">Continue with Google</span>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;