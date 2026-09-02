import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import InputField from "../../components/fields/InputField";
import { useForm } from "react-hook-form";
import MyButton from "../../components/buttons/MyButton";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteBlog,
  editBlog,
  getBlogImg,
  getSingleBlog,
} from "../../redux/features/blogs";

const EditBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const stateBlog = location?.state?.blogData;
  console.log(stateBlog);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [blogDetails, setBlogDetails] = useState(null);
  const [blogImg, setBlogImg] = useState(null);

  useEffect(() => {
    if (stateBlog?.title) {
      dispatch(
        getSingleBlog(stateBlog.title, (success, data) => {
          if (success) {
            setBlogDetails(data);
          }
        })
      );
      dispatch(
        getBlogImg(stateBlog.title, (success, link) => {
          if (success) {
            setBlogImg(link);
          }
        })
      );
    }
  }, [stateBlog]);

  useEffect(() => {
    if (blogDetails) {
      reset({
        title: blogDetails?.title || "",
        content: blogDetails?.content || "", // Adjust based on your data structure
        description: blogDetails?.description || "",
      });
    }
  }, [blogDetails, reset]);

  const handleDelete = () => {
    dispatch(deleteBlog(blogDetails?._id));
  };

  const submitHandler = (data) => {
    console.log(data);
    const { content, description, title, blogData } = data;
    // console.log(blogData[0].file);

    const formData = new FormData();
    if (blogData) {
      const file = blogData[0].file;
      formData.append("file", file);
    }
    formData.append("content", content);
    formData.append("description", description);
    formData.append("title", title);
    formData.append("id", blogDetails?._id);
    dispatch(editBlog(formData));
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
            <img src={blogImg} className="w-[500px] mx-auto" />
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
            Submit
          </MyButton>
          <MyButton
            className="rounded-full px-8 bg-blue-700 text-white text-[16px]"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </MyButton>
        </div>
      </form>
    </AppViewer>
  );
};

export default EditBlog;
