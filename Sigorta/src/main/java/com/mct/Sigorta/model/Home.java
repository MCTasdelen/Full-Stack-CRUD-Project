package com.mct.Sigorta.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name="home")
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(name = "city")
    private String city;
    @Column(name = "county")
    private String county;
    @Positive(message = "ev boyutu negatif olamaz")
    @Column(name = "size")
    private Integer size;
    @PastOrPresent(message = "Gelecekteki bir tarih girilemez")
    @Column(name="buildingYear")
    @Temporal(TemporalType.DATE)
    private Date buildingYear;
    @Column(name = "flatFloor")
    private Integer flatFloor;
    @Positive(message = "Yapı maliyeti negatif olamaz")
    @Column(name = "buildCost")
    private Integer buildCost;
    @Column(name = "offerHome")
    private Integer offerHome;
    @ManyToOne
    //@JoinColumn(name="client_id",referencedColumnName = "id")
    @JoinColumn(name="client_id")
    private Client client;

    @JsonBackReference
    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Home(){

    }

    public Home(long id, String city, String county, Integer size, Date buildingYear, Integer flatFloor, Integer buildCost, Integer offerHome,Client client) {
        this.id = id;
        this.city = city;
        this.county = county;
        this.size = size;
        this.buildingYear = buildingYear;
        this.flatFloor = flatFloor;
        this.buildCost = buildCost;
        this.offerHome = offerHome;
        this.client=client;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Date getBuildingYear() {
        return buildingYear;
    }

    public void setBuildingYear(Date buildingYear) {
        this.buildingYear = buildingYear;
    }

    public Integer getFlatFloor() {
        return flatFloor;
    }

    public void setFlatFloor(Integer flatFloor) {
        this.flatFloor = flatFloor;
    }

    public Integer getBuildCost() {
        return buildCost;
    }

    public void setBuildCost(Integer buildCost) {
        this.buildCost = buildCost;
    }

    public Integer getOfferHome() {
        return offerHome;
    }

    public void setOfferHome(Integer offerHome) {
        this.offerHome = offerHome;
    }
}
