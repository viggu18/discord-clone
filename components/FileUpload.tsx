"use client";
import { FC, Fragment, useState, MouseEventHandler } from "react";
import Dropzone from "react-dropzone";
import { FileIcon, LoaderIcon, UploadCloudIcon } from "lucide-react";
import { uploadProfilePhoto, getFileURL } from "@/firebase";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface FileUploaderProps {
  message?: string;
  type?: "image";
  onChange?(url?: string): void;
}

const FileUpload: FC<FileUploaderProps> = ({
  message = "Drag drop some files here, or click to select files",
  type = "image",
  onChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function _onDrop(accpeted: File[]) {
    if (accpeted.length) setSelectedFile(accpeted[0]);
  }

  async function onUpload(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (selectedFile) {
      setUploading(true);
      const interval = setInterval(() => {
        setProgress((prev) => prev + 2);
      }, 50);

      await uploadProfilePhoto(selectedFile).then((res) => {
        clearInterval(interval);
        setProgress(100);

        const url = getFileURL(res.ref.name);
        onChange && onChange(url);

        setSelectedFile(undefined);
        setProgress(0);
      });

      setUploading(false);
    }
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
              {selectedFile ? (
                <div className="flex flex-col gap-4 items-center min-w-full">
                  <FileIcon size={75} />
                  <p className="text-sm text-zinc-400">
                    Selected File: {selectedFile.name}
                  </p>
                  {uploading ? (
                    <Progress value={progress} />
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
