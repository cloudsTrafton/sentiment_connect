package com.coolkidsclub.sentiment_connect.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("sentiment")
public class SentimentController {

    /**
     * This is just an example endpoint. If you want to interface with some kind of backend (like the spark stuff)
     * and give to the front end, you do so through an endpoint.
     * @param subreddit
     * @param search_term
     * @return
     */
    @GetMapping(value = "/get/{subreddit}/{search_term}", produces = "application/json")
    public String getSentimentFromTopicAndSubreddit(@PathVariable String subreddit, @PathVariable String search_term) {
        RestTemplate restTemplate = new RestTemplate();
        String redditData = restTemplate.getForObject("https://api.pushshift.io/reddit/search/submission/?q=science", String.class);

        return redditData;

    }


}
