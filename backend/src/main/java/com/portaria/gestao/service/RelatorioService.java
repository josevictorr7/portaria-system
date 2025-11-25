package com.portaria.gestao.service;

import com.portaria.gestao.dto.CestaBasicaDTO;
import com.portaria.gestao.dto.FuncionarioElegivelDTO;
import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.RegistroPortaria;
import com.portaria.gestao.repository.FuncionarioRepository;
import com.portaria.gestao.repository.RegistroPortariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private RegistroPortariaRepository registroRepository;

    private static final int MAX_ATRASO_MINUTOS = 30;
    private static final LocalTime HORA_ENTRADA_ESPERADA_CALCULO = LocalTime.of(7, 55, 0);
    private static final LocalTime HORA_LIMITE_TOLERANCIA = LocalTime.of(8, 0, 0);

    public CestaBasicaDTO calcularElegibilidade(int ano, int mes) {

        YearMonth yearMonth = YearMonth.of(ano, mes);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        List<Funcionario> todosFuncionarios = funcionarioRepository.findAll().stream().filter(Funcionario::isAtivo).collect(Collectors.toList());

        List<RegistroPortaria> registrosDoPeriodo = registroRepository.findByHoraEntradaBetween(startOfMonth, endOfMonth);

        Map<Long, Long> atrasoTotalPorFuncionario = new HashMap<>();

        for (RegistroPortaria registro : registrosDoPeriodo) {

            LocalTime horaRealEntrada = registro.getHoraEntrada().toLocalTime();
            long atrasoMinutos;

            if (horaRealEntrada.isAfter(HORA_LIMITE_TOLERANCIA)) {

                Duration atrasoDuration = Duration.between(HORA_ENTRADA_ESPERADA_CALCULO, horaRealEntrada);
                atrasoMinutos = atrasoDuration.toMinutes();
            } else {
                atrasoMinutos = 0;
            }

            Long funcionarioId = registro.getFuncionario().getId();

            atrasoTotalPorFuncionario.compute(funcionarioId, (k, v) -> (v == null ? 0 : v) + atrasoMinutos);
        }

        List<FuncionarioElegivelDTO> elegiveisDTO = todosFuncionarios.stream().map(funcionario -> {

            long totalAtraso = atrasoTotalPorFuncionario.getOrDefault(funcionario.getId(), 0L);

            FuncionarioElegivelDTO dto = new FuncionarioElegivelDTO();
            dto.setId(funcionario.getId());
            dto.setNome(funcionario.getNome());
            dto.setDocumento(funcionario.getDocumento());
            dto.setTotalAtrasoMinutos(totalAtraso);

            dto.setElegivel(totalAtraso < MAX_ATRASO_MINUTOS);

            return dto;
        }).collect(Collectors.toList());

        CestaBasicaDTO resultado = new CestaBasicaDTO();
        resultado.setPeriodo(yearMonth.toString());
        resultado.setLimiteAtrasoMinutos(MAX_ATRASO_MINUTOS);
        resultado.setFuncionariosElegiveis(elegiveisDTO);

        return resultado;
    }
}