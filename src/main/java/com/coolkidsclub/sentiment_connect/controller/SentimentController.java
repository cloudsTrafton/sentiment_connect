package com.coolkidsclub.sentiment_connect.controller;

import com.coolkidsclub.sentiment_connect.controller.RedditDataController.RedditNlpObject;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("reddit")
public class SentimentController {

    @Autowired
    private RedditService redditService;


    @GetMapping(value = "/get/submission/{subreddit}", produces = "application/json")
    public String getSubmissionSentimentData(@PathVariable String subreddit, @RequestParam String searchTerm) {
        ArrayList<RedditNlpObject> nlpObjects = redditService.getSubmissionNlpData(searchTerm, subreddit);
        Type listType = new TypeToken<ArrayList<RedditNlpObject>>(){}.getType();
        String json = new Gson().toJson(nlpObjects, listType);
        return json;
    }


    @GetMapping(value = "/get/comment/{subreddit}", produces = "application/json")
    public String getCommentSentimentData(@PathVariable String subreddit, @RequestParam String searchTerm) {
        ArrayList<RedditNlpObject> nlpObjects = redditService.getCommentNlpData(searchTerm, subreddit);
        Type listType = new TypeToken<ArrayList<RedditNlpObject>>(){}.getType();
        String json = new Gson().toJson(nlpObjects, listType);
        return json;
    }

}
