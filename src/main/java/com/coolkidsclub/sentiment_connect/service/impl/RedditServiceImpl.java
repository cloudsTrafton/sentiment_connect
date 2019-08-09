package com.coolkidsclub.sentiment_connect.service.impl;


import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Provides service for interacting with the PushShift Reddit API
 */
@Service
public class RedditServiceImpl implements RedditService {

    /**
     * Get sitewide data for the given searchterm from submissions.
     * @param searchTerm the term to search for within reddit.
     * @return TODO
     */
    @Override
    public String getSiteDataFromSubmission(String searchTerm) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftendPoint = "https://api.pushshift.io/reddit/search/submission/?q=" +
                searchTerm + "&fields=subreddit,title&after=24h&size=500";
        String redditPostData =
                restTemplate.getForObject(pushShiftendPoint, String.class);
        return redditPostData;
    }

    @Override
    public String getSubRedditDataFromSubmission(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftendPoint = "https://api.pushshift.io/reddit/search/submission/?q=" +
                searchTerm + "&fields=" + subreddit + ",title&after=24h&size=500";
        String redditPostData =
                restTemplate.getForObject(pushShiftendPoint, String.class);
        return redditPostData;
    }

    @Override
    public String getSubredditDataFromComments(String searchTerm, String subreddit) {
        RestTemplate restTemplate = new RestTemplate();
        String pushShiftendPoint = "https://api.pushshift.io/reddit/search/comment/?q=" +
                searchTerm + "&fields=" + subreddit + ",title&after=24h&size=500";
        String redditPostData =
                restTemplate.getForObject(pushShiftendPoint, String.class);
        return redditPostData;
    }

    @Override
    public String getSubredditAggregatedCounts(String searchTerm, String frequency, String timeFrame) {
        RestTemplate restTemplate = new RestTemplate();
        String submissionendPoint = "https://api.pushshift.io/reddit/search/submission/?q="
                + searchTerm + "&aggs=subreddit&frequency=" + frequency + "&after=" + timeFrame + "&size=0";

        String commentsEndPoint = "https://api.pushshift.io/reddit/search/comment/?q="
                + searchTerm + "&aggs=subreddit&frequency=" + frequency + "&after=" + timeFrame + "&size=0";

        String submissionAggData =
                restTemplate.getForObject(submissionendPoint, String.class);

        String commentsAggData =
                restTemplate.getForObject(commentsEndPoint, String.class);
        return submissionAggData + commentsAggData;
    }
}
