import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import ClientService from '../services/ClientService'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'




const CreateClientComponent = () => {
    
    
    const schema = yup.object().shape({
        firstName: yup.string().required("dfdffd")
    })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver: yupResolver(schema)
    })
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const navigate=useNavigate()
    
    
    const saveClient=(e)=>{
        
       // e.preventDefualt()
        const client={id,firstName,lastName,email,telNumber}
        ClientService.createClient(client).then((response)=>{
            console.log(response.data)
            //navigate('/clients')
        }).catch(eror=>{
            console.log(eror)
        })
        return false;

    }

     const onSubmit=(data)=>{
        console.log(data);
     }
  return (
    <div  >
        <br/>
        <div className="container">
                <div className="row">
                    <div className="card col-md-4 offset-md-4 offset-md-4">
                        <h3 className="text-center">Kasko Başvuru Formu</h3>
                        <div className="card-body">
                            <form  onSubmit={handleSubmit(onSubmit)}>
                                <div className='row'></div>
                                    <div className="form-group">
                                        <label> T.C. Kimlik: </label>
                                        <input
                                         
                                         type="text"
                                         placeholder="T.C. Kimlik"
                                         name="id" 
                                         className="form-control"
                                         value={id}
                                         onChange={(e)=>setId(e.target.value)}
                                         //{...register("id",{required:"T.C. No kısmı boş bırakılamaz"})}
                                    
                                         
                                         />
                                         
                                         
                                         
                                    </div>
                                    <div className="form-group">
                                        <label> İsim: </label>
                                        
                                        <input
                                        {...register("firstName")}
                                         type="text"
                                         placeholder="İsim"
                                         name="firstName"
                                         className="form-control"
                                         value={firstName}
                                         onChange={(e)=>setFirstName(e.target.value)}/>
                                         <font color="red">{errors.firstName?.message}</font>
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
                                <button className="btn btn-success" type="submit" onClick={(e)=>saveClient(e)}>Kaydet</button>
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

export default CreateClientComponent