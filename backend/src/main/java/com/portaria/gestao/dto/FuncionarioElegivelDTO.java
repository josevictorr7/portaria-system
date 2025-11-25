package com.portaria.gestao.dto;

import lombok.Data;

@Data
public class FuncionarioElegivelDTO {
    private Long id;
    private String nome;
    private String documento;

    private long totalAtrasoMinutos;

    private boolean elegivel;
}