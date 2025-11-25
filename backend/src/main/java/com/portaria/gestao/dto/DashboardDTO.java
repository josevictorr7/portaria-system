package com.portaria.gestao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {

    private long totalFuncionarios;
    private long presentes;
    private long ausentes;
    private long registrosHoje;
    private List<AtividadeRecenteDTO> atividadesRecentes;
}
