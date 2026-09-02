import React, { useState } from "react";
import { Modal, Input } from "antd";
import MyButton from "../../components/buttons/MyButton";
import { toast } from "react-toastify";
import createAxiosInstance from "../../config/axiosConfig";

const ForgotPasswordModal = ({ open, onClose }) => {
  const axiosInstance = createAxiosInstance();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/qr-auth/forgot-password", {
        email,
      });

      toast.success(res.data.message || "OTP sent successfully");
      setStep(2);
    } catch (error) {
      let message = "Error sending OTP";
      if (error.response) message = error.response.data.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Reset Password
  const handleResetPassword = async () => {
    let success = false;
    try {
      setLoading(true);
      const res = await axiosInstance.post("/qr-auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      toast.success(res.data.message || "Password reset successful");
      success = true; // ✅ mark success, don't close yet
    } catch (error) {
      let message = "Error resetting password";
      if (error.response) message = error.response.data.message;
      toast.error(message);
    } finally {
      setLoading(false); // ✅ this runs first, cleanly
    }

    if (success) handleClose(); // ✅ now close after finally is done
  };
  // 🔹 Reset modal state
  const handleClose = () => {
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
    onClose();
  };

  return (
    <Modal
      title={step === 1 ? "Forgot Password" : "Reset Password"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      {step === 1 ? (
        <>
          <p className="mb-2">Enter your email to receive OTP</p>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <MyButton
            className="mt-4 w-full bg-blue-700"
            onClick={handleSendOtp}
            disabled={loading || !email}
          >
            Send OTP
          </MyButton>
        </>
      ) : (
        <>
          <p className="mb-2">Enter OTP and new password</p>

          <Input
            className="mb-2"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Input.Password
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <MyButton
            className="mt-4 w-full bg-blue-700"
            onClick={handleResetPassword}
            disabled={loading || !otp || !newPassword}
          >
            Reset Password
          </MyButton>
        </>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
