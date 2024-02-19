import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import ClientService from '../services/ClientService'

const UpdateClientComponent = () => {
    //const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    
    const updateClient=(e)=>{
        
       // e.preventDefualt()
        const client={id,firstName,lastName,email,telNumber}
       ClientService.updateClient(id,client).then((response)=>{
        navigate('/clients')
       }).catch(error =>{
        console.log(error);
       })
        return false;

    }
    useEffect(() => {
      ClientService.getClientById(id).then((response)=>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setTelNumber(response.data.telNumber)
      }).catch(error =>{
        console.log(error)
      })
    }, [])
    


  return (
    <div>
        <br/>
        <div className="container">
                <div className="row">
                    <div className="card col-md-4 offset-md-4 offset-md-4">
                        <h3 className="text-center">Güncelleme Formu</h3>
                        <div className="card-body">
                            <form>
                                <div className='row'></div>
                                    <div className="form-group">
                                        <label> T.C. Kimlik: </label>
                                        <input
                                         type="text"
                                         placeholder="T.C. Kimlik"
                                         name="id" 
                                         className="form-control"
                                         value={id}
                                         //onChange={(e)=>setId(e.target.value)}
                                         readOnly
                                         />
                                    </div>
                                    <div className="form-group">
                                        <label> İsim: </label>
                                        <input
                                         type="text"
                                         placeholder="İsim"
                                         name="firstName"
                                         className="form-control"
                                         value={firstName}
                                         onChange={(e)=>setFirstName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Soy İsim: </label>
                                        <input
                                        type="text" 
                                        placeholder="Soy İsim" 
                                        name="lastName" 
                                        className="form-control"
                                        value={lastName} 
                                        onChange={(e)=>setLastName(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Email: </label>
                                        <input
                                        type="text" 
                                        placeholder="name@example.com" 
                                        name="email" 
                                        className="form-control"
                                        value={email} 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Tel No: </label>
                                        <input
                                        type="text" 
                                        placeholder="+90(532)532 32 32" 
                                        name="telNumber" 
                                        className="form-control"
                                        value={telNumber} 
                                        onChange={(e)=>setTelNumber(e.target.value)}/>
                                </div>
                                <br/>
                                <button className="btn btn-success" onClick={(e)=>updateClient(e)}>Kaydet</button>
                                <Link to="/clients" className="btn btn-danger"> Cancel </Link>

                            </form>


                        </div>
                    </div>
                </div>
            </div>
            <br/>
            

    </div>
  )
}

export default UpdateClientComponent