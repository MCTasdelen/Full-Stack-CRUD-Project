package com.mct.Sigorta.controller;

import com.mct.Sigorta.exception.HomeNotFoundException;
import com.mct.Sigorta.model.Home;
import com.mct.Sigorta.model.Kasko;
import com.mct.Sigorta.repository.ClientRepository;
import com.mct.Sigorta.repository.HomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class HomeController {
    @Autowired
    private HomeRepository homeRepository;
    @Autowired
    private ClientRepository clientRepository;
    @GetMapping("/clients/home")
    public List<Home> getHomeAll(){
        return homeRepository.findAll();
    }
    @PostMapping("/clients/home")
    public Home createHome(@RequestBody Home home){

        return homeRepository.save(home);
    }
    @GetMapping("/clients/home/{id}")
    public ResponseEntity<Home> getById(@PathVariable long id) throws HomeNotFoundException {
        Home home=homeRepository.findById(id).orElseThrow(()-> new HomeNotFoundException("Home not found by id:"+id));
        return ResponseEntity.ok(home);
    }
    @DeleteMapping("clients/home/{id}")
    public ResponseEntity<HttpStatus> deleteHome(@PathVariable long id){
        Home home=homeRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        homeRepository.delete(home);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/clients/home/{id}")
    public ResponseEntity<Home> updateHome(@PathVariable Long id,@RequestBody  Home homeUpdate){
        Home home=homeRepository.findById(id).orElseThrow(()-> new RuntimeException("Client not exist with id:"+id));
        home.setCity(homeUpdate.getCity());
        home.setCounty(homeUpdate.getCounty());
        home.setSize(homeUpdate.getSize());
        home.setBuildingYear(homeUpdate.getBuildingYear());
        home.setFlatFloor(homeUpdate.getFlatFloor());
        home.setBuildCost(homeUpdate.getBuildCost());
        home.setOfferHome(homeUpdate.getOfferHome());
        home.setClient(homeUpdate.getClient());
        Home updateHome=homeRepository.save(home);
        return ResponseEntity.ok(updateHome);
    }




}
