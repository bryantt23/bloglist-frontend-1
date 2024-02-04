// components/Users.js
import React, { useState, useEffect } from 'react';
import usersService from '../services/users'; // Adjust the import path as needed
import { useParams } from 'react-router-dom';

function User() {
    const { id } = useParams()
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const allUsers = await usersService.getAll();
            console.log("🚀 ~ fetchUserData ~ allUsers:", allUsers)
            const targetUser = allUsers.find(user => user._id === id)
            setUserData(targetUser)
        };
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>; // Or some other placeholder content
    }

    return (
        <div>
            <h2>{userData.name}</h2>
            <h3>Added blogs</h3>
            {userData.blogs && userData.blogs.length > 0 ? (
                <ul>
                    {userData.blogs.map(blog => (
                        <li key={blog._id}>{blog.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
    );
}

export default User;
