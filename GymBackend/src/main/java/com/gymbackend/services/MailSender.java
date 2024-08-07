package com.gymbackend.services;

public interface MailSender {
    void sendMail(String to, String subject, String body);
}
