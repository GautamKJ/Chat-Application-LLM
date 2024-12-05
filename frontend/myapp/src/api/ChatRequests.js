const baseURL = 'https://chat-application-llm.onrender.com';


export const findChat = async (firstId, secondId) => {
    try {
        const response = await fetch(`${baseURL}/api/find/${firstId}/${secondId}`);
        if (!response.ok) {
            throw new Error('Failed to find chat');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error finding chat:', error);
        throw error;
    }
};
