package com.portaria.gestao.repository;

import com.portaria.gestao.model.Porteiro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PorteiroRepository extends JpaRepository<Porteiro, Long> {
    Optional<Porteiro> findByUsername(String username);
}