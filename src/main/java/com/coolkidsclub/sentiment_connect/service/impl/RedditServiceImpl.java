package com.coolkidsclub.sentiment_connect.service.impl;


import com.coolkidsclub.sentiment_connect.controller.AwsS3Utils;
import com.coolkidsclub.sentiment_connect.model.PushshiftEndpoints;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.File;

/**
 * Provides service for interacting with the PushShift Reddit API
 */
@Service
public class RedditServiceImpl implements RedditService {

    private AwsS3Utils awsS3Utils = new AwsS3Utils();

    @Override
    public String getSubRedditDataFromSubmission(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftEndPoint = PushshiftEndpoints.apply().getSubmissionsURL(searchTerm, subreddit);
        String result = restTemplate.getForObject(pushShiftEndPoint, String.class);


        // Todo Testing the S3 file upload
        this.awsS3Utils.loadSubmissionData(result);
        return result;

    }

    @Override
    public String getSubredditDataFromComments(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftendPoint = PushshiftEndpoints.apply().getCommentsURL(searchTerm, subreddit);
        return restTemplate.getForObject(pushShiftendPoint, String.class);
    }

    @Override
    public String getSubredditAggregatedCounts(String searchTerm, String frequency, String timeFrame) {
        RestTemplate restTemplate = new RestTemplate();
        String submissionendPoint = PushshiftEndpoints.apply().getSubmissionsAggregation(searchTerm, frequency, timeFrame);
        String commentsEndPoint = PushshiftEndpoints.apply().getCommentsAggregation(searchTerm, frequency, timeFrame);

        String submissionAggData =
                restTemplate.getForObject(submissionendPoint, String.class);

        String commentsAggData =
                restTemplate.getForObject(commentsEndPoint, String.class);
        return submissionAggData + commentsAggData;
    }
}
