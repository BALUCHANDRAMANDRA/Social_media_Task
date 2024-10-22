import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Dashboard.css'; 
import ImageModal from './ImageModal'; 

export const Dashboard = () => {
    const [userForms, setUserForms] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchUserForms = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://task-rms2.onrender.com/details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserForms(response.data.data); 
            } catch (error) {
                console.error('Error fetching user forms:', error);
            }
        };

        fetchUserForms();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`https://task-rms2.onrender.com/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(response.data.message);
            setUserForms(userForms.filter((form) => form._id !== id));
        } catch (error) {
            console.error('Error deleting user form:', error);
            alert('Failed to delete user form');
        }
    };

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div className="dashboard-container">
            <h1>User Submissions Dashboard</h1>
            <div className="user-forms">
                {userForms.length > 0 ? (
                    userForms.map((form) => (
                        <div key={form._id} className="form-card">
                            <h2>{form.username}</h2>
                            <p>{form.socialMedia}</p>
                            <div className="images">
                                {form.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`https://task-rms2.onrender.com/uploads/${image}`}
                                        alt={`Uploaded ${index + 1}`}
                                        className="uploaded-image"
                                        onClick={() => openModal(`https://task-rms2.onrender.com/uploads/${image}`)} 
                                    />
                                ))}
                            </div>
                            <button onClick={() => handleDelete(form._id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No submissions found.</p>
                )}
            </div>
            <ImageModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                imageSrc={selectedImage} 
            />
        </div>
    );
};
