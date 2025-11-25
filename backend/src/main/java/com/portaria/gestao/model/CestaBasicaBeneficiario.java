package com.portaria.gestao.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cesta_basica_beneficiarios")
@Data
@NoArgsConstructor
public class CestaBasicaBeneficiario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Mês de referência (ex: "2025-11")
    private String mesReferencia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
}
