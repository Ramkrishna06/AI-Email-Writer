# Use OpenJDK 17 base image
FROM eclipse-temurin:17-jdk

# Set the working directory
WORKDIR /app

# Copy everything to the container
COPY . .

# Make sure Maven wrapper has execute permissions
RUN chmod +x mvnw

# Build the application (skipping tests for faster deploy)
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]
