package com.portaria.gestao.controller;

import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cestas")
@CrossOrigin(origins = "*")
public class CestaBasicaController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    /**
     * Faz upload do arquivo com nomes e retorna apenas os beneficiários encontrados.
     */
    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN') or hasRole('PORTARIA')") // 🔒 Protege a rota com JWT
    public List<Map<String, String>> uploadLista(@RequestParam("file") MultipartFile file) {
        try {
            // Lê o conteúdo do arquivo (UTF-8)
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
            );

            // Extrai os nomes do arquivo (separados por vírgula ou quebra de linha)
            List<String> nomesArquivo = reader.lines()
                    .flatMap(l -> Arrays.stream(l.split("[,\\n\\r]")))
                    .map(String::trim)
                    .filter(n -> !n.isEmpty())
                    .collect(Collectors.toList());

            // Busca todos os funcionários
            List<Funcionario> funcionarios = funcionarioRepository.findAll();

            // Filtra os que estão na lista do arquivo
            List<Funcionario> beneficiarios = funcionarios.stream()
                    .filter(f -> nomesArquivo.stream()
                            .anyMatch(nome -> nome.equalsIgnoreCase(f.getNome().trim())))
                    .collect(Collectors.toList());

            // Retorna apenas nome e CPF (documento)
            List<Map<String, String>> resultado = beneficiarios.stream()
                    .map(f -> {
                        Map<String, String> dados = new HashMap<>();
                        dados.put("nome", f.getNome());
                        dados.put("cpf", f.getDocumento());
                        return dados;
                    })
                    .collect(Collectors.toList());

            return resultado;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
