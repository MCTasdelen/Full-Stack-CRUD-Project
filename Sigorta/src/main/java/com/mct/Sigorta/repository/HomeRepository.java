package com.mct.Sigorta.repository;

import com.mct.Sigorta.model.Home;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomeRepository  extends JpaRepository<Home,Long> {
}
