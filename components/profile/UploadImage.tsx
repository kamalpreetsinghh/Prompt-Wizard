"use client";

import { ChangeEvent, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import UserNameIcon from "../UserNameIcon";

type UploadImageProps = {
  userImage: string | null;
  canEdit: boolean;
  name: string;
  userId?: string;
};

const UploadImage = ({
  userImage,
  canEdit,
  name,
  userId,
}: UploadImageProps) => {
  const [uploadedImage, setUploadedImage] = useState(userImage || "");
  const [image, setImage] = useState("");
  const [showImageActions, setShowImageActions] = useState(false);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      setShowImageActions(true);
    };
  };

  const handleClose = () => {
    setImage("");
    setShowImageActions(false);
  };

  const handleDone = async () => {
    setShowImageActions(false);
    await fetch(`/api/user/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ image }),
    });
    setUploadedImage(image);
    setImage("");
  };

  return (
    <div className="flex">
      <div className={`group relative ${canEdit ? "hover:opacity-50" : ""}`}>
        {uploadedImage || image ? (
          <div className="w-28 h-28 relative">
            <Image
              src={image ? image : uploadedImage}
              style={{ objectFit: "cover" }}
              className="rounded-full "
              alt="user image"
              fill
            />
          </div>
        ) : (
          <span>
            <UserNameIcon name={name} className="w-28 h-28 text-7xl" />
          </span>
        )}
        {canEdit && (
          <>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="form-image-input left-0 right-0 bottom-0 top-0"
              onChange={(e) => handleChangeImage(e)}
            />
            <span
              className="invisible group-hover:visible absolute left-0 right-0 bottom-0 top-0 
                          flex justify-center items-center"
            >
              <EditIcon />
            </span>
          </>
        )}
      </div>

      {showImageActions && (
        <div className="flex gap-2">
          <div
            className="primary-color button-hover cursor-pointer"
            onClick={handleDone}
          >
            <DoneIcon />
          </div>
          <div
            className="primary-color button-hover cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
