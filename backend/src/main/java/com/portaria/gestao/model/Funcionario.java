package com.portaria.gestao.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "funcionarios")
@Data
@NoArgsConstructor
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome do funcionário
    private String nome;

    // CPF/documento
    @Column(unique = true)
    private String documento;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(name = "is_ativo", nullable = false)
    private boolean ativo = true;

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Veiculo> veiculos = new ArrayList<>();

    // NOVOS CAMPOS PARA RELATÓRIO DE FREQUÊNCIA
    private LocalTime horaEntrada;   // Horário padrão de entrada
    private LocalTime horaSaida;     // Horário padrão de saída
    private int diasTrabalhados;          // Total de dias trabalhados no mês
}
