import React from "react";
import MyModal from "../../components/modals/MyModal";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { buyTrialPlan } from "../../redux/features/dashboard";

const TrialModal = ({ isOpen = false, setIsOpen = () => {}, onDelete = () => {} }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const handleActivateTrial = () => {
    const payload = {
      userId: userId,
    };
    dispatch(buyTrialPlan(payload))
    setIsOpen(false)
    // Add logic to activate trial, like dispatching an action
  };

  return (
    <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Free Trial">
      <div className="w-full flex flex-col gap-y-6 justify-center items-center">
        <p className="text-black font-semibold text-3xl mt-3">
          Trial is of the 7 days only ...
        </p>

        <div className="flex justify-center items-center gap-x-4">
          <MyButton
            className="bg-blue-700 rounded-full py-3 px-6 font-semibold text-[15px]"
            onClick={handleActivateTrial}
          >
            Activate
          </MyButton>
        </div>
      </div>
    </MyModal>
  );
};

export default TrialModal;
