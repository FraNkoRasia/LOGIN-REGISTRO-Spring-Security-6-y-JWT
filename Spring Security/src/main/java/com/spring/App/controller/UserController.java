package com.spring.App.controller;

import com.spring.App.entity.ResetToken;
import com.spring.App.entity.User;
import com.spring.App.repository.ResetTokenRepository;
import com.spring.App.repository.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.UUID;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository; // Suponiendo que tienes un repositorio para gestionar los usuarios

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ResetTokenRepository resetTokenRepository;

    //MODIFICAR PASSWORD
    @PutMapping("/{userId}/password")
    public void changePassword(@PathVariable Long userId, @RequestBody Map<String, String> passwordMap) {
        String newPassword = passwordMap.get("newPassword");

        // Cifrar la nueva contraseña
        String encodedPassword = passwordEncoder.encode(newPassword);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    //MODIFICAR DATOS DEL PERFIL DEL USUARIO
    @PutMapping("/{userId}/modifyProfile")
    public void updateUserDetails(@PathVariable Long userId, @RequestBody Map<String, String> userDetailsMap) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String currentPassword = userDetailsMap.get("currentPassword");

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        // Actualizar solo los campos proporcionados en la solicitud
        if (userDetailsMap.containsKey("name") && !userDetailsMap.get("name").isEmpty()) {
            user.setName(userDetailsMap.get("name"));
        }
        if (userDetailsMap.containsKey("lastname") && !userDetailsMap.get("lastname").isEmpty()) {
            user.setLastname(userDetailsMap.get("lastname"));
        }
        if (userDetailsMap.containsKey("username") && !userDetailsMap.get("username").isEmpty()) {
            user.setUsername(userDetailsMap.get("username"));
        }
        if (userDetailsMap.containsKey("phone") && !userDetailsMap.get("phone").isEmpty()) {
            user.setPhone(userDetailsMap.get("phone"));
        }
        if (userDetailsMap.containsKey("passport") && !userDetailsMap.get("passport").isEmpty()) {
            user.setPassport(userDetailsMap.get("passport"));
        }

        userRepository.save(user);
    }

    //CAMBIAR LA CONTRASEÑA DEL USUARIO UTILIZANDO EL TOKEN DE RESTABLECIMIENTO
    @PreAuthorize("permitAll")
    @PostMapping("/reset-password/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable String token, @RequestBody Map<String, String> requestBody) {
        // Verificar si el token es válido
        ResetToken resetTokenEntity = resetTokenRepository.findByToken(token);
        if (resetTokenEntity != null) {
            // Obtener el correo electrónico asociado con el token
            User user = userRepository.findByEmail(resetTokenEntity.getUserEmail());

            String password = requestBody.get("password");
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);

            // Eliminar el token de la base de datos después de utilizarlo
            resetTokenRepository.delete(resetTokenEntity);

            return ResponseEntity.ok("La contraseña se ha restablecido correctamente.");
        } else {
            return ResponseEntity.badRequest().body("El token de restablecimiento de contraseña no es válido.");
        }
    }

    // Generar un token único para el restablecimiento de contraseña y persistirlo en la base de datos
    private String generateResetToken(String email) {
        // Generar un token único para el restablecimiento de contraseña
        String resetToken = UUID.randomUUID().toString();

        // System.out.println("ESTE ES EL TOKEN QUE LLEGO Al EMAIL QUE LO SOLICITO: " + resetToken);
        // Persistir el token en la base de datos junto con el correo electrónico del usuario
        resetTokenRepository.save(new ResetToken(resetToken, email));

        return resetToken;
    }

    //CREO EL METODO DE FORGOT PASSWORD PARA PEDIR EL RESTABLECIMIENTO DE PASSWORD A TRAVEZ DEL EMAIL
    @PreAuthorize("permitAll")
    @PostMapping("/forgot-password")
    public ResponseEntity<String> sendResetPassword(@RequestBody Map<String, String> requestBody) {
        // Obtener el correo electrónico del cuerpo de la solicitud
        String email = requestBody.get("email");

        // Verificar si el correo electrónico no es nulo
        if (email != null) {
            // Aquí puedes implementar la lógica para generar un token de restablecimiento de contraseña
            String resetToken = generateResetToken(email);

            // Aquí deberías implementar la lógica para enviar un correo electrónico con el token de restablecimiento
            sendResetEmail(email, resetToken);

            // Devuelve una respuesta exitosa al cliente
            return ResponseEntity.ok("Se ha enviado un correo electrónico de restablecimiento de contraseña a tu dirección de correo electrónico.");
        } else {
            // Manejar el caso cuando el correo electrónico es nulo
            return ResponseEntity.badRequest().body("No se proporcionó un correo electrónico válido.");
        }
    }

    //ENVIO EL EMAIL QUE LLEGARA AL USUARIO CON UN LINK EL CUAL CONTIENE UN TOKEN DE UN UNICO USO
    private void sendResetEmail(String email, String resetToken) {
        // Configurar las propiedades del servidor de correo electrónico
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Reemplaza smtp.example.com con tu servidor de correo saliente
        props.put("mail.smtp.port", "587"); // Puerto SMTP estándar

        // Credenciales de autenticación del correo electrónico
        String username = "soportederecuperacionweb@gmail.com"; // Reemplaza tu_correo@example.com con tu dirección de correo electrónico
        String password = "kaexivnhgzzxbyjo"; // Reemplaza tu_contraseña con tu contraseña

        // Crear una sesión de correo electrónico con autenticación
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Crear un mensaje de correo electrónico
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username)); // Dirección de correo electrónico del remitente
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email)); // Dirección de correo electrónico del destinatario
            message.setSubject("Restablecimiento de contraseña"); // Asunto del correo electrónico
            String resetLink = "http://localhost:5173/auth/reset-password?token=" + resetToken;
            message.setText("Hola,\n\nHas solicitado un restablecimiento de contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña: " + resetLink);

            // Enviar el mensaje de correo electrónico
            Transport.send(message);

            System.out.println("Correo electrónico de restablecimiento de contraseña enviado a " + email);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // VER LISTA DE USUARIOS
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // LISTA DE USUARIOS POR ID
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        // Buscar el usuario en la base de datos por su ID
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            // Si se encontró el usuario, devolverlo con un código de estado 200 (OK)
            return ResponseEntity.ok(user);
        } else {
            // Si no se encontró el usuario, devolver un código de estado 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
    }

    //MODIFICAR USUARIO A TRAVEZ DE @GetMapping("/{userId}")
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        // Actualizar los campos del usuario con los valores proporcionados en updatedUser
        user.setUsername(updatedUser.getUsername());
        user.setName(updatedUser.getName());
        user.setLastname(updatedUser.getLastname());
        user.setPassport(updatedUser.getPassport());
        user.setPhone(updatedUser.getPhone());
        user.setRole(updatedUser.getRole());

        // Guardar el usuario actualizado en la base de datos
        final User updated = userRepository.save(user);
        return ResponseEntity.ok(updated);
    }

    //ELIMINAR USUARIO
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            // Si el usuario no se encuentra, retornar un código de estado 404
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }

}
