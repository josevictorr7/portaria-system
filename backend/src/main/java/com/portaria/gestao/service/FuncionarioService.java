package com.portaria.gestao.service;

import com.portaria.gestao.dto.FuncionarioRequest;
import com.portaria.gestao.dto.FuncionarioResponse;
import com.portaria.gestao.dto.VeiculoResponse;
import com.portaria.gestao.model.Funcionario;
import com.portaria.gestao.model.Veiculo;
import com.portaria.gestao.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    @Transactional
    public FuncionarioResponse criarFuncionario(FuncionarioRequest request) {
        if (request.getDocumento() == null || request.getDocumento().isBlank()) {
            throw new IllegalArgumentException("Documento não pode ser vazio.");
        }

        Funcionario f = new Funcionario();
        f.setNome(request.getNome());
        f.setDocumento(request.getDocumento());
        f.setFotoUrl(request.getFoto());
        f.setAtivo(true);

        if (request.getVeiculos() != null) {
            f.setVeiculos(request.getVeiculos().stream().map(vr -> {
                Veiculo v = new Veiculo();
                v.setModelo(vr.getModelo());
                v.setPlaca(vr.getPlaca());
                v.setFotoUrl(vr.getFoto());
                v.setCor(vr.getCor());
                v.setFuncionario(f);
                return v;
            }).collect(Collectors.toList()));
        }

        Funcionario salvo = funcionarioRepository.save(f);
        log.info("Funcionário criado com sucesso: {}", salvo.getId());
        return toResponse(salvo);
    }

    public Optional<FuncionarioResponse> buscarPorId(Long id) {
        return funcionarioRepository.findById(id).map(this::toResponse);
    }

    public List<FuncionarioResponse> listarAtivos() {
        return funcionarioRepository.findByAtivoTrue()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<FuncionarioResponse> atualizarFuncionario(Long id, FuncionarioRequest request) {
        return funcionarioRepository.findById(id).map(func -> {
            func.setNome(request.getNome());
            func.setDocumento(request.getDocumento());
            func.setFotoUrl(request.getFoto());
            func.setAtivo(request.isAtivo());

            func.getVeiculos().clear();
            if (request.getVeiculos() != null) {
                func.getVeiculos().addAll(
                        request.getVeiculos().stream().map(vr -> {
                            Veiculo v = new Veiculo();
                            v.setModelo(vr.getModelo());
                            v.setPlaca(vr.getPlaca());
                            v.setFotoUrl(vr.getFoto());
                            v.setCor(vr.getCor());
                            v.setFuncionario(func);
                            return v;
                        }).toList()
                );
            }

            Funcionario atualizado = funcionarioRepository.save(func);
            log.info("Funcionário atualizado ID={}", atualizado.getId());
            return toResponse(atualizado);
        });
    }

    @Transactional
    public void excluir(Long id) {
        funcionarioRepository.findById(id).ifPresent(func -> {
            func.setAtivo(false);
            funcionarioRepository.save(func);
            log.info("Funcionário inativado ID={}", id);
        });
    }

    public Optional<FuncionarioResponse> buscarPorDocumento(String documento) {
        return funcionarioRepository.findByDocumento(documento)
                .map(this::toResponse);
    }

    private FuncionarioResponse toResponse(Funcionario func) {
        FuncionarioResponse resp = new FuncionarioResponse();
        resp.setId(func.getId());
        resp.setNome(func.getNome());
        resp.setDocumento(func.getDocumento());
        resp.setFoto(func.getFotoUrl());
        resp.setAtivo(func.isAtivo());
        resp.setVeiculos(func.getVeiculos().stream().map(v -> {
            VeiculoResponse vr = new VeiculoResponse();
            vr.setId(v.getId());
            vr.setModelo(v.getModelo());
            vr.setPlaca(v.getPlaca());
            vr.setFoto(v.getFotoUrl());
            vr.setCor(v.getCor());
            return vr;
        }).toList());
        return resp;
    }
}
