package com.portaria.gestao.config;

import com.portaria.gestao.model.Porteiro;
import com.portaria.gestao.repository.PorteiroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataLoader {

    private final PorteiroRepository porteiroRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {

            if (porteiroRepository.findByUsername("porteiro.silva").isEmpty()) {
                Porteiro porteiro = new Porteiro();
                porteiro.setUsername("porteiro.silva");


                porteiro.setPassword(passwordEncoder.encode("porteirossenha"));

                porteiroRepository.save(porteiro);
                System.out.println("✅ Porteiro de teste 'porteiro.silva' criado/atualizado com senha BCrypt correta!");
            }
        };
    }
}