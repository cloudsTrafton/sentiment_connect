package com.coolkidsclub.sentiment_connect.service.i;

/**
 * Interface definition for reddit interactions.
 */
public interface RedditService {

    public String getSiteDataFromSubmission(String searchTerm);

    public String getSubRedditDataFromSubmission(String searchTerm, String subreddit);

    public String getSubredditDataFromComments(String searchTerm, String subreddit);

    public String getSubredditAggregatedCounts(String searchTerm, String frequency, String timeFrame);

}
