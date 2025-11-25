package com.portaria.gestao.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FuncionarioRequest {
    private String nome;
    private String documento;   // front usa 'cpf'
    private String foto;  // front usa 'foto'
    private boolean ativo = true;
    private List<VeiculoRequest> veiculos;
}
