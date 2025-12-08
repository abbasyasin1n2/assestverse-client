import { useState, useRef } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export default function CloudinaryUploadTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadFolder, setUploadFolder] = useState('assestverse/assets');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [initStatus, setInitStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Initialize folder structure in Cloudinary
  const initializeFolders = async () => {
    setError(null);
    setInitStatus(null);
    try {
      const response = await axios.post(`${API_BASE}/cloudinary/init-folders`);
      setInitStatus(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to initialize folders');
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadResult(null);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload using signed request (recommended for production)
  const uploadWithSignature = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadResult(null);

    try {
      // Step 1: Get signature from server
      const signatureResponse = await axios.post(`${API_BASE}/cloudinary/signature`, {
        folder: uploadFolder,
      });

      const { signature, timestamp, cloudName, apiKey, folder } = signatureResponse.data;

      // Step 2: Upload directly to Cloudinary with signature
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', apiKey);
      formData.append('folder', folder);

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setUploadResult({
        method: 'Signed Upload',
        publicId: uploadResponse.data.public_id,
        url: uploadResponse.data.secure_url,
        folder: uploadResponse.data.folder,
        format: uploadResponse.data.format,
        width: uploadResponse.data.width,
        height: uploadResponse.data.height,
      });

      // Reset file input
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error?.message || err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Clear the form
  const clearForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        <h2 className="card-title text-xl flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Cloudinary Upload Test
        </h2>

        {/* Initialize Folders Section */}
        <div className="bg-base-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">1. Initialize Cloudinary Folders</h3>
              <p className="text-sm text-base-content/70">Creates assestverse/assets and assestverse/users folders</p>
            </div>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={initializeFolders}
            >
              Initialize
            </button>
          </div>
          {initStatus && (
            <div className="mt-3 p-3 bg-success/10 text-success rounded-lg text-sm">
              <pre className="whitespace-pre-wrap">{JSON.stringify(initStatus, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">2. Upload Image</h3>
          
          {/* Folder Selection */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Folder</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
            >
              <option value="assestverse/assets">assestverse/assets</option>
              <option value="assestverse/users">assestverse/users</option>
            </select>
          </div>

          {/* File Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Image</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Preview</span>
              </label>
              <div className="relative inline-block">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-w-xs max-h-48 rounded-lg border border-base-300"
                />
                <button 
                  className="btn btn-circle btn-sm btn-error absolute -top-2 -right-2"
                  onClick={clearForm}
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-base-content/70 mt-1">
                {selectedFile?.name} ({(selectedFile?.size / 1024).toFixed(1)} KB)
              </p>
            </div>
          )}

          {/* Upload Button */}
          <button 
            className={`btn btn-primary w-full ${uploading ? 'loading' : ''}`}
            onClick={uploadWithSignature}
            disabled={!selectedFile || uploading}
          >
            {uploading ? (
              <>
                <span className="loading loading-spinner"></span>
                Uploading...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload to Cloudinary
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Success Result */}
        {uploadResult && (
          <div className="bg-success/10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-success">Upload Successful!</span>
              <span className="badge badge-success badge-sm">{uploadResult.method}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Public ID:</span> {uploadResult.publicId}</p>
              <p><span className="font-medium">Folder:</span> {uploadResult.folder}</p>
              <p><span className="font-medium">Format:</span> {uploadResult.format}</p>
              <p><span className="font-medium">Dimensions:</span> {uploadResult.width} x {uploadResult.height}</p>
              <p className="break-all">
                <span className="font-medium">URL:</span>{' '}
                <a href={uploadResult.url} target="_blank" rel="noopener noreferrer" className="link link-primary">
                  {uploadResult.url}
                </a>
              </p>
            </div>

            <div className="mt-3">
              <img 
                src={uploadResult.url} 
                alt="Uploaded" 
                className="max-w-xs max-h-48 rounded-lg border border-success/30"
              />
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-base-content/50 mt-2">
          <p>• Uploads use signed requests for security</p>
          <p>• Images are uploaded to your Cloudinary account</p>
          <p>• Folder structure: assestverse/assets and assestverse/users</p>
        </div>
      </div>
    </div>
  );
}
