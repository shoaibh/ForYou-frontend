import toast, { Toaster } from "react-hot-toast";
import { BsFillShieldLockFill, BsHeadphones } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import { useAuth } from "@/utils/AuthProvider.tsx";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config.ts";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/api/request.ts";

export const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const navigate = useNavigate();

  const { currentUser, dispatch } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/profile-songs");
    }
  }, [currentUser]);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer!, {
        size: "invisible",
        callback: () => {
          onSignup();
        },
        "expired-callback": () => {},
      });
    }
  }

  const { mutateAsync: onSignup, isPending: otpSending } = useMutation({
    mutationFn: async () => {
      onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+" + ph;

      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOTP(true);
      toast.success("OTP sended successfully!");
    },
    onError: (e) => console.log(e),
  });

  const { mutateAsync: onOTPVerify, isPending: otpVerifying } = useMutation({
    mutationFn: async () => {
      const result = await window.confirmationResult.confirm(otp);

      await request("/api/user", {
        phoneNumber: result.user.phoneNumber,
        firebaseUserUUID: result.user.uid,
        meta: { ...result.user.metadata, photoURL: result.user.photoURL },
      });

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        phoneNumber: result.user.phoneNumber,
      });

      await setDoc(doc(db, "userChats", result.user.uid), {});
      dispatch({ type: "CHANGE_USER", user: result.user });
      navigate("/profile-songs");
    },
    onError: (e) => console.log(e),
  });

  const isLoading = otpSending || otpVerifying;

  return (
    <>
      <section className="bg-white flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-violet-500 text-white w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className=" text-xl text-black text-center">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span style={{ width: "5px" }}></span>}
                  renderInput={(props: any) => <input {...props} />}
                  containerStyle="justify-center"
                  inputStyle="text-black border-b border-black border-solid"
                />
                <button
                  onClick={() => onOTPVerify()}
                  className="bg-violet-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-violet-500 w-fit mx-auto p-4 rounded-full">
                  <BsHeadphones size={150} />
                </div>
                <label htmlFor="" className="font-bold text-xl text-white text-center">
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={() => onSignup()}
                  className="bg-violet-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {isLoading && <CgSpinner size={20} className="mt-1 animate-spin" />}
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
