package com.portaria.gestao.service;

import com.portaria.gestao.dto.CestaBasicaResponse;
import com.portaria.gestao.model.CestaBasicaBeneficiario;
import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.repository.CestaBasicaRepository;
import com.portaria.gestao.repository.FuncionarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CestaBasicaService {

    private final FuncionarioRepository funcionarioRepository;
    private final CestaBasicaRepository cestaBasicaRepository;

    @Transactional
    public CestaBasicaResponse processarArquivo(MultipartFile arquivo) {
        List<String> linhas = lerArquivoTxt(arquivo);

        // Remove duplicatas e espaços extras
        Set<String> nomesArquivo = linhas.stream()
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toSet());

        // Busca todos os funcionários ativos
        List<Funcionario> funcionarios = funcionarioRepository.findByAtivoTrue();

        // Divide em encontrados e não encontrados
        List<Funcionario> encontrados = funcionarios.stream()
                .filter(f -> nomesArquivo.contains(f.getNome()))
                .toList();

        List<String> nomesEncontrados = encontrados.stream()
                .map(Funcionario::getNome)
                .toList();

        List<String> naoEncontrados = nomesArquivo.stream()
                .filter(nome -> funcionarios.stream()
                        .noneMatch(f -> f.getNome().equalsIgnoreCase(nome)))
                .toList();

        // Salva os beneficiários do mês atual
        String mesReferencia = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        for (Funcionario f : encontrados) {
            CestaBasicaBeneficiario b = new CestaBasicaBeneficiario();
            b.setFuncionario(f);
            b.setMesReferencia(mesReferencia);
            cestaBasicaRepository.save(b);
        }

        log.info("Cesta básica processada: {} beneficiários salvos", encontrados.size());

        CestaBasicaResponse response = new CestaBasicaResponse();
        response.setBeneficiariosEncontrados(nomesEncontrados);
        response.setNaoEncontrados(naoEncontrados);
        return response;
    }

    private List<String> lerArquivoTxt(MultipartFile arquivo) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(arquivo.getInputStream(), StandardCharsets.UTF_8))) {
            return reader.lines()
                    .flatMap(l -> Arrays.stream(l.split("[,\\n]")))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toList();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao ler o arquivo: " + e.getMessage());
        }
    }

    public List<String> listarBeneficiariosDoMesAtual() {
        String mesReferencia = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return cestaBasicaRepository.findByMesReferencia(mesReferencia)
                .stream()
                .map(b -> b.getFuncionario().getNome())
                .toList();
    }
}
