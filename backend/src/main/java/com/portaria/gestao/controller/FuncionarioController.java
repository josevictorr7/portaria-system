package com.portaria.gestao.controller;

import com.portaria.gestao.dto.FuncionarioRequest;
import com.portaria.gestao.dto.FuncionarioResponse;
import com.portaria.gestao.service.FuncionarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<List<FuncionarioResponse>> listarAtivos() {
        log.info("Listando funcionários ativos");
        return ResponseEntity.ok(funcionarioService.listarAtivos());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FuncionarioResponse> criar(@RequestBody FuncionarioRequest request) {
        log.info("Criando novo funcionário: {}", request.getNome());
        FuncionarioResponse criado = funcionarioService.criarFuncionario(request);
        return ResponseEntity.created(URI.create("/api/funcionarios/" + criado.getId())).body(criado);
    }

    @GetMapping("/documento/{documento}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<FuncionarioResponse> buscarPorDocumento(@PathVariable String documento) {
        log.info("Buscando funcionário pelo documento: {}", documento);
        return funcionarioService.buscarPorDocumento(documento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<FuncionarioResponse> buscar(@PathVariable Long id) {
        log.info("Buscando funcionário ID={}", id);
        return funcionarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FuncionarioResponse> atualizar(@PathVariable Long id, @RequestBody FuncionarioRequest request) {
        log.info("Atualizando funcionário ID={}", id);
        if (id == null) {
            log.warn("Tentativa de atualização com ID nulo");
            return ResponseEntity.badRequest().build();
        }
        return funcionarioService.atualizarFuncionario(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        log.info("Inativando funcionário ID={}", id);
        funcionarioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
