import axios from 'axios';
const CLIENT_API_URL = "http://localhost:8080/api/v1/clients";

class ClientService{
    getClient(){
        return axios.get(CLIENT_API_URL);

    }
    createClient(client){
        return axios.post(CLIENT_API_URL,client);
    }
    getClientById(clientId){
        return axios.get(CLIENT_API_URL+'/'+clientId);
    }
    updateClient(clientId,client){
        return axios.put(CLIENT_API_URL+'/'+clientId,client);
    }
    deleteClient(clientId){
        return axios.delete(CLIENT_API_URL+'/'+clientId);
    }
    updateOffer(clientId,client){
        return axios.put(CLIENT_API_URL+'/offer/'+clientId,client);
    }
    deleteKasko(kaskoId){
        return axios.delete(CLIENT_API_URL+'/kasko/'+kaskoId);
    }
    updateHomeOffer(clientId,client){
        return axios.put(CLIENT_API_URL+'/home-offer/'+clientId,client);
    }
    deleteHome(homeId){
        return axios.delete(CLIENT_API_URL+'/home/'+homeId);
    }

   
 
}
export default new ClientService()
