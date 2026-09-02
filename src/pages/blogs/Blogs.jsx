import React, { useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyButton from "../../components/buttons/MyButton";
import usePath from "../../hooks/usePath";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/features/blogs";
import { RiQrCodeLine } from "react-icons/ri";

const Blogs = () => {
  const path = usePath();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const { allBlogs } = useSelector((state) => state.blogs);

  return (
    <AppViewer>
      <div className="py-3 px-4 w-full flex justify-between">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[22px]">All Blogs</h2>
        </div>
        <MyButton
          className="bg-blue-800 text-[15px] font-semibold rounded-full w-max"
          onClick={() => {
            navigate("/addblog");
          }}
        >
          Create Blog
        </MyButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4">
        {/* {allBlogs?.map((item, index) => {
          return (
            <div className="bg-white border-2 p-4 rounded-md">
              <img src="" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p>{item.description}</p>
              <MyButton
                className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
                onClick={() => {
                  navigate("/editblog", { state: { blogData: item } });
                }}
              >
                <span>Read</span>
              </MyButton>
            </div>
          );
        })} */}
        {allBlogs?.length > 0 ? (
          <>
            {allBlogs?.map((item, index) => {
              return (
                <div className="bg-white border-2 p-4 rounded-md">
                  <img src="" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p>{item.description}</p>
                  <MyButton
                    className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
                    onClick={() => {
                      navigate("/editblog", { state: { blogData: item } });
                    }}
                  >
                    <span>Read</span>
                  </MyButton>
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-4 py-20 w-full">
            {/* <RiQrCodeLine size={60} className="text-slate-600" /> */}
            <p className="font-semibold text-gray-800 text-[14px]">
              You haven't created any blogs yet
            </p>
          </div>
        )}
      </div>
    </AppViewer>
  );
};

export default Blogs;
