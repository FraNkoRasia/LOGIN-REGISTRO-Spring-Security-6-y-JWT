# Usa una imagen base de OpenJDK
FROM openjdk:17-jdk-alpine

# Expone el puerto en el que tu aplicación Spring Boot se ejecutará
EXPOSE 8080

# Copia el archivo JAR de tu aplicación a la imagen Docker
COPY target/security-0.0.1-SNAPSHOT.jar app.jar

# Comando para ejecutar tu aplicación Spring Boot al iniciar el contenedor
ENTRYPOINT ["java", "-jar", "/app.jar"]



