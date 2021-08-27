import axios from 'axios';
import { URL_CONNECT } from '@env';

export default deletePerf = async (TOKEN, idPerf) => {
  const url = URL_CONNECT;
    try {
        const response = await axios.delete(url+'deleteWeights/'+idPerf,{ headers: { Authorization: `Bearer ${TOKEN}`}});
        console.log(response.status);
      } catch (error) {
        console.error(error);
      }
  };