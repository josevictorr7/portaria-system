package com.portaria.gestao.repository;

import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.RegistroPortaria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface RegistroPortariaRepository extends JpaRepository<RegistroPortaria, Long> {

    RegistroPortaria findFirstByFuncionarioAndHoraSaidaIsNullOrderByHoraEntradaDesc(Funcionario funcionario);

    List<RegistroPortaria> findByHoraEntradaBetween(LocalDateTime start, LocalDateTime end);

    /**
     * Retorna os documentos (por exemplo CPF) dos funcionários que têm um registro ativo (horaSaida IS NULL).
     * Mudança intencional: retornamos String (documento) para facilitar o consumo no frontend.
     */
    @Query("SELECT DISTINCT r.funcionario.documento FROM RegistroPortaria r WHERE r.horaSaida IS NULL")
    List<String> findFuncionariosComEntradaAtiva();
}
