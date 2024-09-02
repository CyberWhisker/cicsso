// userApi.js

import { toast } from "react-toastify";

// Fetch all Users
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

// Fetch all Users
export const fetchUserById = async (id) => {
    try {
        // Fetch user data
        const userResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        });

        // Fetch user roles
        const rolesResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${id}/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            }
        });

        // Check if both requests are successful
        if (!userResponse.ok || !rolesResponse.ok) {
            throw new Error('Failed to fetch user or roles');
        }

        // Parse the JSON responses
        const dataUser = await userResponse.json();
        const dataRoles = await rolesResponse.json();

        // Combine user data and roles
        const combinedData = {
            ...dataUser,
            roles: dataRoles
        };

        return { data: combinedData, error: null };

    } catch (error) {
        return { data: null, error };
    }
};

export const updateUserRole = async(userData, selectedRole) => {
    try {
        // Step 1: Remove existing roles
        const removeResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${userData.user_id}/roles`, {
            method: 'DELETE',  // Use DELETE to remove existing roles
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            body: JSON.stringify({ roles: userData.roles.map(role => role.id) })  // Send all current roles to remove
        });
        
        if (!removeResponse.ok) {
            const errorData = await removeResponse.json();
            console.log('Failed to remove roles:', errorData);
            return;  // Exit if role removal fails
        }

        // Step 2: Assign the new role
        const assignResponse = await fetch(`${import.meta.env.VITE_AUTH0_API}/api/v2/users/${userData.user_id}/roles`, {
            method: 'POST',  // Use POST to assign the new role
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            body: JSON.stringify({ roles: [selectedRole] })  // Send the new selected role as an array
        });
        
        if (assignResponse.ok) {
            toast.success("Role successfully updated");
        } else {
            const errorData = await assignResponse.json();
            console.log('Failed to assign role:', errorData);
        }
    } catch (error) {
        console.log('Error updating role:', error);
    }
}
