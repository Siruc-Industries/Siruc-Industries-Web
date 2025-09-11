import axios from 'axios';
import { useApiBase } from '#imports';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = useApiBase();

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
};

export const fetchProject = async id => {
  try {
    const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
    const data = response.data;
    // Format the date if necessary
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    data.createdAt = formattedDate;
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
  }
};
