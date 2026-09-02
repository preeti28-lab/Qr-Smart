import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllNotificationsPage,
  getNotificationPhotoUrl,
} from "../../redux/features/blogs";
import ScreenView from "../../layouts/ScreenView";

const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;

  const videoId = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
  );

  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
};

const AllBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);

    dispatch(
      getAllNotificationsPage((success, data) => {
        if (success && data) {
          const list = Array.isArray(data)
            ? data
            : data?.data || data?.notifications || [];

          setNotifications(list);
        } else {
          setNotifications([]);
        }

        setLoading(false);
      }),
    );
  }, [dispatch]);

  if (loading) {
    return (
      <ScreenView>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm text-gray-400">loading ...</span>
          </div>
        </div>
      </ScreenView>
    );
  }

  // Filter only visible notifications
  const visibleNotifications = notifications.filter(
    (item) => item.show,
  );

  return (
    <>
      <ScreenView>
        <div className="relative overflow-hidden bg-[#f8fbff]">

          {/* =====================================================
              SOFT BACKGROUND
          ====================================================== */}

          <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#edf6ff] via-[#f5faff] to-transparent pointer-events-none" />

          {/* =====================================================
              LEFT WAVE
          ====================================================== */}

          <svg
            className="absolute left-0 top-0 w-[550px] h-[430px] pointer-events-none"
            viewBox="0 0 550 430"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0H150C245 70 275 125 355 180C420 225 470 245 550 250V430H0V0Z"
              fill="#e6f1ff"
            />

            <path
              d="M-50 210C70 260 145 220 225 260C320 307 325 380 470 405C495 410 520 411 550 410"
              stroke="#dceaff"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </svg>

          {/* =====================================================
              RIGHT WAVE
          ====================================================== */}

          <svg
            className="absolute right-0 top-0 w-[500px] h-[390px] pointer-events-none"
            viewBox="0 0 500 390"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M500 0H360C310 65 285 125 220 175C160 220 90 240 0 245V390H500V0Z"
              fill="#edf6ff"
            />

            <path
              d="M550 245C430 220 370 260 300 300C230 340 190 375 70 390"
              stroke="#e3efff"
              strokeWidth="25"
              strokeLinecap="round"
            />
          </svg>

          {/* =====================================================
              LEFT DOTS
          ====================================================== */}

          <div className="absolute left-4 top-24 grid grid-cols-6 gap-3 opacity-50 pointer-events-none">
            {Array.from({ length: 36 }).map((_, index) => (
              <span
                key={index}
                className="w-1 h-1 rounded-full bg-blue-300"
              />
            ))}
          </div>

          {/* =====================================================
              RIGHT DOTS
          ====================================================== */}

          <div className="absolute right-5 top-32 grid grid-cols-6 gap-3 opacity-40 pointer-events-none">
            {Array.from({ length: 36 }).map((_, index) => (
              <span
                key={index}
                className="w-1 h-1 rounded-full bg-blue-300"
              />
            ))}
          </div>

          {/* =====================================================
              MAIN CONTAINER
              ORIGINAL HEIGHT / SPACING PRESERVED
          ====================================================== */}

          <div className="relative z-10 container max-w-6xl mx-auto pt-10 pb-20 px-5">

            {/* ===================================================
                BLOG HEADING
            ==================================================== */}

            <div className="relative flex justify-center items-center mb-6">

              <div className="text-center relative z-10">

                <h2
                  className="
                    text-[25px]
                    md:text-[35px]
                    lg:text-[42px]
                    font-bold
                    tracking-[-0.03em]
                    text-slate-800
                  "
                >
                  Blogs
                </h2>

                {/* Modern underline */}
                <div className="flex items-center justify-center mt-3">

                  <div className="relative w-[145px] h-[4px] rounded-full bg-blue-100">

                    <div className="absolute left-0 top-0 h-full w-[75px] rounded-full bg-[#2186ed]" />

                    <span
                      className="
                        absolute
                        left-[69px]
                        top-1/2
                        -translate-y-1/2
                        w-3
                        h-3
                        rounded-full
                        bg-[#2186ed]
                        shadow-[0_0_0_5px_rgba(33,134,237,0.10)]
                      "
                    />

                    <span
                      className="
                        absolute
                        right-0
                        top-1/2
                        -translate-y-1/2
                        w-2.5
                        h-2.5
                        rounded-full
                        bg-[#2186ed]
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ===================================================
                BLOG CONTENT
                ORIGINAL CONTENT + ORIGINAL AUTO HEIGHT
            ==================================================== */}

            <div
              className="
                relative
                bg-white
                rounded-[24px]
                border
                border-blue-50
                shadow-[0_10px_35px_rgba(42,104,180,0.08)]
                overflow-hidden
              "
            >

              {/* Small top gradient */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-20
                  bg-gradient-to-b
                  from-blue-50/40
                  to-transparent
                  pointer-events-none
                "
              />

              {visibleNotifications.length === 0 ? (

                /* =================================================
                    EMPTY STATE
                    ORIGINAL mt-10 MAINTAINED
                ================================================== */

                <div className="relative text-center text-gray-500 mt-10 pb-1">

                  {/* Soft icon glow */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      w-32
                      h-32
                      bg-blue-100/50
                      rounded-full
                      blur-3xl
                      pointer-events-none
                    "
                  />

                  {/* Document Icon */}
                  <div
                    className="
                      relative
                      mx-auto
                      w-[70px]
                      h-[70px]
                      rounded-full
                      bg-gradient-to-br
                      from-[#eef6ff]
                      to-[#e2efff]
                      border
                      border-blue-100
                      flex
                      items-center
                      justify-center
                      shadow-[0_8px_25px_rgba(33,134,237,0.08)]
                    "
                  >

                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >

                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                        stroke="#2186ED"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M14 2V8H20"
                        stroke="#2186ED"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M8 13H16"
                        stroke="#2186ED"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                      <path
                        d="M8 17H14"
                        stroke="#2186ED"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />

                    </svg>

                  </div>

                  {/* EXACT SAME CONTENT */}
                  <p
                    className="
                      relative
                      mt-5
                      text-[16px]
                      md:text-[18px]
                      text-gray-400
                    "
                  >
                    No blogs available.
                  </p>

                </div>

              ) : (

                /* =================================================
                    BLOG CARDS
                ================================================== */

                <div className="relative p-4 sm:p-5 lg:p-6">

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {visibleNotifications.map((item) => {

                      const photoUrl = item.photographPath
                        ? getNotificationPhotoUrl(
                            item.photographPath,
                          )
                        : null;

                      const videoEmbedUrl = item.videoLink
                        ? getYoutubeEmbedUrl(item.videoLink)
                        : null;

                      return (
                        <div
                          key={item._id}
                          className="
                            group
                            bg-white
                            shadow-md
                            rounded-2xl
                            overflow-hidden
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                            duration-300
                            border
                            border-gray-100
                            cursor-pointer
                          "
                          onClick={() =>
                            navigate(`/blog/${item._id}`)
                          }
                        >

                          {/* Media Section */}
                          {photoUrl ? (

                            <div className="w-full h-48 flex items-center justify-center bg-gray-50 overflow-hidden">

                              <img
                                src={photoUrl}
                                alt={item.title}
                                className="
                                  h-48
                                  w-full
                                  object-cover
                                  group-hover:scale-105
                                  transition-transform
                                  duration-500
                                "
                                onError={(e) =>
                                  (e.target.style.display =
                                    "none")
                                }
                              />

                            </div>

                          ) : videoEmbedUrl ? (

                            <div className="h-48 bg-gray-200 flex items-center justify-center">

                              <iframe
                                src={videoEmbedUrl}
                                title={item.title}
                                className="w-full h-full rounded"
                                allowFullScreen
                              />

                            </div>

                          ) : (

                            <div
                              className="
                                h-48
                                bg-gradient-to-br
                                from-blue-50
                                to-gray-50
                                flex
                                items-center
                                justify-center
                                text-gray-400
                              "
                            >
                              No Media
                            </div>

                          )}

                          {/* Notification Details */}
                          <div className="p-4">

                            <h3
                              className="
                                text-lg
                                font-semibold
                                text-gray-800
                                truncate
                              "
                            >
                              {item.title}
                            </h3>

                            <div
                              className="
                                text-sm
                                text-gray-600
                                mt-2
                                line-clamp-3
                              "
                              dangerouslySetInnerHTML={{
                                __html: item.paragraph,
                              }}
                            />

                            <div
                              className="
                                mt-4
                                text-xs
                                text-gray-400
                                flex
                                justify-between
                                items-center
                              "
                            >

                              <span>
                                {new Date(
                                  item.createdAt,
                                ).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>

                            </div>

                          </div>

                        </div>
                      );
                    })}

                  </div>

                </div>

              )}

            </div>

          </div>
        </div>
      </ScreenView>
    </>
  );
};

export default AllBlogs;