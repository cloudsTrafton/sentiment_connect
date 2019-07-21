package com.coolkidsclub.sentiment_connect.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sentiment")
public class SentimentController {

    /**
     * This is just an example endpoint. If you want to interface with some kind of backend (like the spark stuff)
     * and give to the front end, you do so through an endpoint.
     * @param subreddit
     * @param topic
     * @return
     */
    @GetMapping(value = "/get/{subreddit}/{topic}", produces = "application/json")
    public String getSentimentFromTopicAndSubreddit(@PathVariable String subreddit, @PathVariable String topic) {
        return "Sentiment for " + subreddit + " and " + topic;
    }


}
