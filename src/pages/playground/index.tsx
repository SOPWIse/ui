import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import truncate from "truncate";

import {
  type DropzoneProps as _DropzoneProps,
  type DropzoneState as _DropzoneState,
} from "react-dropzone";
import { cn } from "@/lib/utils";
import { api } from "@/interceptor/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "@/utils/handleToast";
import { Progress } from "@/components/ui";
import { fileSettingsSchema } from "@/schemas/file-settings";
import { createPaginatedResponseSchema } from "@/schemas/common";

export interface DropzoneState extends _DropzoneState {}

export interface DropzoneProps extends Omit<_DropzoneProps, "children"> {
  containerClassName?: string;
  dropZoneClassName?: string;
  children?: (dropzone: DropzoneState) => React.ReactNode;
  showFilesList?: boolean;
  showErrorMessage?: boolean;
}

const Upload = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-upload", className)}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const PDF = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-file-text", className)}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const Image = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-image", className)}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const Trash = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-trash", className)}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const DropzoneUploadPlayground = ({
  containerClassName,
  dropZoneClassName,
  children,
  showFilesList = true,
  showErrorMessage = true,
  ...props
}: DropzoneProps) => {
  const [progress, setProgress] = useState(0);
  const fileUpload = useUploadFileMutation(setProgress);
  const deleteFile = useDeleteFileByIdMutation();
  const { data: files } = useAllFilesQuery({
    page: 1,
    limit: 100,
    sortBy: "updatedAt",
    sortOrder: "asc",
  });

  const handleFileUpload = async (file: File) => {
    await fileUpload.mutateAsync(
      {
        file,
        title: file.name,
        visibility: "public",
      },
      {
        onSuccess: () => {
          handleToast({
            description: `File uploaded successfully!`,
            type: "success",
            message: "Success",
          });
        },
        onError: (error) => {
          handleToast({
            description: `Failed to upload file: ${error.message}`,
            type: "error",
            message: "Error",
            error,
          });
        },
      },
    );
  };

  // Constants:
  const dropzone = useDropzone({
    ...props,
    onDrop: async (acceptedFiles, fileRejections, event) => {
      if (props.onDrop) {
        props.onDrop(acceptedFiles, fileRejections, event);
      } else {
        // Upload each file
        for (const file of acceptedFiles) {
          await handleFileUpload(file);
        }

        if (fileRejections.length > 0) {
          let _errorMessage = `Could not upload ${fileRejections[0].file.name}`;
          if (fileRejections.length > 1) {
            _errorMessage += `, and ${fileRejections.length - 1} other files.`;
          }
          setErrorMessage(_errorMessage);
        } else {
          setErrorMessage("");
        }
      }
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>();

  const deleteUploadedFile = (index: string) => {
    deleteFile.mutate(index, {
      onSuccess: () => {
        handleToast({
          description: `File deleted successfully!`,
          type: "success",
          message: "Success",
        });
      },
      onError: (error) => {
        handleToast({
          description: `Failed to delete file: ${error.message}`,
          type: "error",
          message: "Error",
          error,
        });
      },
    });
  };

  const filesUpload = files?.data.data;

  // Return:
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <div
        {...dropzone.getRootProps()}
        className={cn(
          "flex justify-center relative flex-col items-center w-full h-32 border-dashed border-2 border-gray-200 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all select-none cursor-pointer",
          dropZoneClassName,
        )}
      >
        <input {...dropzone.getInputProps()} />
        {children ? (
          children(dropzone)
        ) : dropzone.isDragAccept ? (
          <div className="text-sm font-medium">Drop your files here!</div>
        ) : (
          <div className="flex items-center flex-col gap-1.5">
            <div className="flex items-center flex-row gap-0.5 text-sm font-medium">
              <Upload className="w-4 h-4 mr-2" /> Upload files
            </div>
            {props.maxSize && (
              <div className="text-xs font-medium text-gray-400">
                Max. file size: {(props.maxSize / (1024 * 1024)).toFixed(2)} MB
              </div>
            )}
          </div>
        )}
        <Progress
          value={progress}
          className="absolute bottom-0 w-full h-1 mt-2 mb-1 rounded-full bg-accent"
        />
      </div>

      <div></div>

      {errorMessage && (
        <span className="mt-3 text-xs text-red-600">{errorMessage}</span>
      )}
      {showFilesList && filesUpload && filesUpload.length > 0 && (
        <div
          className={`flex flex-col gap-2 w-full ${
            filesUpload.length > 2 ? "h-48" : "h-fit"
          } mt-2 ${filesUpload.length > 0 ? "pb-2" : ""}`}
        >
          <div className="w-full">
            {filesUpload.map((fileUploaded, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between w-full h-16 px-4 mt-2 border-2 border-gray-200 border-solid rounded-lg shadow-sm"
              >
                <div className="flex flex-row items-center h-full gap-4">
                  {fileUploaded.title.includes("pdf") ? (
                    <PDF className="w-6 h-6 text-rose-700" />
                  ) : (
                    <Image className="w-6 h-6 text-rose-700" />
                  )}
                  <div className="flex flex-col gap-0">
                    <div className="text-[0.85rem] font-medium leading-snug">
                      {truncate(
                        fileUploaded.title.split(".").slice(0, -1).join("."),
                        30,
                      )}
                    </div>
                    <div className="text-[0.7rem] text-gray-500 leading-tight">
                      .{fileUploaded.title.split(".").pop()} •{" "}
                    </div>
                  </div>
                </div>
                <div
                  className="p-2 transition-all border-2 border-gray-100 border-solid rounded-full shadow-sm cursor-pointer select-none hover:bg-accent"
                  onClick={() => deleteUploadedFile(fileUploaded.id)}
                >
                  <Trash className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropzoneUploadPlayground;

export const useUploadFileMutation = (
  onProgressUpdate: (progress: number) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any): Promise<any> => {
      const formData = new FormData();
      formData.append("file", payload?.file);
      formData.append("title", payload?.title || "");
      formData.append("visibility", payload?.visibility);

      const response = await api.post("/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          onProgressUpdate(percentCompleted);
          console.log("Upload progress:", percentCompleted);
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
};

const paginatedSOPSchema = createPaginatedResponseSchema(fileSettingsSchema);

const useAllFilesQuery = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  searchFields?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: ["files", params],
    queryFn: async () => {
      const response = await api.get("/files/all", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 8,
          search: params?.search,
          searchFields: params?.searchFields,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
        },
      });
      return paginatedSOPSchema.parse(response?.data);
    },
  });
};

const useDeleteFileByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<any> => {
      const response = await api.delete(`/files/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });
};
