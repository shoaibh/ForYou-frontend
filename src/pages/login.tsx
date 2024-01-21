// import { useAuth } from "../utils/AuthProvider";
// import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BsFillShieldLockFill, BsHeadphones, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import { useAuth } from "@/utils/AuthProvider.tsx";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useMutation} from "@tanstack/react-query"

export const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(true);

  const navigate = useNavigate();

  // const {mutateAsync} = useMutation()

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const onSignup = async () => {
    setLoading(true);


    const formatPh = "+" + ph;

    try {
      // Assuming phoneNumber is set by an input field
      await axios.post('http://localhost:3000/api/otp/send', { formatPh });
      setShowOTP(true)
      toast.success("OTP sent successfully")
    } catch (error) {
      console.error('Error in sending OTP:', error);
      toast.error(`Error in sending OTP: ${error}`);
    } finally {
      setLoading(false)
    }
  }

  const onOTPVerify = async () => {
    setLoading(true);

    const formatPh = "+" + ph;

    try {
      const response = await axios.post('http://localhost:3000/api/otp/verify', { formatPh, code: otp });
      if (response.data.success) {
        toast.success("OTP verified successfully")

        /*
        if profile exists in database then navigate to home otherwise
        navigate to profile making page.
        */
        navigate('/profile')
        // navigate('/home');
      } else {
        alert('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in verifying OTP:', error);
      toast.error(`Error in verifying OTP: ${error}`);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-white flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />

          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-violet-500 text-white w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className=" text-xl text-black text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span style={{width:"5px"}}></span>}
                  renderInput={(props: any) => <input {...props} />}
                  containerStyle="justify-center"
                  inputStyle="text-black border-b border-black border-solid"
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-violet-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-violet-500 w-fit mx-auto p-4 rounded-full">
                  <BsHeadphones size={150} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-violet-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span id="sign-in-button">Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
