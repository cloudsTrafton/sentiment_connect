package com.coolkidsclub.sentiment_connect.service.i;

/**
 * Interface definition for reddit interactions.
 */
public interface RedditService {

    String getSubRedditDataFromSubmission(String searchTerm, String subreddit);

    String getSubredditDataFromComments(String searchTerm, String subreddit);

    String getSubredditsForSearchTerm(String searchTerm, String frequency, String timeFrame);

}
