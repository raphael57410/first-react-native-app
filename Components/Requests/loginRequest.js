import axios from 'axios';
import { storeData } from '../../Utils/storage';
import { URL_CONNECT } from '@env';

export default loginRequest =  async (email, password, navigation,setLoader) => {
    const url = URL_CONNECT;
    setLoader(true);
    try {
        const response = await axios.post(url+'login',{
            "email": email,
            "password": password
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
        );
        navigation.navigate('Utilisiteur');
        storeData('TOKEN',response.data.token.token);

        const idUserToString = response.data.user.id.toString();
        storeData('USER',idUserToString);
        setLoader(false);
        
    }catch (error) {
        console.error(error);
        setLoader(false);
    }
}