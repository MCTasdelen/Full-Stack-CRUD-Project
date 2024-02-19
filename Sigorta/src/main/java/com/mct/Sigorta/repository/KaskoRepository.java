package com.mct.Sigorta.repository;

import com.mct.Sigorta.model.Kasko;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KaskoRepository extends JpaRepository<Kasko,Long> {
}
