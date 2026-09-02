// import React, { useEffect, useState } from "react";
// import ScreenView from "../../layouts/ScreenView";
// import Footer from "../../common/footer/Footer";
// import { useParams } from "react-router-dom";
// import { getBlogImg, getSingleBlog } from "../../redux/features/blogs";
// import { useDispatch } from "react-redux";

// const ReadBlog = () => {
//   const dispatch = useDispatch();
//   const { title } = useParams(); // Get the title from the URL
//   const originalTitle = decodeURIComponent(title); // Convert it back to the original
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [blogDetails, setBlogDetails] = useState(null);
//   const [blogImg, setBlogImg] = useState(null);

//   useEffect(() => {
//     if (originalTitle) {
//       dispatch(
//         getSingleBlog(originalTitle, (success, data) => {
//           if (success) {
//             setBlogDetails(data);
//           }
//         })
//       );
//       dispatch(
//         getBlogImg(originalTitle, (success, link) => {
//           if (success) {
//             setBlogImg(link);
//           }
//         })
//       );
//     }
//   }, [originalTitle]);

//   return (
//     <ScreenView>
//       <div className=" mx-auto">
//         <div className="bg-custom-gradient py-10 md:py-28">
//           <div className="flex flex-col items-center">
//             <h2 className="text-[25px] md:text-[35px] font-bold text-slate-800 text-center">
//               {blogDetails?.title}
//             </h2>
//           </div>
//         </div>
//       </div>
//       <div className="py-10 px-5 md:w-3/4 mx-auto">
//         <p className="mb-4">{blogDetails?.description}</p>
//         <img src={blogImg} className=" w-auto mx-auto rounded-md" />

//         <p
//           className="text-[15px] md:text-[17px] mt-7"
//           dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
//         />
//       </div>

//     </ScreenView>
//   );
// };

// export default ReadBlog;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getNotificationById,
  getNotificationPhotoUrl,
} from "../../redux/features/blogs";
// import Loader from "../common/Loader";
import { Modal } from "antd";
import ScreenView from "../../layouts/ScreenView";
// import NotificationMarquee from "./NotificationMarquee";
// import PageHelmet from "../components/PageHelmet";
import "react-quill/dist/quill.snow.css";

const ReadBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Modal state for full image view
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      dispatch(
        getNotificationById(id, (success, data) => {
          setLoading(false);
          if (success) {
            setNotification(data);
          }
        }),
      );
    };

    if (id) {
      fetchNotification();
    }
  }, [id, dispatch]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    );
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading ...
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <div className="text-2xl text-gray-600 font-semibold">
            Notification not found
          </div>
        </div>
      </div>
    );
  }

  const photoUrl = notification.photographPath
    ? getNotificationPhotoUrl(notification.photographPath)
    : null;

  const hasMedia = photoUrl || notification.videoLink;

  return (
    <>
      {/* <PageHelmet
        title={notification.title}
        description="Buy best IGNOU & NIOS Books, Guides, Solved Papers & Reference Material from Neeraj Publications online."
        keywords="Neeraj Publications, Neeraj Books, IGNOU, NIOS, IGNOU Books, IGNOU Guides, NIOS Guides, IGNOU Solved Papers, IGNOU Reference Books, NIOS Books, NIOS 10th Books, NIOS 12th Books, NIOS Solved Papers, IGNOU Question Papers, IGNOU Study Material, IGNOU Help Books, IGNOU BA Books, IGNOU MA Books, IGNOU MBA Books, IGNOU B.Com Books, IGNOU M.Com Books, IGNOU BCA Books, IGNOU MCA Books, NIOS 10th Reference Books, NIOS 12th Reference Books, NIOS Secondary Books, NIOS Senior Secondary Books, NIOS Previous Year Question Papers, NIOS Exam Preparation Books, Best IGNOU Books, Best NIOS Books"
      /> */}
      {/* <NotificationMarquee /> */}

      <ScreenView>
        <div className="pb-10">
          {/* Hero Header */}
          <div className="bg-cstm-blue text-white ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 !pb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-blue-700">
                {notification.title}
              </h1>
              <div className="w-20 h-1 bg-blue-700"></div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Card Content */}
              <div className="p-4 md:p-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Paragraph */}
                  <div
                    className={`${hasMedia ? "lg:col-span-8" : "lg:col-span-12"} ql-container ql-snow !border-0`}
                  >
                    <div
                      className="ql-editor !p-0 text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: notification.paragraph,
                      }}
                      style={{ fontSize: "0.95rem", lineHeight: "1.7" }}
                    />
                  </div>

                  {/* Media - Fixed Size */}
                  {hasMedia && (
                    <div className="lg:col-span-4">
                      {notification.videoLink ? (
                        <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-cstm-blue bg-white p-2">
                          <iframe
                            src={getYoutubeEmbedUrl(notification.videoLink)}
                            title={notification.title}
                            className="w-full h-full rounded"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : photoUrl ? (
                        <div
                          className="w-full h-64 rounded-lg overflow-hidden border-2 border-cstm-blue bg-gray-50 p-2 flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            setSelectedImage(photoUrl);
                            setIsImageModalOpen(true);
                          }}
                        >
                          <img
                            src={photoUrl}
                            alt={notification.title}
                            className="max-w-full max-h-full object-contain rounded"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Image Modal */}
          {selectedImage && (
            <Modal
              open={isImageModalOpen}
              onCancel={() => setIsImageModalOpen(false)}
              footer={null}
              centered
              width={900}
              bodyStyle={{
                padding: 0,
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={selectedImage}
                alt="Full View"
                className="max-h-[85vh] max-w-full object-contain rounded-md"
              />
            </Modal>
          )}
        </div>
      </ScreenView>
    </>
  );
};

export default ReadBlog;