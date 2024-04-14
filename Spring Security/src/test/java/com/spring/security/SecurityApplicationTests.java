package com.spring.security;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = com.spring.App.SecurityApplication.class)
public class SecurityApplicationTests {

    @Test
    public void contextLoads() {
        // Aquí puedes agregar tus pruebas
    }
}
