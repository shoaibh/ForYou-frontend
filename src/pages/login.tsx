// import { useAuth } from "../utils/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { BsTelephoneFill, BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { auth, db } from "../firebase.config.ts";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/AuthProvider.tsx";
import { doc, setDoc } from "firebase/firestore";

export const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaContainer!,
        {
          size: "invisible",
          callback: () => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        setLoading(false);
        console.log("==", { res });

        const date = new Date().getTime();
        const displayName = `user_${date}`;

        await updateProfile(res.user, {
          displayName,
        });
        // //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          phoneNumber: res.user.phoneNumber
        });

        // //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <section className="bg-emerald-500 flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>

          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props: any) => <input {...props} />}
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
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
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
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
