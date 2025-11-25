package com.portaria.gestao.dto;

import lombok.Data;
import java.util.List;

@Data
public class CestaBasicaResponse {
    private List<String> beneficiariosEncontrados;
    private List<String> naoEncontrados;
}
