package com.portaria.gestao.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegistroPortariaResponse {
    private Long id;
    private FuncionarioResponse funcionario;
    private LocalDateTime horaEntrada;
    private LocalDateTime horaSaida;
}