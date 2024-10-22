import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/userForm.css';

export const UserForm = () => {
    const [username, setUsername] = useState('');
    const [socialMedia, setSocialMedia] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));  
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('socialMedia', socialMedia);

        images.forEach((image) => formData.append('images', image));

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('https://task-rms2.onrender.com/user-form', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            setUsername(''); 
            setSocialMedia(''); 
            setImages([]);
            document.querySelector('input[type="file"]').value = null;

        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit user data');
        }
    };

    return (
        <div className="form-container">
            <h1>User Submission Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Social Media Handle:</label>
                    <input
                        type="text"
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Upload Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};
