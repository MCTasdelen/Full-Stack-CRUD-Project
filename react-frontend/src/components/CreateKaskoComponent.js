
import React,{useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'

import ClientService from '../services/ClientService'



const CreateKaskoComponent = () => {
    const [modalShow,setModalShow]=useState(true)
    const [offer,setOffer]=useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const[kaskoId,setKaskoId]=useState('')
    const [yearProduct,setYearProduct]=useState(new Date())
    const [birth,setBirth]=useState(new Date())
    const [model,setModel]=useState('')
    const [marka,setMarka]=useState('')
    const [chassisNumber,setChassisNumber]=useState('')
    const [currentPrice,setCurrentPrice]=useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    

    
    
    const updateClient=(e)=>{
        
        //e.preventDefualt()
       //const kasko=[{yearProduct,birth,model,marka,chassisNumber,currentPrice}]
       /*const kasko=[{
        "yearProduct": yearProduct,
            "birth": birth,
            "model": model,
            "marka": marka,
            "chassisNumber": chassisNumber,
            "currentPrice": currentPrice
       }]*/
        const client={"id": id,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "telNumber": telNumber,
        "kasko":[{
          
          "yearProduct": yearProduct,
              "birth": birth,
              "model": model,
              "marka": marka,
              "chassisNumber": chassisNumber,
              "currentPrice": currentPrice
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
        response.data.kasko.map(
          kas =>
         {  {setKaskoId(kas.id)}
           {setBirth(kas.birth)}
          {setYearProduct(kas.yearProduct)}
          {setModel(kas.model)}
          {setMarka(kas.marka)}
          { setChassisNumber(kas.chassisNumber)}
          {setCurrentPrice(kas.currentPrice)}
          {setOffer(kas.offer)}
          

        }
        )

   
    
      }).catch(error =>{
        console.log(error)
      })
    }, [])
  return (
    <div><br/>
        <h2 className="text-center">Taşıt Kasko Başvuru Formu</h2><br/>
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

                    <label> Doğum Tarihi: </label>
                                <input
                                type="date" 
                                placeholder="YYYY-AA-GG" 
                                name="birth" 
                                className="form-control"
                                value={birth} 
                                onChange={(e)=>setBirth(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                          <div className="col">
                              <label> Şasi No: </label>
                                <input
                                type="text" 
                                placeholder="17 haneli şasi no giriniz" 
                                name="chassisNumber" 
                                className="form-control"
                                value={chassisNumber} 
                                onChange={(e)=>setChassisNumber(e.target.value)}/>
                           </div>
                           <div className="col">
                           <label> Araç Rayiç Bedeli: </label>
                                <input
                                type="text" 
                                placeholder="" 
                                name="currentPrice" 
                                className="form-control"
                                value={currentPrice} 
                                onChange={(e)=>setCurrentPrice(e.target.value)}/>
                           </div>
                           <div className="col">
                           <label> Marka: </label>
                                <input
                                type="text" 
                                placeholder="" 
                                name="marka" 
                                className="form-control"
                                value={marka} 
                                onChange={(e)=>setMarka(e.target.value)}/>
                           </div>
                          

                </div>
                <div className="row">
                      <div className="col">
                           <label> Model: </label>
                                <input
                                type="text" 
                                placeholder="" 
                                name="model" 
                                className="form-control"
                                value={model} 
                                onChange={(e)=>setModel(e.target.value)}/>
                           </div>
                           <div className="col">
                           <label> Araç Üretim Tarihi: </label>
                                <input
                                type="date" 
                                placeholder="YYYY-AA-GG" 
                                name="yearProduct" 
                                className="form-control"
                                value={yearProduct} 
                                onChange={(e)=>setYearProduct(e.target.value)}/>
                               
                           </div>



                           </div>
                        

                      
                    
                          <br/>
                           <button className="btn btn-success"
                            onClick={(e)=>{updateClient(e);navigate(`/offer-kasko/${id}`)}}
                            
                            >Kaydet</button>
                                <Link to="/clients" className="btn btn-danger" style={{marginLeft:"20px"}}> Cancel </Link>
                               
                    </form>
                </div>
            </div>
            
    </div>
  )
}

export default CreateKaskoComponent