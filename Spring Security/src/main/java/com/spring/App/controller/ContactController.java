package com.spring.App.controller;

import java.util.Map;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final Session mailSession;

    @Autowired
    public ContactController(Session mailSession) {
        this.mailSession = mailSession;
    }

    @PostMapping("/message/contact")
    public String sendContactEmail(@RequestBody Map<String, String> requestBody) {
        try {
            // Obtener los datos del cuerpo de la solicitud
            String name = requestBody.get("name");
            String email = requestBody.get("email");
            String subject = requestBody.get("subject");
            String messageText = requestBody.get("message");

            // Crear el mensaje de correo electrónico
            Message message = new MimeMessage(mailSession);
            message.setFrom(new InternetAddress("soportederecuperacionweb@gmail.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("soportederecuperacionweb@gmail.com"));
            message.setSubject(subject);
            message.setText("Name: " + name + "\nEmail: " + email + "\nMessage: " + messageText);

            // Enviar el correo electrónico
            Transport.send(message);

            return "Email sent successfully!";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }
}
