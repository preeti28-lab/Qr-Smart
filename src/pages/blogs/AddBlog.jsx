import React, { useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import InputField from "../../components/fields/InputField";
import { useForm } from "react-hook-form";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch } from "react-redux";
import { createBlog } from "../../redux/features/blogs";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addLoader, setAddLoader] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const submitHandler = (data) => {
    setAddLoader(true);
    // console.log(data);
    const { content, description, title, blogData } = data;
    // console.log(blogData[0].file);
    const file = blogData[0].file;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("content", content);
    formData.append("description", description);
    formData.append("title", title);
    dispatch(
      createBlog(
        formData,
        (success) => {
          if (success) {
            navigate(-1);
          }
        },
        setAddLoader
      )
    );
  };

  return (
    <AppViewer>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto p-5 md:p-10"
      >
        <div className="w-full grid gap-4 ">
          <div className="grid grid-cols-2 gap-3">
            <div className="w--full">
              <label className="font-semibold text-gray-700 text-[14px]">
                Heading
              </label>
              <InputField
                type="text"
                //   placeholder="Eg . Paul John"
                parentClass="my-2"
                control={control}
                name="title"
                errors={errors}
              />
            </div>
            <div className="w-full">
              <label className="font-semibold text-gray-700 text-[14px]">
                Description
              </label>
              <InputField
                type="text"
                //   placeholder="Eg . Paul John"
                parentClass="my-2"
                control={control}
                name="description"
                errors={errors}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Add image
            </label>
            <InputField
              type="image"
              //   placeholder="Ex. http://www.qrsmart.us/qr"
              parentClass="my-2"
              control={control}
              name="blogData"
              errors={errors}
              maxFiles={5}
            />
          </div>

          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Enter Blog
            </label>
            <InputField
              type="rich-text"
              //   placeholder="Ex. http://www.qrsmart.us/qr"
              parentClass="my-2"
              control={control}
              name="content"
              errors={errors}
            />
          </div>
        </div>

        <div className="my-2 w-full flex justify-start items-center gap-2 mt-5">
          {/* <MyButton className="rounded-full px-8 bg-blue-700 text-white text-[16px]">
              Edit
            </MyButton> */}
          <MyButton
            className="rounded-full px-8 bg-blue-700 text-white text-[16px]"
            type="submit"
          >
            {addLoader === true ? (
              <span className="flex justify-center items-center gap-1">
                <Spinner color="white" /> Creating ...{" "}
              </span>
            ) : (
              <span>Create</span>
            )}
          </MyButton>
        </div>
      </form>
    </AppViewer>
  );
};

export default AddBlog;
