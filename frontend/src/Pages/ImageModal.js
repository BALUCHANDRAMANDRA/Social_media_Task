import React from 'react';
import '../Styles/ImageModal.css'; 

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imageSrc} alt="Large view" className="modal-image" />
            </div>
        </div>
    );
};

export default ImageModal;
