package com.mct.Sigorta.controller;


import com.mct.Sigorta.exception.ClientNotFoundException;
import com.mct.Sigorta.model.Client;
import com.mct.Sigorta.model.Kasko;
import com.mct.Sigorta.repository.ClientRepository;
import com.mct.Sigorta.repository.KaskoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;


import java.util.List;
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private KaskoRepository kaskoRepository;
    @GetMapping("/clients")
    public List<Client> getAll(){
    return clientRepository.findAll();
    }
    //create rest-api
    @PostMapping("/clients")
    public Client createClient(@RequestBody @Valid Client client)
    {


        return clientRepository.save(client);
    }
    //get by id rest-api
    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getById(@PathVariable Long id) throws ClientNotFoundException {
        Client client=clientRepository.findById(id).orElseThrow(()-> new ClientNotFoundException("Client not found with id:"+id));

        return ResponseEntity.ok(client);

    }
    // update rest-api
    @PutMapping("/clients/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id,@RequestBody Client clientUpdate){

        Client client=clientRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));



        client.setFirstName(clientUpdate.getFirstName());
        client.setLastName(clientUpdate.getLastName());
        client.setEmail(clientUpdate.getEmail());
        client.setTelNumber(clientUpdate.getTelNumber());
        client.setKasko(clientUpdate.getKasko());
        client.setHome(clientUpdate.getHome());
        Client updatedClient = clientRepository.save(client);


        return ResponseEntity.ok(updatedClient);
    }
    //delete rest-api
    @DeleteMapping("/clients/{id}")
    public ResponseEntity<HttpStatus> deleteClient(@PathVariable long id){
        Client client = clientRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        clientRepository.delete(client);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/clients/offer/{id}")
    public ResponseEntity<Client> updateOfferClient(@PathVariable Long id,@RequestBody Client clientUpdate){
        //Long KaskoId=Long.valueOf(String.valueOf(client.getKasko().get(0)));
        Client client=clientRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));

        /*Long KaskoId=client.getKasko().iterator().next().getId();
        Kasko kasko=kaskoRepository.findById(KaskoId).orElseThrow(()-> new RuntimeException("Client not exist with id:"+KaskoId));*/


        Integer div= 80;
        /*String brand= String.valueOf(client.getKasko().get(4));
        String birth =String.valueOf(client.getKasko().get(2));
        String product=String.valueOf(client.getKasko().get(1));*/
        String brand= client.getKasko().listIterator().next().getMarka();
        String birth =String.valueOf(client.getKasko().listIterator().next().getBirth());
        String product=String.valueOf(client.getKasko().listIterator().next().getYearProduct());
        Integer MyOffer=client.getKasko().listIterator().next().getCurrentPrice();
        //client.getKasko().stream().filter(kasko-> kasko.)



        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate YearProduct = LocalDate.parse(product,formatter);
            LocalDate RefYear=LocalDate.of(2023,1,1);
            if(YearProduct.isAfter(RefYear)){
                div-=20;
            }else {
                RefYear=LocalDate.of(2020,1,1);
                if(YearProduct.isAfter(RefYear)){
                    div-=15;
                }else {
                    RefYear=LocalDate.of(2015,1,1);
                    if(YearProduct.isAfter(RefYear)) {
                        div -= 10;
                    }else {
                        RefYear=LocalDate.of(2010,1,1);
                        if(YearProduct.isAfter(RefYear)){
                            div-=5;
                        }
                    }
                }
            }

        } catch (Exception e) {
            System.out.println("Geçersiz tarih formatı!");
        }

        try {
            LocalDate BirthYear=LocalDate.parse(birth,formatter);
            int age=CalculateAge(BirthYear);
            if(age<=25||age>=50){
                div-=7;
            }
            div-=Match(brand);


        }catch (Exception e) {
            System.out.println("Geçersiz tarih formatı!");
        }

        MyOffer=MyOffer/div;

        //client.getKasko().set(7,div);
        //client.getKasko().iterator().next().setOffer(div);
        clientUpdate.getKasko().listIterator().next().setOffer(MyOffer);
        client.setKasko(clientUpdate.getKasko());
        Client updatedClient = clientRepository.save(client);


        return ResponseEntity.ok(updatedClient);

    }
    @PutMapping("/clients/home-offer/{id}")
    public ResponseEntity<Client> updateHomeOfferClient(@PathVariable Long id,@RequestBody Client clientUpdate){
        Client client=clientRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        Integer cost=5000;
        String city= client.getHome().listIterator().next().getCity();
        String buildYear=String.valueOf(client.getHome().listIterator().next().getBuildingYear());
        Integer buildCost=client.getHome().listIterator().next().getBuildCost();
        Integer floor=client.getHome().listIterator().next().getFlatFloor();
        Integer size=client.getHome().listIterator().next().getSize();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate date = LocalDate.parse(buildYear,formatter);
            Integer year = CalculateAge(date);

            if (year<=10) {
                cost+=2500;

            }else if (year>10 && year<=15) {
                cost+=2000;
            }else if (year>15 && year<=20) {
                cost+=1500;

            }else if (year>20 && year<=30) {
                cost+=1000;
            }
            cost+=CityMatch(city);
            if (2500<=buildCost && buildCost<=3500) {
                cost+=1000;
            }else if (3500<buildCost) {
                cost+=2000;
            }
            if (floor<=0) {
                cost+=1500;
            }
            if (size>=100 && size<130) {
                cost+=1000;
            }else if (size>=130 && size<160) {
                cost+=1500;
            }else if (size>=160 && size<200) {
                cost+=2000;
            }else if (size>=200) {
                cost+=3000;
            }

        }catch (Exception e) {
            System.out.println("Geçersiz tarih formatı!");
        }

        clientUpdate.getHome().listIterator().next().setOfferHome(cost);
        client.setHome(clientUpdate.getHome());
        Client updatedClient = clientRepository.save(client);


        return ResponseEntity.ok(updatedClient);

    }

    public static Integer CityMatch(String city) {
        String [] citieStringsLux= {"Ankara","İstanbul","İzmir","Antalya","Muğla","Çanakkale","Balıkesir","Gaziantep","Yalova"};
        int add=0;
        for (String i : citieStringsLux) {
            if (i.equals(city)) {
                add =3000;
                return add;

            }
        }


        return add;


    }



    public static Integer CalculateAge(LocalDate birth){
        LocalDate today=LocalDate.now();
        Period period=Period.between(birth,today);
        return period.getYears();
    }
    public static Integer Match(String brand){
        String[] Brands= {"Audi", "BMW", "Mercedes-Benz", "Ferrari",
                "Lamborghini", "Porsche","Jaguar","Land Rover","Volvo","Volkswagen","Tesla"};
        Integer sub=0;
        for(String i:Brands){
            if(i.equals(brand)){
                sub=15;
                return sub;
            }
        }
        return sub;
    }

}
