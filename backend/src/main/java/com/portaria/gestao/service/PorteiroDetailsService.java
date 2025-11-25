package com.portaria.gestao.service;

import com.portaria.gestao.model.Porteiro;
import com.portaria.gestao.repository.PorteiroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PorteiroDetailsService implements UserDetailsService {

    private final PorteiroRepository porteiroRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Porteiro porteiro = porteiroRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        return porteiro;
    }
}