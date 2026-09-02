import React, { useState } from "react";
import InputField from "../../components/fields/InputField";
import { useForm } from "react-hook-form";
import MyButton from "../../components/buttons/MyButton";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineFacebook } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
// validations
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, otpSchema } from "../../schema/validationSchema";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import createAxiosInstance from "../../config/axiosConfig";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { setToken } from "../../redux/features/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user";
import { LoginSocialFacebook } from "reactjs-social-login";
import OnboardingSuccessModal from "../../components/ui/OnboardSuccessModal";

const Register = () => {
  const dispatch = useDispatch();
  const [isOTP, setIsOTP] = useState(false);
  const axiosInstance = createAxiosInstance();
  const navigate = useNavigate();

  const location = useLocation();

  // ── Onboarding modal state ──────────────────────────────────────────────────
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredName, setRegisteredName] = useState("");
  // ───────────────────────────────────────────────────────────────────────────

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  // Sign Up form
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // OTP form
  const {
    control: controlOTP,
    formState: { errors: errorsOTP },
    handleSubmit: handleOTP,
    reset: resetOTP,
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle Sign Up form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/qr-auth/register/admin",
        data,
      );
      if (response.status === 201) {
        const message = response?.data?.message || "User Created Successfully";
        toast.success(message, { position: "top-right", autoClose: 5000 });

        const token = response.data.token;
        const userData = response?.data?.user;

        if (token) {
          const user = jwtDecode(token);

          dispatch(
            setToken({
              token,
              isAuthenticated: true,
              role: userData?.role ? userData?.role : null,
              userId: userData?.id,
            }),
          );
          dispatch(setUser({ userData }));

          // ── Show success modal instead of navigating immediately ──────────
          setRegisteredName(userData?.name || userData?.email || "");
          setShowSuccess(true);
          // Navigation happens in handleOnboardingDone (after modal timer ends)
          // ──────────────────────────────────────────────────────────────────
        }
      }
    } catch (error) {
      console.log("Axios error:", error?.response?.data);
      const message = error?.response?.data?.message;
      // let message = "ERROR";
      // if (error.hasOwnProperty("response")) {
      //   message = error.response.data.error;
      // }
      toast.warning(message, { position: "top-right", autoClose: 7000 });
    }
  };

  // Called when the success modal's timer ends
  const handleOnboardingDone = () => {
    setShowSuccess(false);

    if (location?.state?.selectedMonth) {
      console.log("inside if ", location);
      navigate(`/checkout`, {
        state: { selectedMonth: location?.state?.selectedMonth },
      });
    } else {
      console.log("inside else  ", location);
      navigate(`/builder`);
    }
  };

  // Handle OTP form submission
  const onSendOTP = (data) => {
    console.log("OTP Data:", data);
  };

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
        const ability = {
          departments: userData?.userDepartment,
          profile: userData?.profile,
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
      console.log("EE", error);
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data.message;
      }
      toast.warning(message, { position: "top-right", autoClose: 7000 });
    }
  };

  const handleSuccess = (credentialResponse) => {
    if (credentialResponse?.credential) {
      const token = credentialResponse?.credential;
      const user = jwtDecode(token);
      const payload = { name: user?.name, email: user?.email };
      authloginHandler(payload);
    }
  };

  const handleError = () => {
    console.log("Google login error");
  };

  return (
    <>
      <Helmet>
        <title>Create Account</title>
      </Helmet>

      {/* ── Onboarding success modal ── */}
      <OnboardingSuccessModal
        open={showSuccess}
        userName={registeredName}
        onDone={handleOnboardingDone}
        duration={5000}
      />

      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white h-full justify-center items-center w-1/2 hidden lg:flex">
          <img src="/logo.png" className="w-[60%]" alt="Logo" />
        </div>

        <div className="flex justify-center items-start py-5 bg-gray-100 h-full w-full lg:w-1/2">
          <div className="flex flex-col justify-center gap-y-10 items-start h-full w-[80%] sm:w-[70%] lg:w-[70%] md:w-1/2">
            <Link to="/">
              <span className="font-black text-3xl tracking-tight text-gray-900 uppercase qr-logo">
                QR<span className="text-[#1578bc] qr-logo pl-1">Smart</span>
              </span>
            </Link>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-start items-start w-full"
            >
              <h3 className="font-bold text-slate-800 text-[25px]">
                Create Account
              </h3>
              <p className="text-slate-700">
                It's free and only takes a few seconds.
              </p>

              <InputField
                type="email"
                placeholder="Enter your email here..."
                parentClass="my-2"
                control={control}
                name="email"
                autoComplete="off"
                errors={errors}
              />
              <InputField
                type="password"
                placeholder="Enter your password here..."
                parentClass="my-2"
                name="password"
                control={control}
                autoComplete="off"
                errors={errors}
              />

              <MyButton
                type="submit"
                className="w-full rounded-full bg-blue-700"
              >
                Sign up
              </MyButton>

              <p className="font-medium my-3 text-slate-700 text-[14px]">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="cursor-pointer text-blue-700 hover:text-blue-900 transition-all text-[13px]">
                    Log In
                  </span>
                </Link>
              </p>

              <div className="flex justify-center items-center gap-x-3 w-full">
                <div className="w-full bg-gray-400 h-[1px]"></div>
                <h3 className="text-slate-700 font-medium text-[14px]">OR</h3>
                <div className="w-full bg-gray-400 h-[1px]"></div>
              </div>

              <div className="flex justify-center flex-col mt-3 gap-y-4 sm:flex-row w-full gap-x-3 items-center">
                <GoogleOAuthProvider clientId="496475122024-lfk0n5e02vtkf34ki12ahvjd0bijo005.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
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

              {isAuthenticated ? (
                <p className="cursor-pointer" onClick={() => logout()}>
                  logout
                </p>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
