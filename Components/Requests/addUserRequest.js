import axios from 'axios';
import { URL_CONNECT } from '@env';

 export default addNewUser = async (email, password,navigation) => {
     const url = URL_CONNECT;
    try {
        await axios.post(url+'addUser',
          {
            "email":email,
            "roles": ["ROLE_MEMBRE"],
            "password":password,
          },
          {
            headers: {
                "Content-Type": "application/json",
            }
          }
        );
        navigation.navigate('Se Connecter');
      }catch (error) {
        console.error(error);
      }
  };