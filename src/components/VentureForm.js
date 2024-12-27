import React, { useState } from 'react';
import axios from 'axios';

const VentureForm = () => {
    console.log('VentureForm rendered');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log('Token payload:', JSON.parse(atob(token.split('.')[1])));

        try {
            const response = await axios.post('/api/ventures', 
                { name, description },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            setMessage(`Venture created successfully! (ID: ${response.data.ventureId})`);
            setName('');
            setDescription('');
        } catch (error) {
            setMessage(`Error: ${error.response.data.error}`);
        }
    };

    return (
        <div>
            <h2>Add a Venture</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Venture Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VentureForm;