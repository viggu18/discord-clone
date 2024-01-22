"use client";
import { FC, Fragment, useState, MouseEventHandler } from "react";
import Dropzone from "react-dropzone";
import { FileIcon, LoaderIcon, UploadCloudIcon, X } from "lucide-react";
import { uploadProfilePhoto, getFileURL } from "@/firebase";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import Image from "next/image";

interface FileUploaderProps {
  message?: string;
  type?: "image";
  onChange?(url?: string): void;
  value: string;
}

interface DropzoneStateType {
  progress: number;
  isUploading: boolean;
  isUploadComplete: boolean;
  selectedFile: File | undefined;
  localURL: string | undefined;
}

const FileUpload: FC<FileUploaderProps> = ({
  message = "Drag drop some files here, or click to select files",
  type = "image",
  onChange,
  value,
}) => {
  const [dropState, setDropState] = useState<DropzoneStateType>({
    progress: 0,
    isUploading: false,
    isUploadComplete: false,
    selectedFile: undefined,
    localURL: undefined,
  });

  function _onDrop(accpeted: File[]) {
    if (accpeted.length)
      setDropState((prev) => ({
        ...prev,
        selectedFile: accpeted[0],
        localURL: URL.createObjectURL(accpeted[0]),
      }));
  }

  async function onUpload(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (dropState.selectedFile) {
      const interval = setInterval(() => {
        setDropState((prev) => ({
          ...prev,
          isUploading: true,
          progress: prev.progress + 2,
        }));
      }, 50);

      await uploadProfilePhoto(dropState.selectedFile).then((res) => {
        clearInterval(interval);
        setDropState((prev) => ({
          ...prev,
          progress: 100,
        }));

        const url = getFileURL(res.ref.name);
        onChange && onChange(url);
      });

      setDropState((prev) => ({
        ...prev,
        isUploading: false,
        isUploadComplete: true,
        progress: 0,
        selectedFile: undefined,
      }));
    }
  }

  if (value) {
    return (
      <div className="flex w-full justify-center">
        <div className="relative h-28 w-28">
          <Image src={value} alt="selected" width={150} height={150} />
          <button
            onClick={() => onChange && onChange("")}
            type="button"
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      accept={{
        "image/*": [],
      }}
      onDrop={_onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="w-full cursor-pointer">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="w-full flex flex-col items-center border border-zinc-500 p-5 rounded-sm">
              {dropState.selectedFile && dropState.localURL ? (
                <div className="flex flex-col gap-4 items-center min-w-full">
                  <Image
                    src={dropState.localURL}
                    alt="selected"
                    width={150}
                    height={150}
                  />
                  {!!dropState.selectedFile && (
                    <p className="text-sm text-zinc-400">
                      Selected File: {dropState.selectedFile.name}
                    </p>
                  )}
                  {dropState.isUploading ? (
                    <Progress value={dropState.progress} />
                  ) : (
                    <Button title="Upload" variant="outline" onClick={onUpload}>
                      Upload
                    </Button>
                  )}
                </div>
              ) : (
                <Fragment>
                  <UploadCloudIcon size={75} className="py-2" />
                  <p className="text-sm text-zinc-600">{message}</p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default FileUpload;
