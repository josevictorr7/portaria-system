package com.portaria.gestao.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VeiculoResponse {
    private Long id;
    private String modelo;
    private String placa;
    private String foto; // front espera 'foto'
    private String cor;
}
