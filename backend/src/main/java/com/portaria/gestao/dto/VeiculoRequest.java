package com.portaria.gestao.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VeiculoRequest {
    private Long id; // opcional para updates
    private String modelo; // front envia 'nome'
    private String placa;
    private String foto; // front envia 'foto' (mapearemos para fotoUrl na entidade)
    private String cor;
}
