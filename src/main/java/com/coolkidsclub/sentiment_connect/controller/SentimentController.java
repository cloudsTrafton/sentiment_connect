package com.coolkidsclub.sentiment_connect.controller;
import com.coolkidsclub.sentiment_connect.model.RedditPostData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("reddit")
public class SentimentController {

    /*
     * REDDIT SUBMISSIONS PART 1 (no subreddit):
     *
     *  - URL: https://api.pushshift.io/reddit/search/submission/?q=<SEARCH_TERM&fields=subreddit,title&after=24h&size=500
     *
     *  - Gets all submissions containing the search term from the last 24 hours
     *
     *  - SEARCH_TERM: Get from the frontend text box, everything else is hardcoded url
     *
     *
     * REDDIT SUBMISSIONS PART 2 (With subreddit):
     *
     *  - URL: https://api.pushshift.io/reddit/search/submission/?q=SEARCH_TERM&subreddit=SUB_REDDIT&fields=subreddit,title&after=24h&size=500
     *
     *  - Get all submissions containing the search term from the subreddit from the last 24 hours
     *
     *  - SEARCH_TERM: Get from the frontend text box, everything else is hardcoded url
     *
     *  - SUB_REDDIT: Get from frontend text box
     *
     *
     * REDDIT COMMENTS (Requires a subreddit parameter!!!):
     *
     *  - URL: https://api.pushshift.io/reddit/search/comment/?q=SEARCH_TERM&subreddit=SUB_REDDIT&fields=subreddit,body&after=24h&size=500
     *
     *  - Requires both SEARCH_TERM and SUB_REDDIT params
     *
     *  - Get all comments containing the search term from the subreddit from the last 24 hours
     *
     *
     *
     *  REDDIT AGGREGATIONS (Both Submissions and Comments)
     *
     *  - URL (Submissions): https://api.pushshift.io/reddit/search/submission/?q=SEARCH_TERM&aggs=subreddit&frequency=FREQ&after=TIME_FRAME&size=0
     *
     *  - URL (Comments): https://api.pushshift.io/reddit/search/comment/?q=SEARCH_TERM&aggs=subreddit&frequency=FREQ&after=TIME_FRAME&size=0
     *
     *  - Gets Counts of Submissions or Comments that mention the search term in each Subreddit for the frequency provided
     *
     *  - FREQ: how many submissions/comments were posted per FREQ
     *    (minute, hour, day, week, month, year maybe just a drop down menu for these options)
     *
     *  - TIME_FRAME: Look back time (s, m, h, d + some number ie. 30d for 30 days)
     *
     *  - Probably should limit Time frame so like 100y doesn't mess up
     *
     *
     */



    /**
     * This is just an example endpoint. If you want to interface with some kind of backend (like the spark stuff)
     * and give to the front end, you do so through an endpoint.
     * @param subreddit
     * @param search_term
     * @return
     */
    @GetMapping(value = "/get/{subreddit}/{search_term}", produces = "application/json")
    public void getSentimentFromTopicAndSubreddit(@PathVariable String subreddit, @PathVariable String search_term) {
        RestTemplate restTemplate = new RestTemplate();
        RedditPostData redditPostData =
                restTemplate.getForObject("https://api.pushshift.io/reddit/search/submission/?q=" + search_term, RedditPostData.class);

        System.out.println(redditPostData);

    }


}
