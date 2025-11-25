package com.portaria.gestao.controller;

import com.portaria.gestao.dto.RegistroPortariaRequest;
import com.portaria.gestao.dto.RegistroPortariaResponse;
import com.portaria.gestao.service.PortariaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/portaria")
@RequiredArgsConstructor
public class PortariaController {

    private final PortariaService portariaService;

    @PostMapping("/entrada")
    public ResponseEntity<RegistroPortariaResponse> registrarEntrada(
            @RequestBody RegistroPortariaRequest request) {

        if (request == null || request.getIdentificador() == null || request.getIdentificador().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Identificador (documento) é obrigatório.");
        }

        RegistroPortariaResponse response =
                portariaService.registrarEntrada(request.getIdentificador().trim());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/saida")
    public ResponseEntity<RegistroPortariaResponse> registrarSaida(
            @RequestBody RegistroPortariaRequest request) {

        if (request == null || request.getIdentificador() == null || request.getIdentificador().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Identificador (documento) é obrigatório.");
        }

        RegistroPortariaResponse response =
                portariaService.registrarSaida(request.getIdentificador().trim());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Lista documentos (String) dos funcionários que possuem uma entrada ativa
     * (registro sem horaSaida). Retornamos documentos para fácil comparação no frontend.
     */
    @GetMapping("/ativos")
    public ResponseEntity<List<String>> listarFuncionariosComEntradaAtiva() {
        List<String> documentosAtivos = portariaService.listarFuncionariosComEntradaAtiva();
        return ResponseEntity.ok(documentosAtivos);
    }
}
