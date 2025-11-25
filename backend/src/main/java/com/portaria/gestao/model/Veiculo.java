package com.portaria.gestao.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "veiculos")
@Data
@NoArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome / modelo amigável do veículo (front usa 'nome')
    private String modelo;

    // Placa (front usa 'placa')
    private String placa;

    // Url da foto do veículo (front usa 'foto')
    private String fotoUrl;

    // Cor (opcional) — mantido caso queira usar
    private String cor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id")
    @JsonBackReference
    private Funcionario funcionario;
}
