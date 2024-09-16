import React, { useState } from 'react';
import axiosClient from "../axiosClient.js";

const ImageUploader = ({ entity_id, onUploadComplete }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        console.log(files)
        setUploadProgress({});
    };

    const uploadFiles = async () => {
        setUploading(true);
        const uploadedFilesData = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('entity_id', entity_id);
            formData.append('image', file);
            console.log(file)
            try {
                const response = await axiosClient.post('/upload-images', formData, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        // Обновляем состояние прогресса
                        setUploadProgress(prevProgress => ({
                            ...prevProgress,
                            [files[0].name]: percentCompleted // Предполагаем, что мы показываем прогресс только для первого файла
                        }));
                    }
                });
                console.log(response)
                uploadedFilesData.push(response.data.paths[0]);
            } catch (error) {
                console.error('Ошибка при загрузке файла:', error);
            }
        }

        setUploading(false);
        onUploadComplete(uploadedFilesData);
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={uploadFiles} disabled={uploading || files.length === 0}>
                Загрузить изображения
            </button>

            {files.map((file) => (
                <div key={file.name}>
                    <p>{file.name}</p>
                    {uploading && uploadProgress[file.name] !== undefined && (
                        <div style={{ width: '100%', backgroundColor: '#f3f3f3' }}>
                            <div
                                style={{
                                    width: `${uploadProgress[file.name]}%`,
                                    height: '10px',
                                    backgroundColor: '#4caf50'
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImageUploader;