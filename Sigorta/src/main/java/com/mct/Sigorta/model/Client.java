package com.mct.Sigorta.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import javax.validation.constraints.*;
import java.util.List;

@Entity
@Table(name="clients")
public class Client {

    @Id
    //@Digits(integer = 11, fraction = 0, message = "ID 11 haneli olmalıdır.")
    @Min(value = 9999999999L,message = "Tc no 11 haneli olmak zorundadır")
   @Max(value = 100000000000L,message = "Tc no 11 haneli olmak zorundadır")
    //@NotNull(message = "T.C. no boş bırakılamaz")
    //@Pattern(regexp = "^[1-9]{1}[0-9]{10}$\n",message = "Tc no formata uygun olmalıdır")
    //@Size(min = 11, max = 11, message = "TC Kimlik numarası 11 haneli olmalıdır.")

    private long id;
    @Column(name="first_name")
    @NotBlank(message = "İsim boş bırakılamaz")
    private String firstName;
    @Column(name="last_name")
    @NotBlank(message = "Soy isim boş bırakılamaz")
    private String lastName;
    @Column(name="email")
    @NotBlank(message = "Email boş bırakılamaz")
    @Email
    private String email;
    @Column(name="tel_number")
    @Pattern(regexp = "^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$"
            + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$"
            + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$",message = "Formata uygun olmalıdır")
    @NotBlank(message = "Tel no boş bırakılmaz")
    private String telNumber;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "client",fetch = FetchType.LAZY)
    @Valid
    private List<Home> home;

    @JsonManagedReference
    public List<Home> getHome() {
        return home;
    }

    public void setHome(List<Home> home) {
        this.home = home;
    }

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "client",fetch = FetchType.LAZY)
    @Valid
    private List<Kasko> kasko;
    @JsonManagedReference
    public List<Kasko> getKasko() {
        return kasko;
    }

    public void setKasko(List<Kasko> kasko) {
        this.kasko = kasko;
    }

    public Client() {

    }



    public Client(long id,
                   String firstName,
                   String lastName,
                  String email,
                   String telNumber,
                  List<Kasko> kasko,
                  List<Home> home) {
        this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telNumber = telNumber;
        this.kasko = kasko;
        this.home=home;

    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelNumber() {
        return telNumber;
    }

    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }
}
