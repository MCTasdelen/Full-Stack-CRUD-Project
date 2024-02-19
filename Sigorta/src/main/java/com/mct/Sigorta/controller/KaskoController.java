package com.mct.Sigorta.controller;

import com.mct.Sigorta.exception.KaskoNotFoundException;
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
import java.util.List;
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class KaskoController {
    @Autowired
    private KaskoRepository kaskoRepository;
   @Autowired
   private ClientRepository clientRepository;

    @GetMapping("/clients/kasko")
    public List<Kasko> getKaskoAll(){
        return kaskoRepository.findAll();
    }
    //create rest-api
    @PostMapping("/clients/kasko")
    public Kasko createKasko(@RequestBody  @Valid Kasko kasko){
        //Client client=clientRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        //kaskoRepository.save(kasko);
        //client.addKasko(kasko);
       //client.setKasko(kaskoRepository.findAll());

        return kaskoRepository.save(kasko);
    }
    //get by id rest-api
    @GetMapping("/clients/kasko/{id}")
    public ResponseEntity<Kasko> getById(@PathVariable long id) throws KaskoNotFoundException {
        Kasko kasko=kaskoRepository.findById(id).orElseThrow(()-> new KaskoNotFoundException("Kasko not found by id:"+id));
        return ResponseEntity.ok(kasko);
    }
    // update rest-api,
    @PutMapping("/clients/kasko/{id}")
    public ResponseEntity<Kasko> updateKasko(@PathVariable Long id,@RequestBody Kasko kaskoUpdate)
    {
        Kasko kasko=kaskoRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        kasko.setBirth(kaskoUpdate.getBirth());
        kasko.setChassisNumber(kaskoUpdate.getChassisNumber());
        kasko.setCurrentPrice(kaskoUpdate.getCurrentPrice());
        kasko.setMarka(kaskoUpdate.getMarka());
        kasko.setModel(kaskoUpdate.getModel());
        kasko.setYearProduct(kaskoUpdate.getYearProduct());
        kasko.setOffer(kaskoUpdate.getOffer());
        kasko.setClient(kaskoUpdate.getClient());

        Kasko updateKasko=kaskoRepository.save(kasko);
        return ResponseEntity.ok(updateKasko);

    }
    @DeleteMapping("clients/kasko/{id}")
    public ResponseEntity<HttpStatus> deleteKasko(@PathVariable long id){
        Kasko kasko =kaskoRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        kaskoRepository.delete(kasko);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
