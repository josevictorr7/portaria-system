package com.portaria.gestao.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FuncionarioResponse {
    private Long id;
    private String nome;
    private String documento;   // front espera 'cpf'
    private String foto;  // front espera 'foto'
    private boolean ativo;
    private List<VeiculoResponse> veiculos;
}
