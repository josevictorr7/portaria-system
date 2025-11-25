package com.portaria.gestao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtividadeRecenteDTO {
    private String nomeFuncionario;
    private String horario;
    private boolean entrada;
}
