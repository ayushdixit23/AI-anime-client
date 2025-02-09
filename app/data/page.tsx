"use client"
import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/helper';

const Data = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const api = "http://localhost:2422/api"

  const animeId = "death-note-8615"

  const episodeName = "Episode 2"
  const episodeNumber = 2

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Step 1: Request presigned URL from the backend
      const uploadData = {
        filename: file.name,
        filetype: file.type,
        animeId
      }

      const { data } = await axios.post(`${api}/generate-presigned-urls`, uploadData);

      if (!data.success) {
        setMessage('Failed to get presigned URL');
        setUploading(false);
        return;
      }

      const { presignedUrl, filename } = data;

      // Step 2: Upload the file to the presigned URL
      const uploadConfig = {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentage);
          }
        },
      };

      const response = await axios.put(presignedUrl, file, uploadConfig);

      if (response.status === 200) {

        const res = await axios.post(`${api}/uploadepisode/anime/${animeId}`, { filename, episodeName })
        if (res.data.success) {
          toast.success(response.data.message)
        }

      }

      setUploading(false);
      setMessage('File uploaded successfully!');
      setProgress(0); // Reset progress after upload
    } catch (error) {
      setUploading(false);
      setMessage('Upload failed');
      console.error(error);
      errorHandler(error)
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>

      {uploading && <div>Uploading: {progress}%</div>}

      {message && <div>{message}</div>}
    </div>
  );
};

export default Data;
