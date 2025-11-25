package com.portaria.gestao.dto;

import lombok.Data;

import java.util.List;

@Data
public class CestaBasicaDTO {
    private String periodo;

    private int limiteAtrasoMinutos;

    private List<FuncionarioElegivelDTO> funcionariosElegiveis;
}