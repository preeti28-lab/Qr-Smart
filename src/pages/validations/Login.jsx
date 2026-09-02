import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdOutlineFacebook } from "react-icons/md";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/validationSchema";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/features/auth";
import createAxiosInstance from "../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";
import usePath from "../../hooks/usePath";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/user";
import { LoginSocialFacebook } from "reactjs-social-login";
import ForgotPasswordModal from "./ForgetPassModal";
import HeroWaves from "../../components/ui/HeroWaves";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = createAxiosInstance();
  const location = useLocation();

  const { lastPage } = useSelector((state) => state.dashboard);

  const path = usePath();
  const [previousUrl, setPreviousUrl] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setPreviousUrl(document.referrer);
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async (payload) => {
    try {
      const response = await axiosInstance.post(
        "/qr-auth/login/admin",
        payload,
      );
      const token = response.data.token;

      if (token) {
        const user = jwtDecode(token);
        const userData = user;
        dispatch(
          setToken({
            token,
            isAuthenticated: true,
            role: userData?.role ? userData?.role : null,
            userId: userData?.id,
          }),
        );
        dispatch(setUser({ userData }));

        toast.success("Login Successfull", {
          position: "top-right",
          autoClose: 2000,
        });

        if (location?.state?.monthSelected) {
          navigate(`/checkout`, {
            state: { selectedMonth: location?.state?.monthSelected },
          });
        } else {
          navigate(`/builder`);
        }
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data.message;
      }

      toast.warning(message, {
        position: "top-right",
        autoClose: 7000,
      });
    }
  };

  const currentYear = new Date().getFullYear();

  const authloginHandler = async (payload) => {
    try {
      const response = await axiosInstance.post("/user/loginViaOauth", payload);
      const token = response.data.token;

      if (token) {
        const user = jwtDecode(token);
        const role = user.foundUser.profile;
        const paidPlan = user.foundUser.paidPlan;
        const trialPlanUsed = user.foundUser.trialPlanUsed;
        const userId = user.foundUser._id;
        const userData = user.foundUser;
        const abilityUser = user.foundUser;
        const ability = {
          departments: abilityUser?.userDepartment,
          profile: abilityUser?.profile,
        };

        dispatch(
          setToken({
            token,
            isAuthenticated: true,
            role: user.foundUser.profile ? user.foundUser.profile : null,
            ability: ability,
            paidPlan: paidPlan,
            trialPlanUsed: trialPlanUsed,
            userId: userId,
          }),
        );

        dispatch(setUser({ userData }));
        navigate(`/builder/content`);
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data.message;
      }

      toast.warning(message, {
        position: "top-right",
        autoClose: 7000,
      });
    }
  };

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse?.credential) {
      const token = credentialResponse?.credential;
      const user = jwtDecode(token);
      const payload = {
        name: user?.name,
        email: user?.email,
      };
      authloginHandler(payload);
    }
  };

  const handleError = () => {
    console.log("error i");
  };

  const goToRegister = () => {
    if (location?.state?.monthSelected) {
      navigate(`/register`, {
        state: { selectedMonth: location?.state?.monthSelected },
      });
    } else {
      navigate(`/register`);
    }
  };

  const shell = (hasError) =>
    `flex items-center gap-3 rounded-xl border bg-white p-2.5 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
      hasError ? "border-rose-300" : "border-slate-200"
    }`;

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-[#eef2f9] p-3 md:p-6">
        <div className="grid max-h-full w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,0.5)] lg:grid-cols-2">
          {/* ── Left: brand panel ── */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#f7f9ff] via-[#f4f6fd] to-[#eceafb] p-10 lg:flex">
            <HeroWaves />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-[340px] w-[340px] rounded-full bg-violet-200/40 blur-3xl" />

            <Link to="/" className="relative">
              <span className="qr-logo text-3xl font-black uppercase tracking-tight text-slate-900">
                QR<span className="qr-logo pl-1 text-[#1578bc]">Smart</span>
              </span>
            </Link>

            <div className="relative flex flex-1 items-center justify-center py-8">
              <img
                src="/logo.png"
                alt="QR Smart"
                className="w-[74%] select-none object-contain"
                draggable="false"
              />
            </div>

            <div className="relative">
              <h2 className="text-[30px] font-bold leading-tight text-slate-900">
                Smart <span className="text-blue-600">QR</span> Solutions
              </h2>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-slate-500">
                Generate, manage and track QR codes with ease and efficiency.
              </p>
            </div>
          </div>

          {/* ── Right: form panel ── */}
          <div className="flex min-h-0 flex-col bg-white">
            <div className="flex flex-1 flex-col justify-center px-6 py-4 md:px-10 md:py-6">
              {/* mobile brand */}
              <Link to="/" className="mb-4 inline-block lg:hidden">
                <span className="qr-logo text-2xl font-black uppercase tracking-tight text-slate-900">
                  QR<span className="qr-logo pl-1 text-[#1578bc]">Smart</span>
                </span>
              </Link>

              {/* <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[14px] font-semibold text-blue-600">
                Welcome back! 👋
              </span> */}

              <h1 className="mt-3 text-[26px] font-bold text-slate-900 md:text-[30px]">
                Log in to your account
              </h1>
              <p className="mt-2 text-[14.5px] text-slate-500">
                Enter with your networks or complete your data
              </p>

              <form
                onSubmit={handleSubmit(loginHandler)}
                className="mt-4 flex w-full flex-col"
              >
                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div className={shell(errors?.email)}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <FiMail size={18} />
                      </span>
                      <input
                        {...field}
                        type="email"
                        placeholder="Enter your email here..."
                        className="w-full bg-transparent pr-2 text-[14.5px] text-slate-800 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  )}
                />
                {errors?.email?.message && (
                  <p className="mt-1.5 text-[13px] text-rose-600">
                    {errors.email.message}
                  </p>
                )}

                {/* Password */}
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div className={`mt-4 ${shell(errors?.password)}`}>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <FiLock size={18} />
                      </span>
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password here..."
                        className="w-full bg-transparent text-[14.5px] text-slate-800 outline-none placeholder:text-slate-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="shrink-0 px-2 text-slate-400 transition-colors hover:text-slate-600"
                      >
                        {showPassword ? (
                          <FiEye size={18} />
                        ) : (
                          <FiEyeOff size={18} />
                        )}
                      </button>
                    </div>
                  )}
                />
                {errors?.password?.message && (
                  <p className="mt-1.5 text-[13px] text-rose-600">
                    {errors.password.message}
                  </p>
                )}

                {/* Remember / forgot */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-[14px] font-medium text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.8)] transition-opacity hover:opacity-95"
                >
                  <span className="flex-1 text-center">Log In</span>
                  <FiArrowRight size={18} />
                </button>

                {/* Divider */}
                <div className="my-4 flex w-full items-center gap-x-4">
                  <div className="h-px w-full bg-slate-200" />
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-[12px] font-medium text-slate-500">
                    OR
                  </span>
                  <div className="h-px w-full bg-slate-200" />
                </div>

                {/* Social */}
                <div className="flex justify-center flex-col mt-3 gap-y-4 sm:flex-row w-full gap-x-3 items-center">
                  <GoogleOAuthProvider clientId="496475122024-lfk0n5e02vtkf34ki12ahvjd0bijo005.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                  </GoogleOAuthProvider>
                  <LoginSocialFacebook
                    appId="1609597339923754"
                    onResolve={(response) => console.log(response)}
                    onReject={(error) => console.log(error)}
                  >
                    <div className="bg-[#3b5999] border cursor-pointer border-[#dadce0] min-h-[39px] rounded-[3px] flex justify-center w-full sm:w-auto items-center gap-x-2 text-blue-700 p-1">
                      <MdOutlineFacebook size={20} color="white" />
                      <span
                        className="text-white text-[14px]"
                        style={{ fontFamily: '"Google Sans", Arial, sans-serif' }}
                      >
                        Sign in with facebook
                      </span>
                    </div>
                  </LoginSocialFacebook>
                </div>

                {/* Register */}
                <p className="mt-4 text-center text-[14px] text-slate-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={goToRegister}
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                  >
                    Create an account
                  </button>
                </p>
              </form>
            </div>

            {/* Footer strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-3 md:px-10">
              <div className="flex items-center gap-2.5">
                <FiShield size={20} className="shrink-0 text-slate-400" />
                <div>
                  <p className="text-[13px] font-semibold text-slate-700">
                    Secure Login
                  </p>
                  <p className="text-[12.5px] text-slate-400">
                    Your data is 100% protected
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[13px] font-medium text-slate-500">
                  {currentYear} © QRSMART
                </p>
                <p className="text-[12.5px] text-slate-400">
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ForgotPasswordModal
        open={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </>
  );
};

export default Login;
