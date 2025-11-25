package com.portaria.gestao.repository;

import com.portaria.gestao.model.Funcionario;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    // traz funcionario + colecao veiculos já inicializada (evita lazy init)
    @EntityGraph(attributePaths = {"veiculos"})
    List<Funcionario> findByAtivoTrue();

    Optional<Funcionario> findByDocumento(String documento);
}
