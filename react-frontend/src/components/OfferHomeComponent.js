import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import ClientService from '../services/ClientService'

const OfferHomeComponent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [telNumber, setTelNumber] = useState('')
    const[city,setCity]=useState('')
    const[county,setCounty]=useState('')
    const[size,setSize]=useState('')
    const[buildingYear,setBuildingYear]=useState('')
    const[flatFloor,setFlatFloor]=useState('')
    const[buildCost,setBuildCost]=useState('')
    const[offerHome,setOfferHome]=useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    const updateHomeOffer=()=>{
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

         ClientService.updateHomeOffer(id,client).then((response)=>{
            //navigate(`/offer-kasko/${id}`)
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
    
    <div className="container">
    <div className="card-body">
    <button className="btn btn-success"
                        onClick={()=>{updateHomeOffer()}}
                        
                        >Kaydet</button><br/><br/>
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
                            <h3>Konut Bilgileri</h3><br/>
                            <h5><b>Şehir: </b><i>{city}</i></h5>
                            <h5><b>İlçe: </b><i>{county}</i></h5>
                            <h5><b>m²(Brüt): </b><i>{size}</i></h5>
                            <h5><b>Yapı Tarihi: </b><i>{buildingYear}</i></h5>
                            <h5><b>Bulunduğu Kat: </b><i>{flatFloor}</i></h5>
                            <h5><b>Yapım Maliyeti: </b><i>{buildCost}</i></h5>
                            <h5><b>Teklif: </b><i>{offerHome}</i></h5>
    
   
                        </div>
                        </div>
                    </div>
                </div>
                </form>
                </div>
                </div>
  )
}

export default OfferHomeComponent