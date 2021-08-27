import axios from 'axios';
import { URL_CONNECT } from '@env';

export default updateRequest =  async (TOKEN, name, firstCharge, secondCharge, currentUserId, idPerf) => {
    const url = URL_CONNECT;
    try {
        await axios.patch(url+'updateWeights/'+idPerf,{
            "name": name,
            "firstWeight": firstCharge,
            "secondWeight": secondCharge,
            "user": currentUserId,
          },
          { 
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${TOKEN}`
            }
          }
        );
    }catch (error) {
        console.error(error);
    }
}