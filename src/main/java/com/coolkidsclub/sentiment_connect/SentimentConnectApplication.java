package com.coolkidsclub.sentiment_connect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class SentimentConnectApplication {

    public static void main(String[] args) {

        SpringApplication.run(SentimentConnectApplication.class, args);
    }

}
