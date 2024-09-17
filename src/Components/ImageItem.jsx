import React from 'react';

const ImageItem = ({ image, onDelete }) => {
    return (
        <div className="image-item">
            <img src={image.path} alt={image.name} style={{ width: '100px', height: '100px' }} />
            <button onClick={onDelete}>Удалить</button>
        </div>
    );
};

export default ImageItem;