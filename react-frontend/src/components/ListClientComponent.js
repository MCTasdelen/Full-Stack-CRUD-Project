import React,{useState,useEffect} from 'react'
import ClientService from '../services/ClientService'
import { Link } from 'react-router-dom'
import { MDBBtn } from 'mdb-react-ui-kit'
import Popup from './Popup'




const ListClientComponent = () => {
  const [modalShow, setModalShow] = useState(false)
    const [clients, setClients] = useState([])
    const [c, setC] = useState('')
    /*const click=()=>{
      var x= document.getElementById('as').innerHTML
      setC(x)
    }*/
    

    
    useEffect(() => {
    getAll();
    }, [])

    const getAll=() =>{
        ClientService.getClient().then((response)=> {
            setClients(response.data)
            console.log(response.data);
    
         }).catch(eror=>{
            console.log(eror);
         })
    }
    const deleteClient=(clientId)=>{
        ClientService.deleteClient(clientId).then((response)=>{
            getAll()
        }).catch(eror=>{
        console.log(eror);
     })
    }

  return (
    <div >
        <h2 className="text-center">Müşteriler</h2>
        <div className="row">
        
        <a href='/add-client'><button className="btn btn-outline-success" type="submit">Müşteri Ekle</button></a>
        <br/><br/>
        
        </div>
        
        <div className="row">
            <table className="table table-striped table-white">
                <thead>
                    <tr>
                        <th>T.C. Kimlik</th>
                        <th>İsim</th>
                        <th>Soyisim</th>
                        <th>Email</th>
                        <th>Tel No</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.map(
                            client =>
                           
                            <tr key={client.id}>
                                <td id="as">{client.id}</td>
                                <td>{client.firstName}</td>
                                <td>{client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{client.telNumber}</td>
                                <td>
                                    <Link  to={`/edit-client/${client.id}`}><MDBBtn outline  className='mx-2' color='info'>Güncelle</MDBBtn></Link>
                                    <MDBBtn outline  className='mx-2' color='danger' onClick={()=> deleteClient(client.id)}
                                    style={{marginLeft:"5px"}}>Sil</MDBBtn>
                                    <MDBBtn outline  className='mx-2' color='success' 
                                    onClick={() => {setModalShow(true);setC(document.getElementById('as').innerHTML)}}
                                    style={{marginLeft:"5px"}}>Hizmetler</MDBBtn>
                                   <Popup
                                   id={c}
                                   show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    />
                                    


                                    
                                   
                                      
                                </td>
                            </tr>
                        )
                        
                    }
                 
                </tbody>
            </table>
            
        </div>

      </div>
  )
}

export default ListClientComponent