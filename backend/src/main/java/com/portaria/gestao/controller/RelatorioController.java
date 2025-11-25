package com.portaria.gestao.controller;

import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.*;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "*")
public class RelatorioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping("/frequencia")
    public List<Map<String, Object>> gerarRelatorio(@RequestParam("mes") int mes,
                                                    @RequestParam("ano") int ano) {

        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        List<Map<String, Object>> relatorio = new ArrayList<>();

        YearMonth anoMes = YearMonth.of(ano, mes);
        int diasNoMes = anoMes.lengthOfMonth();

        for (Funcionario f : funcionarios) {

            int diasTrabalhados = f.getDiasTrabalhados(); // supondo que este campo exista
            int faltas = diasNoMes - diasTrabalhados;

            // Detalhes com hora de entrada e saída
            List<Map<String, String>> detalhes = new ArrayList<>();
            for (int dia = 1; dia <= diasTrabalhados; dia++) {
                Map<String, String> registroDia = new HashMap<>();
                registroDia.put("data", String.format("%04d-%02d-%02d", ano, mes, dia));
                registroDia.put("entrada", f.getHoraEntrada() != null ? f.getHoraEntrada().toString() : "-");
                registroDia.put("saida", f.getHoraSaida() != null ? f.getHoraSaida().toString() : "-");
                detalhes.add(registroDia);
            }

            relatorio.add(Map.of(
                    "nome", f.getNome(),
                    "cpf", f.getDocumento(),
                    "diasTrabalhados", diasTrabalhados,
                    "faltas", faltas,
                    "detalhes", detalhes
            ));
        }

        return relatorio;
    }
}
