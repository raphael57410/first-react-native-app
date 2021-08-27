import axios from 'axios';
import { URL_CONNECT } from '@env';

export default itemUserRequest =  async (TOKEN, setData) => {
  const url = URL_CONNECT;
    try {
        const response = await axios.get(url+'weights',{ headers: 
          { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
           }
        });
        const dataToJson = response.data;
        setData(dataToJson);
      } catch (error) {
        console.error(error);
      }
}