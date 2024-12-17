import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = AsyncStorage.getItem('userToken')
console.log(token)

const api = axios.create({
    baseURL: 'http://54.254.164.127/api/v1',
    headers:{
        'Content-Type':'application/json',
        Authorization: 'Bearer' + token
    }
})

export const fetchPosts = async () => {
    const token = await AsyncStorage.getItem('userToken')
    if (!token) {
        throw new Error('Token expired or not found');
    }
    console.log('Calling API with token:', token);

    try {
        const response = await api.get('/users/me', {
            method: 'GET',
            headers: {
             Authorization: 'Bearer ' + token
            } 
         });

         console.log('API Response:', response);
         if (!response.ok) {
            throw new Error('Failed to fetch user data')
         }

        const data = await response.json();
        console.log('Fetched Data:', data);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch posts: ' + error.message);
    }
}

// export const transaction = async () => {
//     try {
//         const response = await api.get('/transaction');
//         return response.data.data;
//     } catch (error) {
//         throw new Error('Failed to fetch posts: ' + error.message);
//     }
// }

export const createPost = async (postData) => {
    try {
      const response = await api.post('/users', postData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post: ' + error.message);
    }
};  

export const login = async (email, password) => {
    console.log(email, password)
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log('API response:', response.data)

        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};
  
export const register = async (name, email, password, phone_number) => {
    console.log(name, email, password, phone_number)
    try {
      const body = {
        full_name: name,
        email:email,
        password:password,
        phone_number:phone_number
      }
      const response = await api.post('/auth/register', body);
      console.log(response.data)

      const token = response.data?.token;  // Ambil token dari response
      if (!token) throw new Error('Token not found in response');

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
};

export default api