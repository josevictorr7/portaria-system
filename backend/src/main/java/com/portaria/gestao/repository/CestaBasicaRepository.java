package com.portaria.gestao.repository;

import com.portaria.gestao.model.CestaBasicaBeneficiario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CestaBasicaRepository extends JpaRepository<CestaBasicaBeneficiario, Long> {
    List<CestaBasicaBeneficiario> findByMesReferencia(String mesReferencia);
}
