
import React from "react";
import { useAppDispatch,useAppSelector } from '../../app/hooks';
import { setAuth } from "../../app/store/auth";
import { setCurrentPerson } from "../../app/store/currentPerson";

const Main: React.FC = () => {

  const verifyToken = useAppSelector(state => state.auth.verifyToken)
  const currentPerson = useAppSelector(state => state.currentPerson)
  const dispatch = useAppDispatch()

  const exitHandler = () => {
    dispatch(setAuth(""));
    dispatch(setCurrentPerson({firstName: "",lastName: ""}));
  }

  return (
    <div dir='rtl' className="text-right">
      <div className="text-center">صفحه اصلی</div>
      <div className="m-2 p-1">
        {
          !verifyToken ? <div>شما وارد سایت نشده اید، برای مشاهده اطلاعات جداول محصولات باید ابتدا وارد سایت شوید (از token آن استفاده مشود)</div>
            : (
              <>
                <div>کاربر {currentPerson.firstName} {currentPerson.lastName} شما وارد سایت شدید</div>
                <button onClick={exitHandler}
                  className="p-3 rounded-sm  text-center text-violet-500 font-bold drop-shadow border border-violet-500 hover:text-violet-600 active:text-violet-700 focus:ring focus:ring-violet-300  mx-1">
                    خروج از سایت (پاک کردن token و اطلاعات کاربر)
                </button>
              </>
            )

        }
      </div>
    </div>
  )
}

export default Main;