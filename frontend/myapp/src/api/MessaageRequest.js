const baseURL = 'http://localhost:5000/api';

export const getMessages = async (id) => {
    try {
        const response = await fetch(`${baseURL}/message/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const addMessage = async (data) => {
    try {
        const response = await fetch(`${baseURL}/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to add message');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};
