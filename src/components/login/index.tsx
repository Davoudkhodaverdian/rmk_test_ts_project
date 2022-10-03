
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setAuth } from "../../app/store/auth";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "../loading";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login: React.FC = () => {

    useEffect(() => {

    }, [])

    // const verifyToken = useAppSelector(state => state.auth.verifyToken)
    // console.log(verifyToken);
    // const dispatch = useAppDispatch()
    // dispatch(setAuth(""));

    const validationSchema = Yup.object({
        username: Yup.string().required('نام کاربری وارد نشده'),
        password: Yup.string().required('رمز عبور وارد نشده'),
    })

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className="w-full flex justify-center items-center h-[100vh]">
            <div className="bg-gray-100 shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:max-w-[500px] border border-gray-300">
                <div className="mb-4">ورود</div>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                        try {
                            setLoading(true)
                            console.log(values)
                            const response = await axios.post("https://dummyjson.com/auth/login", values)
                            //navigate('/', { replace: true });
                            console.log(response)
                            actions.resetForm();
                            setLoading(false)
                            toast.success(<span className="font-yekan">{'شما با موفقیت وارد شدید'}</span>, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } catch (error) {
                            
                            setLoading(false)
                            toast.error(<span className="font-yekan">{`چنین کاربری وجود ندارد: ${error}`}</span>, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }

                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                                    نام کاربری
                                </label>
                                <input id="username" type="text"
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-grey-darker"
                                    placeholder="نام کاربری را وارد کنید" {...formik.getFieldProps('username')} />
                                {formik.touched.username && formik.errors.username ? (<div className="text-sm text-red-600 my-2">{formik.errors.username}</div>) : null}
                            </div>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                                    رمز عبور
                                </label>
                                <input id="password" type="password"
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-grey-darker"
                                    placeholder="رمز عبور را وارد کنید" {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password ? (<div className="text-sm text-red-600 my-2">{formik.errors.password}</div>) : null}
                            </div>
                            <Link to="/">
                                    <button type="submit" name="submit"
                                        className="px-3 rounded text-white text-center bg-red-500 font-bold drop-shadow hover:bg-red-600 active:bg-red-700 focus:ring focus:ring-red-300  mx-1">
                                        بازگشت
                                    </button>
                            </Link>
                            <button type="submit" name="submit"
                                className="px-3 rounded text-white text-center bg-violet-500 font-bold drop-shadow hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300  mx-1">
                                ورود
                            </button>
                            {loading && <Loading text={"در حال ارسال اطلاعات ..."} />}
                        </form>
                    )}
                </Formik>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )


}

export default Login;