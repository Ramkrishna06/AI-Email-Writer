package com.email.email_writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins="*")
public class EmailControllerGenerator {

    private final EmailGenerateService emailGenerateService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGenerateService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
