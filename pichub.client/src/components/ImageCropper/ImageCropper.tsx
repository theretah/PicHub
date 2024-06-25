import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "../../setCanvasPreview";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  circularCrop: boolean;
  closeModal: () => void;
  updateAvatar: (dataUrl: string) => void;
  aspectRatio: number;
  minDimension: number;
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

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      // imageElement.addEventListener("load", (e) => {
      //   if (error) setError("");
      //   const { naturalWidth, naturalHeight } =
      //     e.currentTarget as HTMLImageElement;
      //   if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      //     setError("Image must be at least 150 x 150 pixels.");
      //     return setImgSrc("");
      //   }
      // });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (minDimension / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCropImage = () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      const pixelCrop = convertToPixelCrop(
        crop,
        imgRef.current.width,
        imgRef.current.height
      ) as PixelCrop;
      setCanvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        pixelCrop
      );
      const dataUrl = previewCanvasRef.current.toDataURL();
      updateAvatar(dataUrl);
      closeModal();
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
          id="profilePhoto"
        />
      </div>
      {imgSrc && (
        <div className="d-flex flex-column align-items-center">
          <div className="position-relative d-inline-block">
            <ReactCrop
              crop={crop}
              onChange={(c, percentCrop) => setCrop(percentCrop)}
              circularCrop={circularCrop}
              keepSelection
              aspect={aspectRatio}
              // minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ width: minDimension }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          <button className="btn btn-primary mt-4" onClick={handleCropImage}>
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4 d-none border-1 object-fit-contain"
          style={{
            width: minDimension,
            height: minDimension,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
