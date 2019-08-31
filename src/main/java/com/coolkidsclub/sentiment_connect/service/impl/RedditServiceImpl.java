package com.coolkidsclub.sentiment_connect.service.impl;


import com.coolkidsclub.sentiment_connect.controller.RedditDataController.PushShiftEndpoints;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Provides service for interacting with the PushShift Reddit API
 */

@Service
public class RedditServiceImpl implements RedditService {


    @Override
    public String getSubRedditDataFromSubmission(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftEndPoint = PushShiftEndpoints.getSubmissionsURL(searchTerm, subreddit);
        return restTemplate.getForObject(pushShiftEndPoint, String.class);
    }

    @Override
    public String getSubredditDataFromComments(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftendPoint = PushShiftEndpoints.getCommentsURL(searchTerm, subreddit);
        return restTemplate.getForObject(pushShiftendPoint, String.class);
    }

    @Override
    public String getSubredditsForSearchTerm(String searchTerm, String frequency, String timeFrame) {
        RestTemplate restTemplate = new RestTemplate();
        String submissionendPoint = PushShiftEndpoints.getSubmissionsAggregation(searchTerm, frequency, timeFrame);
        return restTemplate.getForObject(submissionendPoint, String.class);
    }
}
