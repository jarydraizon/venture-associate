
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VentureList from '../components/VentureList';
import '../styles/venture-page.css';

const VenturesPage = () => {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [newVenture, setNewVenture] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    const handleCreateNew = () => {
        setIsCreating(true);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewVenture({ name: '', description: '' });
    };

    const handleChange = (e) => {
        setNewVenture({
            ...newVenture,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await axios.post('/api/ventures', newVenture, { headers });
            
            if (response.data.success) {
                setIsCreating(false);
                // Redirect to the new venture page
                navigate(`/ventures/${newVenture.name}`);
            }
        } catch (error) {
            console.error('Error creating venture:', error.response || error);
            setError(error.response?.data?.error || 'Failed to create venture');
        }
    };

    return (
        <div className="ventures-page">
            <h1 className="welcome-title">Welcome to your portfolio</h1>
            <hr className="separator" />
            <div className="ventures-section">
                <h2 className="section-title">My ventures</h2>
                
                {!isCreating ? (
                    <button className="create-new" onClick={handleCreateNew}>+ Create new</button>
                ) : (
                    <div className="create-venture-form">
                        <h3>Create New Venture</h3>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Venture Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newVenture.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newVenture.description}
                                    onChange={handleChange}
                                    rows="3"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={handleCancel}>Cancel</button>
                                <button type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                )}
                
                <VentureList />
            </div>
        </div>
    );
};

export default VenturesPage;
