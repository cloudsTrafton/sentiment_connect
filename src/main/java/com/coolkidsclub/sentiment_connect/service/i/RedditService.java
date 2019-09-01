package com.coolkidsclub.sentiment_connect.service.i;

import com.coolkidsclub.sentiment_connect.controller.RedditDataController.RedditNlpObject;

import java.util.ArrayList;

/**
 * Interface definition for reddit interactions.
 */
public interface RedditService {

    ArrayList<RedditNlpObject> getSubmissionNlpData(String searchTerm, String subreddit);

    ArrayList<RedditNlpObject> getCommentNlpData(String searchTerm, String subreddit);

}
