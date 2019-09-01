package com.coolkidsclub.sentiment_connect.controller;

import com.coolkidsclub.sentiment_connect.controller.RedditDataController.RedditNlpObject;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("reddit")
public class SentimentController {

    @Autowired
    private RedditService redditService;


    @GetMapping(value = "/get/submissions/{subreddit}", produces = "application/json")
    public String getSubmissionSentimentData(@PathVariable String subreddit, @RequestParam String searchTerm) {
        ArrayList<RedditNlpObject> nlpObjects = redditService.getSubmissionNlpData(searchTerm, subreddit);
        return new Gson().toJson(nlpObjects.toString());
    }


    @GetMapping(value = "/get/comments/{subreddit}", produces = "application/json")
    public String getCommentSentimentData(@PathVariable String subreddit, @RequestParam String searchTerm) {
        ArrayList<RedditNlpObject> nlpObjects = redditService.getCommentNlpData(searchTerm, subreddit);
        return new Gson().toJson(nlpObjects.toString());
    }

}
