import React, { useEffect, useState } from "react";
import { Progress } from "antd"; // Import Progress component from antd
import MyModal from "../../components/modals/MyModal";
import MyButton from "../../components/buttons/MyButton";
import qrimg from "../../assets/dummyqr.png";
import { useDispatch, useSelector } from "react-redux";
import { buyPaidPlan } from "../../redux/features/dashboard";

const PaymentModal = ({
  isOpen = false,
  setIsOpen = () => {},
  onDelete = () => {},
  selectedPlan,
}) => {

  const dispatch = useDispatch()

  const [progress, setProgress] = useState(0);
  const duration = 2 * 60 * 1000; // 2 minutes in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(duration / 1000); // In seconds
  console.log("this is the selecte dpala", selectedPlan);
  const {userId} = useSelector( (state) => state.auth)

  const handleDelete = () => {
    handleClose();
    onDelete(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setTimeRemaining(duration / 1000); // Reset to initial value in seconds
      return;
    }

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercentage);

      // Calculate time remaining in seconds
      const remainingSeconds = Math.max((duration - elapsed) / 1000, 0);
      setTimeRemaining(remainingSeconds);

      if (progressPercentage === 100) {
        clearInterval(interval);
        setIsOpen(false);
      }
    }, 1000); // Update every second for better time display

    return () => {
      clearInterval(interval);
    };
  }, [isOpen]);

  const handleClose = () => {
    setProgress(0);
    setTimeRemaining(duration / 1000); // Reset time to initial value
    setIsOpen(false);
  };

  const completePayment = () => {
    const payload = {
      userId:userId,
      months: selectedPlan,
    }
    dispatch(buyPaidPlan(payload))
    setProgress(0);
    setTimeRemaining(duration / 1000); // Reset time to initial value
    setIsOpen(false);
  };

  // Format time remaining as minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <MyModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isClosable={false}
      title="Payment"
    >
      <div className="w-full flex flex-col gap-y-6 justify-center items-center">
        <p className="text-black font-semibold mb-[-30px]">Scan this QR </p>
        <img src={qrimg} className="w-[50%] mb-[-30px]" />
        <div style={{ width: "100%", textAlign: "center" }}>
          <Progress
            type="line"
            percent={progress}
            strokeColor={{ from: "#45c153", to: "#ff4d4f" }} // Custom red color
            showInfo={false}
            width="100%"
          />
          <div style={{ fontSize: "16px", color: "#333", marginTop: "10px" }}>
            {formatTime(timeRemaining)} seconds remaining for payment
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <MyButton
            className="bg-blue-700 rounded-full py-3 px-6 font-semibold text-[15px]"
            onClick={handleClose}
          >
            Cancel Payment
          </MyButton>
          <MyButton
            className="bg-blue-700 rounded-full py-3 px-6 font-semibold text-[15px]"
            onClick={completePayment}
          >
            Done
          </MyButton>
        </div>
      </div>
    </MyModal>
  );
};

export default PaymentModal;
