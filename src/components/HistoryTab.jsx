import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "@/config/axiosConfig.js";

const HistoryTab = (
{  activeSubject,
  setActiveSubject,
  data,
  setData,
  tab,
  setTab,}
) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewList, setPreviewList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPreview = (list, index) => {
    setPreviewList(list);
    setCurrentIndex(index);
    setPreviewUrl(list[index]);
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % previewList.length;
    setCurrentIndex(next);
    setPreviewUrl(previewList[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + previewList.length) % previewList.length;
    setCurrentIndex(prev);
    setPreviewUrl(previewList[prev]);
  };
  const closePreview = () => setPreviewUrl(null);
  // ====fetch history=========

  {
    console.log(data, "From history tab.");
   console.log(activeSubject, "From history tab active subject.");
   console.log(data[activeSubject].history, "From history tab.");
 }

  return (
    <div>
      {data[activeSubject].history?.map((item, index) => {
     
        const renderPreview = (url) => {
          if (!url) {
            return (
              <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                No File
              </div>
            );
          }
          console.log(url);
          const cleanUrl = url.split("?")[0];

          const isImage = cleanUrl.match(/\.(jpeg|jpg|png|webp|tiff)$/i);
          const isPDF = cleanUrl.match(/\.pdf$/i);

          if (isImage) {
            return (
              <img
                src={url}
                alt="preview"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            );
          }

          if (isPDF) {
            return (
              <iframe
                src={`${url}#toolbar=0`}
                className="w-full h-full "
                style={{ border: "none", display: "block" }}
                title="pdf"
              />
            );
          }

          return (
            <div className="flex items-center justify-center h-full text-gray-500 text-xs">
              Unsupported
            </div>
          );
        };
        return (
          <>
            {tab === "history" && (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden mb-8"
              >
                {/* 🔥 TWO COLUMN PREVIEW */}
                <div className="grid grid-cols-2 h-48">
                  {/* NOTES */}
                  <div className="border-r border-white/5 relative overflow-hidden">
                    {/* <div className="flex overflow-x-auto gap-2 h-full p-2">
                          {item.notesUrls?.length > 0 ? (
                            item.notesUrls.map((url, idx) => (
                              <div
                                key={idx}
                                className="min-w-[120px] h-full rounded-lg overflow-hidden cursor-pointer"
                                onClick={() => openPreview(item.notesUrls, idx)}
                              >
                                {renderPreview(url)}
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center justify-center w-full text-gray-500 text-xs">
                              No File
                            </div>
                          )}
                        </div> */}
                    <div className="relative overflow-hidden h-full">
                      {item.notesUrls?.length > 0 ? (
                        <>
                          <div
                            className="w-full h-full overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => openPreview(item.notesUrls, 0)}
                          >
                            {renderPreview(item.notesUrls[0])}
                          </div>

                          {item.notesUrls.length > 1 && (
                            <>
                              <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xl"
                                onClick={() => openPreview(item.notesUrls, 0)}
                              >
                                ←
                              </button>
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xl"
                                onClick={() => openPreview(item.notesUrls, 1)}
                              >
                                →
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                          No File
                        </div>
                      )}
                    </div>

                    <span className="absolute top-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded text-white">
                      Notes
                    </span>
                  </div>

                  {/* DPP */}
                  <div className="relative overflow-hidden">
                    <div className="relative h-full overflow-hidden">
                      {item.dppUrls?.length > 0 ? (
                        <>
                          <div
                            className="w-full h-full overflow-hidden rounded-lg cursor-pointer"
                            onClick={() => openPreview(item.dppUrls, 0)}
                          >
                            {renderPreview(item.dppUrls[0])}
                          </div>

                          {item.dppUrls.length > 1 && (
                            <>
                              <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-xl"
                                onClick={() => openPreview(item.dppUrls, 0)}
                              >
                                ←
                              </button>
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xl"
                                onClick={() => openPreview(item.dppUrls, 1)}
                              >
                                →
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                          No File
                        </div>
                      )}
                    </div>

                    <span className="absolute top-2 left-2 text-[10px] bg-black/60 px-2 py-0.5 rounded text-white">
                      DPP
                    </span>
                  </div>
                </div>

                {/* 🔥 METADATA */}
                <div className="p-4 border-t border-white/5">
                  <p className="text-xs text-[#ea580c] mb-1">{item.date}</p>
                  <h4 className="text-sm font-medium text-white truncate">
                    {item.topic}
                  </h4>
                </div>
              </motion.div>
            )}
          </>
        );
      })}

      {previewUrl &&
        (() => {
          const cleanUrl = previewUrl.split("?")[0];
          const isPDF = cleanUrl.match(/\.pdf$/i);

          return (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              onClick={closePreview}
            >
              <div
                className="relative w-full max-w-6xl h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* ❌ CLOSE */}
                <button
                  className="absolute top-4 right-4 text-white text-3xl z-50"
                  onClick={closePreview}
                >
                  ✕
                </button>

                {/* ⬅️ LEFT */}
                {previewList.length > 1 && (
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
                    onClick={prevImage}
                  >
                    ←
                  </button>
                )}

                {/* ➡️ RIGHT */}
                {previewList.length > 1 && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
                    onClick={nextImage}
                  >
                    →
                  </button>
                )}

                {/* CONTENT */}
                {isPDF ? (
                  <div className="flex items-center justify-center h-full text-white">
                    <a
                      href={previewUrl}
                      target="_blank"
                      className="bg-[#ea580c] px-4 py-2 rounded-lg"
                    >
                      Open PDF
                    </a>
                  </div>
                ) : (
                  <img
                    src={previewUrl}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          );
        })()}
    </div>
  );
};

export default HistoryTab;
