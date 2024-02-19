import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import ClientService from '../services/ClientService'
import { MDBBtn } from 'mdb-react-ui-kit'


const OfferComponent = () => {
  const [modalShow, setModalShow] = useState(false)
    const {id}=useParams()
    const[offer,setOffer]=useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const[kaskoId,setKaskoId]=useState('')
    const [yearProduct,setYearProduct]=useState('')
    const [birth,setBirth]=useState('')
    const [model,setModel]=useState('')
    const [marka,setMarka]=useState('')
    const [chassisNumber,setChassisNumber]=useState('')
    const [currentPrice,setCurrentPrice]=useState('')
    const navigate=useNavigate()



    const updateOffer=()=>{
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
              "currentPrice": currentPrice,
              "offer":offer
         }]}
         ClientService.updateOffer(id,client).then((response)=>{
            navigate(`/offer-kasko/${id}`)
            console.log(response.data)

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
    <div>
        <div className="container">
        <div className="card-body">
        <MDBBtn outline  className='mx-2' color='success' 
                                    onClick={(e) => {updateOffer(e)}}
                                    style={{marginLeft:"5px"}}>Hizmetler</MDBBtn>
        <form>
        
        
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <div align="right">
                                <h3>İletişim Bilgileri</h3><br/>
                                <h5><b>İsim: </b><i>{firstName}</i></h5>
                                <h5><b>Soyisim: </b><i>{lastName}</i></h5>
                                <h5><b>Email: </b><i>{email}</i></h5>
                                <h5><b>Tel: </b><i>{telNumber}</i></h5>
        
       
                            </div>
                            </div>
                        </div>
                    
                        <div className="col">
                            <div className="form-group">
                            <div align="left">
                                <h3>Kasko Bilgileri</h3><br/>
                                <h5><b>Üretim Tarihi: </b><i>{yearProduct}</i></h5>
                                <h5><b>Doğum Tarihi: </b><i>{birth}</i></h5>
                                <h5><b>Model: </b><i>{model}</i></h5>
                                <h5><b>Marka: </b><i>{marka}</i></h5>
                                <h5><b>Şasi No: </b><i>{chassisNumber}</i></h5>
                                <h5><b>Rayiç Bedeli: </b><i>{currentPrice}</i></h5>
                              
        
       
                            </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                            <h5><b>Kasko Ücreti: </b><i>{offer}</i></h5>

                                </div>
                            </div>
                    </div>

       
        </form>
        </div>
        </div>
    </div>
  )
}

export default OfferComponent