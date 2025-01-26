import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import "../styles/PhotoUpload.scss";
import { useStore } from "../Context/StoreContext";

const PhotoUpload = () => {
  const { photos, setPhotos } = useStore();
  const handleUploadPhotos = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    setPhotos((prevPhotos) => [...prevPhotos, ...validFiles]);
  };

  const handleRemovePhoto = (index) => {
    URL.revokeObjectURL(photos[index]); // Clean up URL
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing
    const reorderedPhotos = Array.from(photos);
    const [movedPhoto] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, movedPhoto);
    setPhotos(reorderedPhotos);
  };

  return (
    <DragDropContext onDragEnd={handleDragPhoto}>
      {/* Consistent droppableId */}
      <Droppable droppableId="photos" direction="horizontal">
        {(provided) => (
          <div
            className="photos"
            {...provided.droppableProps} // Pass droppableProps here
            ref={provided.innerRef} // Ensure innerRef is connected
          >
            {photos.length < 1 ? (
              <>
                <input
                  id="image"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                />
                <label htmlFor="image" className="alone">
                  <div className="icon">
                    <IoIosImages />
                  </div>
                  <p>Upload from your device</p>
                </label>
              </>
            ) : (
              <>
                {photos.map((photo, index) => (
                  <Draggable
                    key={index}
                    draggableId={`photo-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="photo"
                        ref={provided.innerRef}
                        {...provided.draggableProps} // Drag props
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="Uploaded Preview"
                          style={{ height: "300px", width: "300px" }}
                          className="photo_uploadedimages"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(index)}
                          className="photo_removebutton"
                        >
                          <BiTrash />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                <input
                  id="image"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUploadPhotos}
                  multiple
                />
                <label htmlFor="image" className="together">
                  <div className="icon">
                    <IoIosImages />
                  </div>
                  <p>Upload from your device</p>
                </label>
              </>
            )}
            {provided.placeholder}{" "}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PhotoUpload;
