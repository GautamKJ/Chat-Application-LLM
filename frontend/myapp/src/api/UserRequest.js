export const getUser = async () => {
  try {
      const response = await fetch('http://localhost:5000/api/user/users');
      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      
      return data;
  } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const login = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to Login');
        }
            const responseData = await response.json();
            return responseData;
            
    
        
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };
  