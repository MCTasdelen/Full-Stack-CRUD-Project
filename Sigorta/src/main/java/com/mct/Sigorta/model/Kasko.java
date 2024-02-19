package com.mct.Sigorta.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="kasko")

public class Kasko {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @PastOrPresent(message = "Gelecekteki bir tarih girilemez")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name="yearProduct")
    @Temporal(TemporalType.DATE)
    private Date yearProduct;
    @Past(message = "Gelecekteki bir tarih girilemez")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name="birth")
    @Temporal(TemporalType.DATE)
    private Date birth;
    @Column(name="model")
    private String model;
    @Column(name="marka")
    private String marka;
   @Size(min = 17,max = 17,message = "Hatalı şasi  no girişi")
    @Column(name="chassisNumber")
    private String chassisNumber;
    @Positive(message = " Rayiç bedeli Negatif bir deger olamaz")
    @Column(name="currentPrice")
    private int currentPrice;
    @Column(name="offer")
    private int offer;






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



    public Kasko(){

    }

    public Kasko(long id, Date yearProduct, Date birth, String model, String chassisNumber, int currentPrice,int offer,Client client) {
        this.id = id;
        this.yearProduct = yearProduct;
        this.birth = birth;
        this.model = model;
        this.marka=marka;
        this.chassisNumber = chassisNumber;
        this.currentPrice = currentPrice;
        this.offer=offer;
        this.client=client;


    }

    public String getMarka() {
        return marka;
    }

    public void setMarka(String marka) {
        this.marka = marka;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getYearProduct() {
        return yearProduct;
    }

    public void setYearProduct(Date yearProduct) {
        this.yearProduct = yearProduct;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public void setChassisNumber(String chassisNumber) {
        this.chassisNumber = chassisNumber;
    }

    public int getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(int currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Integer getOffer() {
        return offer;
    }

    public void setOffer(Integer offer) {
        this.offer = offer;
    }
}
