import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../axiosClient';
import ImageItem from './ImageItem';

const ImageUploader = ({existingImages = []}) => {
    const [uploadedImages, setUploadedImages] = useState(existingImages);
    const [fileInput, setFileInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const fl = useRef(true);

    useEffect(() => {
        console.log('Component mount');
        return () => {
            console.log('Component unmount');
            fl.current = false;
        };
    },[]);

    useEffect(() => {
        setUploadedImages(existingImages); // Обновляем список при изменении существующих изображений
    }, [existingImages]);

    const handleFileChange = (e) => {
        setFileInput(e.target.files);
    };

    const uploadImage = async () => {
        if (!fileInput) return; // Если файлы не выбраны, ничего не делаем
        setLoading(true);

        try {
            // Добавляем все выбранные файлы в FormData
            for (const file of Array.from(fileInput)) {
                if (!fl.current) {
                    return;
                }
                const formData = new FormData();
                formData.append('image', file);
                const response = await axiosClient.post('/images', formData);// API для загрузки изображений
                console.log('File loaded');
                setUploadedImages((prevImages) => [...prevImages, response.data.image]); // Добавляем загруженное изображение в список
            }
            setFileInput(null); // Очищаем файловый ввод после загрузки
        } catch (error) {
            setErrors(error.response ? error.response.data : "Ошибка загрузки изображения");
        } finally {
            setLoading(false);
        }


    };

    const deleteImage = async (imageId) => {
        setLoading(true);
        try {
            await axiosClient.delete(`/images/${imageId}`); // API для удаления изображений
            setUploadedImages(uploadedImages.filter(image => image.id !== imageId)); // Удаляем изображение из списка
        } catch (error) {
            setErrors(error.response ? error.response.data : "Ошибка удаления изображения");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Выбор изображений</h2>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <button onClick={uploadImage} disabled={!fileInput || loading}>
                {loading ? 'Загрузка...' : 'Загрузить изображение'}
            </button>
            {errors && <div className="error">{errors}</div>}
            <div className="image-list">
                {uploadedImages.map(image => (
                    <ImageItem
                        key={image.id}
                        image={image}
                        onDelete={() => deleteImage(image.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;