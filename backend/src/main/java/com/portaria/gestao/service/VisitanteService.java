package com.portaria.gestao.service;

import com.portaria.gestao.model.Visitante;
import com.portaria.gestao.repository.VisitanteRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VisitanteService {

    private final VisitanteRepository visitanteRepository;

    public VisitanteService(VisitanteRepository visitanteRepository) {
        this.visitanteRepository = visitanteRepository;
    }

    // Listar todos os visitantes
    public List<Visitante> listarTodos() {
        return visitanteRepository.findAll();
    }

    // Adicionar visitante (novo)
    public Visitante adicionar(Visitante visitante) {
        validarCamposObrigatorios(visitante);
        visitante.setDataEntrada(LocalDateTime.now());
        visitante.setPresente(true);

        try {
            return visitanteRepository.save(visitante);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("CPF já cadastrado: " + visitante.getCpf());
        }
    }

    // Registrar entrada de visitante existente
    public Visitante registrarEntrada(Long id, Visitante visitanteAtualizado) {
        Visitante visitante = visitanteRepository.findById(id).orElseThrow(() -> new RuntimeException("Visitante não encontrado."));

        // Atualiza os campos de motivo, descrição, empresa etc
        if (visitanteAtualizado.getMotivoVisita() != null)
            visitante.setMotivoVisita(visitanteAtualizado.getMotivoVisita());
        if (visitanteAtualizado.getDescricao() != null) visitante.setDescricao(visitanteAtualizado.getDescricao());
        if (visitanteAtualizado.getEmpresa() != null) visitante.setEmpresa(visitanteAtualizado.getEmpresa());
        if (visitanteAtualizado.getVehicle() != null) visitante.setVehicle(visitanteAtualizado.getVehicle());

        // Define data de entrada e presente
        visitante.setDataEntrada(LocalDateTime.now());
        visitante.setPresente(true);

        return visitanteRepository.save(visitante);
    }

    // Registrar saída
    public Visitante registrarSaida(Long id) {
        Visitante visitante = visitanteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitante não encontrado."));

        visitante.setDataSaida(LocalDateTime.now());
        visitante.setPresente(false);
        return visitanteRepository.save(visitante);
    }

    // Atualizar visitante (nome, cpf, empresa, veículo, etc.)
    public Visitante atualizar(Long id, Visitante dadosAtualizados) {
        Visitante visitante = visitanteRepository.findById(id).orElseThrow(() -> new RuntimeException("Visitante não encontrado."));

        if (dadosAtualizados.getNome() != null) visitante.setNome(dadosAtualizados.getNome());
        if (dadosAtualizados.getCpf() != null) visitante.setCpf(dadosAtualizados.getCpf());
        if (dadosAtualizados.getEmpresa() != null) visitante.setEmpresa(dadosAtualizados.getEmpresa());
        if (dadosAtualizados.getMotivoVisita() != null) visitante.setMotivoVisita(dadosAtualizados.getMotivoVisita());
        if (dadosAtualizados.getDescricao() != null) visitante.setDescricao(dadosAtualizados.getDescricao());
        if (dadosAtualizados.getVehicle() != null) visitante.setVehicle(dadosAtualizados.getVehicle());

        return visitanteRepository.save(visitante);
    }

    // Deletar visitante
    public void deletar(Long id) {
        Optional<Visitante> visitante = visitanteRepository.findById(id);
        if (visitante.isEmpty()) {
            throw new RuntimeException("Visitante não encontrado.");
        }
        visitanteRepository.deleteById(id);
    }

    // Validação de campos obrigatórios
    private void validarCamposObrigatorios(Visitante visitante) {
        if (visitante.getNome() == null || visitante.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("O nome do visitante é obrigatório.");
        }
        if (visitante.getCpf() == null || visitante.getCpf().trim().isEmpty()) {
            throw new IllegalArgumentException("O CPF do visitante é obrigatório.");
        }
    }
}
