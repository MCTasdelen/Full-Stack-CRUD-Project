import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'

import ClientService from '../services/ClientService'

const CreateHomeComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const[city,setCity]=useState('')
    const[county,setCounty]=useState('')
    const[size,setSize]=useState('')
    const[buildingYear,setBuildingYear]=useState(new Date())
    const[flatFloor,setFlatFloor]=useState('')
    const[buildCost,setBuildCost]=useState('')
    const[offerHome,setOfferHome]=useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    

    const updateClient=(e)=>{
        const client={"id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "telNumber": telNumber,
        "home":[{
          
          "city": city,
              "county": county,
              "size": size,
              "buildingYear": buildingYear,
              "flatFloor": flatFloor,
              "buildCost": buildCost,
              "offerHome":offerHome
         }]}

         ClientService.updateClient(id,client).then((response)=>{
            console.log(response.data)
            //navigate("/offer-kasko")
            
            //setModalShow(false)
            
           }).catch(error =>{
            console.log(error);
           })
            return false
    }
    useEffect(() => {
        ClientService.getClientById(id).then((response)=>{
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmail(response.data.email)
          setTelNumber(response.data.telNumber)
          //setKasko(response.data.kasko.marka)
          response.data.home.map(
            Home =>
           {  {setCity(Home.city)}
               {setCounty(Home.county)}
               {setSize(Home.size)}
               {setBuildingYear(Home.buildingYear)}
               {setFlatFloor(Home.flatFloor)}
               {setBuildCost(Home.buildCost)}
               {setOfferHome(Home.offerHome)}
            
  
          }
          )
  
     
      
        }).catch(error =>{
          console.log(error)
        })
      }, [])
  return (
    <div><br/>
    <h2>Konut Sigortası Başvuru Formu</h2>
    <div className="container">
        <div className="card-body">
            <form>
            <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label> T.C. Kimlik: </label>
                                <input
                                 type="text"
                                 placeholder="T.C. Kimlik"
                                 name="id" 
                                 className="form-control"
                                 value={id}
                                 //onChange={(e)=>setKasko(e.target.value)}
                                readOnly
                                 />
                            </div>
                        </div>
                        <div className="col">
                        <div className="form-group">
                                <label> İsim: </label>
                                <input
                                 type="text"
                                 placeholder="İsim"
                                 name="firstName"
                                 className="form-control"
                                 value={firstName}
                                 onChange={(e)=>setFirstName(e.target.value)}
                                 />
                            </div>
                        </div>
                        <div className="col">
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
                        </div>
                        
 
                </div>
                <div className="row">
                    <div className="col">
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
                    </div>
                    <div className="col">
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
                    </div>
                    <div className="col">
                    <div className="form-group">
                            <label> Şehir: </label>
                                <input
                                type="text" 
                                placeholder="Bir şehir girin" 
                                name="city" 
                                className="form-control"
                                value={city} 
                                onChange={(e)=>setCity(e.target.value)}/>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <div className="form-group">
                    <label> İlçe: </label>
                                <input
                                type="text" 
                                placeholder="Bir ilçe girin" 
                                name="county" 
                                className="form-control"
                                value={county} 
                                onChange={(e)=>setCounty(e.target.value)}/>

                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                    <label> m²(Brüt): </label>
                                <input
                                type="text" 
                                placeholder="m²" 
                                name="size" 
                                className="form-control"
                                value={size} 
                                onChange={(e)=>setSize(e.target.value)}/>

                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                    <label> Bina Yapım Tarihi: </label>
                                <input
                                type="date" 
                                placeholder="YYYY-AA-GG" 
                                name="buildingYear" 
                                className="form-control"
                                value={buildingYear} 
                                onChange={(e)=>setBuildingYear(e.target.value)}/>

                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <div className="form-group">

                    <label> Bulunduğu Kat: </label>
                                <input
                                type="text" 
                                placeholder="" 
                                name="flatFloor" 
                                className="form-control"
                                value={flatFloor} 
                                onChange={(e)=>setFlatFloor(e.target.value)}/>
                        </div>
                        </div>
                        <div className="col">
                    <div className="form-group">

                    <label> Yapı Maliyeti: </label>
                                <input
                                type="text" 
                                placeholder="" 
                                name="buildCost" 
                                className="form-control"
                                value={buildCost} 
                                onChange={(e)=>setBuildCost(e.target.value)}/>
                        </div><br/>
                        <button className="btn btn-success"
                            onClick={(e)=>{updateClient(e)}}
                            
                            >Kaydet</button>
                      </div>
                        </div>
                       
                    
            </form>
        </div>
    </div>
        
    </div>
  )
}

export default CreateHomeComponent