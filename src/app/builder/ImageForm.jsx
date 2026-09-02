import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputField from "../../common/fields/InputField";
import ImageField from "../../common/fields/ImageField";
import { setImagesForQR, setLastPage } from "../../redux/features/dashboard";
import usePath from "../../hooks/usePath";
import { useNavigate } from "react-router-dom";

const ImageForm = ({ nextPath }) => {
  const path = usePath();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagesData, setImagesData] = useState();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();
  if (imagesData) {
    console.log(imagesData);
  }

  const onSubmit = (data) => {
    console.log(data);

    // setImagesData(data)
    // setUploadedImages(data)
    dispatch(setImagesForQR(data));
    dispatch(setLastPage("content"));
    path.changeEndPoint(nextPath, { data });
    // // dispatch(setVCardDetails(data)); // Dispatch to store
    // const formData = new FormData();

    // // Iterate over the image array and append each file object to the FormData object
    // data.image.forEach((image, index) => {
    //   // Use the file object directly for uploading
    //   formData.append(`file`, image.file);
    // });

    // // Sending the FormData to the API using fetch
    // fetch("https://your-api-endpoint.com/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <ImageField
          control={control}
          errors={errors}
          name={"image"}
          maxFiles={10}
          label="Upload Images"
        />
        <button
          className="rounded-full w-max bg-white border-2 border-solid my-2 py-2 px-6 border-blue-700 text-blue-800 font-extrabold"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ImageForm;
