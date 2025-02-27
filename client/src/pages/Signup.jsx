import { auth } from '../appwrite/auth';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CustomButton } from '../components';
import { useStateContext } from '../context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const Signup = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setAuthState } = useStateContext();
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        username:Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    
    const defaultValues = {
        username:'',
        email: '',
        password: '',
    };
    
    const handleSubmit = async (data, { setSubmitting }) => {
        try {
            setIsSubmitting(true);
            setErrorMessage('');

            // Check if a session already exists and log out
            const session = await auth.getSession();
            if (session) {
                await auth.logout();
            }

            const { email, password, username } = data;
            const sessionNew = await auth.register({ email, password, username });

            if (sessionNew) {
                // Store session in cookies
                Cookies.set('session', JSON.stringify(sessionNew), { expires: 7, secure: true });

                setAuthState({ isLoggedIn: true, user: sessionNew });
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
            setSubmitting(false);
        }
    };
    
    return (
        <div className='w-full h-full flex justify-center'>
            <Formik
                initialValues={defaultValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ isSubmitting: formikSubmitting, errors, touched }) => (
                    <Form className='flex flex-col rounded-lg gap-8  h-[380px] w-96 justify-center items-center p-4'>
                        <div>
                            <span className='text-white font-bold text-4xl text-epilogue'>Signup</span>
                        </div>
                        
                        
                        {errorMessage && (
                            <div className="text-red-300 text-sm text-center w-full">
                                {errorMessage}
                            </div>
                        )}

                        <div className="w-full flex flex-col">
                            <Field
                                placeholder='Username'
                                type='text'
                                className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
                                name='username'
                            />
                            {errors.email && touched.email && (
                                <span className="text-red-500 text-sm self-start mt-1">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        
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
                            title={(isSubmitting || formikSubmitting) ? 'Signing Up...' : 'Submit Now'}
                            styles="bg-purple-400 text-white"
                            disabled={isSubmitting || formikSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;