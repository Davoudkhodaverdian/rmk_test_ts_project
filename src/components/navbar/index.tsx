
import React from "react";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {

    return (
        <div dir='rtl' className="text-right">
            <div className='flex bg-slate-50 shadow justify-between'>
                <div className='p-1 mx-3  '>
                    <div className="flex justify-center items-center">
                            <img src='images/svg/logo.svg' className="h-10" alt="logo" />
                            <Link className="px-3" to={`/`}>صفحه اصلی</Link>
                            <Link className="px-3" to={`/login`}>صفحه لاگین</Link>
                    </div>
                </div>
                
                <div className='p-1 pl-3'>
                </div>
            </div>
        </div>
    )
}

export default Navbar;