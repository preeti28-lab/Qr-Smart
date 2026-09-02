import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllImagesNames, getTheImage } from "../../redux/features/qrcodes";

const Images = () => {
  const { ids } = useParams(); // Fetching the ID from URL
  const [imageNames, setImageNames] = useState([]); // Local state for storing image names
  const [imageData, setImageData] = useState([]); // Store image data (URLs) for displaying images
  const [loading, setLoading] = useState(false); // Loading state to avoid repeated fetches

  const dispatch = useDispatch();

  const getImagesNames = (ids) => {
    dispatch(
      getAllImagesNames(ids, (error, data) => {
        if (error) {
          console.error("Error fetching images:", error);
        } else {
          setImageNames(data.imageNames);
        }
      })
    );
  };

  const fetchImageData = (imageName) => {
    // Prevent calling the API if image is already fetched
    if (imageData.some((data) => data.imageName === imageName)) {
      return;
    }

    setLoading(true); // Set loading to true before fetching
    dispatch(
      getTheImage(imageName, (error, blobData) => {
        if (error) {
          console.error(`Error fetching image for ${imageName}:`, error);
        } else {
          // Convert the blob data into a URL
          const imageUrl = URL.createObjectURL(blobData);
          setImageData((prevData) => [...prevData, { imageName, imageUrl }]);
        }
        setLoading(false); // Set loading to false after fetching
      })
    );
  };

  const fetchDataForAllImages = () => {
    if (imageNames.length > 0) {
      imageNames.forEach((imageName) => {
        fetchImageData(imageName);
      });
    }
  };

  useEffect(() => {
    getImagesNames(ids); // Fetch image names based on `ids`
  }, [ids]);

  useEffect(() => {
    if (imageNames.length > 0 && !loading) {
      fetchDataForAllImages(); // Fetch data for all images when `imageNames` changes and not in a loading state
    }
  }, [imageNames, loading]);

  return (
    <div>
      <div className="w-full bg-white border-b flex sticky top-0 left-0 z-50 text-[#000000] justify-between items-center py-4 px-8 border-solid border-b-slate-300">
        <h2 className="font-bold text-[35px] md:text-[40px] uppercase text-center w-full">
          qrsmart
        </h2>
      </div>
      <div className="container mx-auto p-3">
        <p className="text-center font-semibold text-2xl mb-5 ">Images</p>
        <div>
          {/* Render the images */}
          {imageData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {imageData.map(({ imageName, imageUrl }, index) => (
                <div key={index} className="flex justify-center">
                  <img src={imageUrl} alt={imageName} className="rounded-lg"/>
                </div>
              ))}
            </div>
          ) : (
            <p>No images available.</p>
          )}
        </div>
      </div>
      <div className="w-full bg-slate-800 flex justify-center items-center text-white mt-5">
        <div className="py-10">
          <h2 className="uppercase font-bold text-center text-xl mb-1">
            qrsmart
          </h2>
          <p className="font-medium text-[14px] text-center pb-2 px-2">
            Create your own QR codes and boost your business or idea
          </p>

          <div className="flex justify-center items-center gap-x-4">
            <a className="cursor-pointer">
              <FaLinkedin size={16} />
            </a>
            <a className="cursor-pointer">
              <FaSquareXTwitter size={16} />
            </a>
            <a className="cursor-pointer">
              <FaFacebookSquare size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
