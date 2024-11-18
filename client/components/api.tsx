// components/api.ts

const API_URL = "http://localhost:5000/api"; // Localhost API URL for development

export async function fetchData(endpoint: string) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'GET', // Change this to 'POST' or other methods as needed
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Fetch error:', errorMessage);
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    return response.json();
}