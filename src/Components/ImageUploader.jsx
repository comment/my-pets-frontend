import React, {useState, useEffect} from 'react';
import axiosClient from '../axiosClient';
import ImageItem from './ImageItem';

const ImageUploader = ({existingImages = []}) => {
    const [uploadedImages, setUploadedImages] = useState(existingImages);
    const [fileInput, setFileInput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setUploadedImages(existingImages); // Обновляем список при изменении существующих изображений
    }, [existingImages]);

    const handleFileChange = (e) => {
        setFileInput(e.target.files);
    };

    const uploadImage = async () => {
        console.log(uploadedImages)
        if (!fileInput) return; // Если файлы не выбраны, ничего не делаем
        setLoading(true);

        try {
            // Добавляем все выбранные файлы в FormData
            for (const file of Array.from(fileInput)) {

                const formData = new FormData();
                formData.append('image', file);
                console.log(file)
                const response = await axiosClient.post('/images', formData); // API для загрузки изображений
                setUploadedImages([...uploadedImages, response.data.image]); // Добавляем загруженное изображение в список
                console.log(uploadedImages)
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