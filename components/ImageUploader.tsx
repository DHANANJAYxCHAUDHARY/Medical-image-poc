
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l-4-4m0 0l4-4m-4 4h12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    if (rejectedFiles && rejectedFiles.length > 0) {
        setError('File type not accepted. Please upload a PNG, JPG, or WEBP file.');
        return;
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/webp': ['.webp']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`group w-full p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ${isDragActive ? 'border-sky-500 bg-sky-100' : 'border-slate-300 bg-slate-50 hover:border-sky-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-center">
        <UploadIcon />
        {isDragActive ? (
          <p className="text-sky-600 font-semibold text-lg mt-4">Drop the image here...</p>
        ) : (
          <>
            <p className="text-slate-700 font-semibold text-lg mt-4">Drag & drop an X-ray image here</p>
            <p className="text-slate-500 my-2">or</p>
            <button
                type="button"
                className="px-5 py-2 bg-white text-sky-600 font-semibold rounded-md border border-sky-600 hover:bg-sky-50 transition-colors"
            >
                Browse File
            </button>
            <p className="text-xs text-slate-400 mt-4">Supports: PNG, JPG, WEBP</p>
          </>
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};
