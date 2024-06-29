import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PercentCrop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  circularCrop: boolean;
  closeModal: () => void;
  updateAvatar: (dataUrl: string) => void;
  aspectRatio: number;
  minDimension: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropper = ({
  aspectRatio,
  minDimension,
  circularCrop,
  closeModal,
  updateAvatar,
}: ImageCropperProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspectRatio));
  };

  const handleCropImage = () => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;

    if (image && canvas && completedCrop) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context from canvas");
        return;
      }

      const cropX = completedCrop.x * scaleX;
      const cropY = completedCrop.y * scaleY;
      const cropWidth = completedCrop.width * scaleX;
      const cropHeight = completedCrop.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.imageSmoothingQuality = "high"; // Improve image rendering quality

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            updateAvatar(dataUrl);
            closeModal();
          };
          reader.readAsDataURL(blob);
        } else {
          console.error("Failed to create Blob from canvas data");
        }
      }, "image/jpeg");
    }
  };

  return (
    <>
      <div className="form-group mb-3 text-bg-dark">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="form-control text-bg-dark border-gray"
          id="picture"
        />
      </div>
      {imgSrc && (
        <div className="d-flex flex-column align-items-center">
          <div className="position-relative d-inline-block">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(crop) =>
                handleCropComplete(
                  convertToPixelCrop(
                    crop,
                    imgRef.current?.width || 0,
                    imgRef.current?.height || 0
                  )
                )
              }
              circularCrop={circularCrop}
              aspect={aspectRatio}
              keepSelection
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxWidth: "100%" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <button className="btn btn-primary mt-4" onClick={handleCropImage}>
            Crop Image
          </button>
        </div>
      )}
      {completedCrop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4 d-none border-1 object-fit-contain"
          style={{
            maxWidth: completedCrop.width,
            maxHeight: completedCrop.height,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
