import axios from 'axios';
import { URL_CONNECT } from '@env';

export default addPerfRequest = async (TOKEN, name, firstCharge, secondCharge, userId, fetchAllData) => {
  const url = URL_CONNECT;
  const firstChargeToNumber = parseInt(firstCharge);
    const secondChargeToNumber = parseInt(secondCharge);
    const userIdToNumber = parseInt(userId);
    try {
        const response = await axios.post(url+'addWeight',
            {
                "name": name,
                "firstWeight": firstChargeToNumber,
                "secondWeight": secondChargeToNumber,
                "user": userIdToNumber,
            },
            { 
              headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}` 
              }
            });
        console.log(response.status);
        fetchAllData();
      } catch (error) {
        console.error(error);
      }
  };