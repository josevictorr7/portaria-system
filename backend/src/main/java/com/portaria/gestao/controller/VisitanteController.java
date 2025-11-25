package com.portaria.gestao.controller;

import com.portaria.gestao.model.Visitante;
import com.portaria.gestao.service.VisitanteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitantes")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class VisitanteController {

    private final VisitanteService visitanteService;

    // Listar todos
    @GetMapping
    public ResponseEntity<List<Visitante>> listarTodos() {
        return ResponseEntity.ok(visitanteService.listarTodos());
    }

    // Adicionar visitante (novo)
    @PostMapping
    public ResponseEntity<Visitante> adicionar(@RequestBody Visitante visitante) {
        Visitante novo = visitanteService.adicionar(visitante);
        return ResponseEntity.status(201).body(novo);
    }

    // Registrar entrada de visitante existente
    @PutMapping("/{id}/entrada")
    public ResponseEntity<Visitante> registrarEntrada(@PathVariable Long id, @RequestBody Visitante visitante) {
        Visitante atualizado = visitanteService.registrarEntrada(id, visitante);
        return ResponseEntity.ok(atualizado);
    }

    // Registrar saída
    @PutMapping("/{id}/saida")
    public ResponseEntity<Visitante> registrarSaida(@PathVariable Long id) {
        Visitante atualizado = visitanteService.registrarSaida(id);
        return ResponseEntity.ok(atualizado);
    }

    // Atualizar visitante
    @PutMapping("/{id}")
    public ResponseEntity<Visitante> atualizar(@PathVariable Long id, @RequestBody Visitante visitante) {
        Visitante atualizado = visitanteService.atualizar(id, visitante);
        return ResponseEntity.ok(atualizado);
    }

    // Deletar visitante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        visitanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
