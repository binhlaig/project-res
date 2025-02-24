import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { ImagePlus, Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}


const UploadImage: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };


  return (
    <div>
      
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-600 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
            width={150}
            height={150}
            />
          </div>
        ))}
      </div>


      <CldUploadWidget
        uploadPreset="e7ohatau"
        onSuccess ={onUpload}
      >
       {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
