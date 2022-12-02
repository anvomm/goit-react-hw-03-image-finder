import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '30530922-b2ca10c8a64b9d14f98bafcf1';

export async function fetchPictures(searchWord) {
  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: searchWord,
        per_page: 12,
        page: 1,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
