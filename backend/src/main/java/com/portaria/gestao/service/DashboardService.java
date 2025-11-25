package com.portaria.gestao.service;

import com.portaria.gestao.dto.AtividadeRecenteDTO;
import com.portaria.gestao.dto.DashboardDTO;
import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.RegistroPortaria;
import com.portaria.gestao.repository.FuncionarioRepository;
import com.portaria.gestao.repository.RegistroPortariaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final FuncionarioRepository funcionarioRepository;
    private final RegistroPortariaRepository registroRepository;

    public DashboardDTO getDashboardData() {
        long totalFuncionarios = funcionarioRepository.count();

        // Funcionários com horaEntrada hoje e sem horaSaida (presentes)
        LocalDateTime inicioDia = LocalDate.now().atStartOfDay();
        LocalDateTime fimDia = LocalDateTime.now();

        List<RegistroPortaria> registrosHoje = registroRepository.findByHoraEntradaBetween(inicioDia, fimDia);

        long presentes = registrosHoje.stream()
                .filter(r -> r.getHoraSaida() == null)
                .count();

        long ausentes = totalFuncionarios - presentes;
        long registrosHojeCount = registrosHoje.size();

        // Últimas 5 atividades recentes
        List<AtividadeRecenteDTO> atividades = registrosHoje.stream()
                .sorted(Comparator.comparing(RegistroPortaria::getHoraEntrada).reversed())
                .limit(5)
                .map(r -> new AtividadeRecenteDTO(
                        r.getFuncionario().getNome(),
                        r.getHoraSaida() != null
                                ? r.getHoraSaida().toString()
                                : r.getHoraEntrada().toString(),
                        r.getHoraSaida() == null // true = entrada, false = saída
                ))
                .collect(Collectors.toList());

        return new DashboardDTO(totalFuncionarios, presentes, ausentes, registrosHojeCount, atividades);
    }
}
