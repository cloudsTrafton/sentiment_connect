package com.coolkidsclub.sentiment_connect.controller;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("reddit")
public class SentimentController {

    @Autowired
    RedditService redditService;



//         * REDDIT SUBMISSIONS PART 1 (no subreddit):
//            *
//            *  - URL: https://api.pushshift.io/reddit/search/submission/?q=<SEARCH_TERM&fields=subreddit,title&after=24h&size=500
//            *
//            *  - Gets all submissions containing the search term from the last 24 hours
//     *
//             *  - SEARCH_TERM: Get from the frontend text box, everything else is hardcoded url

    @GetMapping(value = "/get/submissions", produces = "application/json")
    public String getSentimentFromSearchTermSiteWide(@RequestParam String searchTerm) {
        return redditService.getSiteDataFromSubmission(searchTerm);
    }

    /*
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
//    */
    @GetMapping(value = "/get/submissions/{subreddit}", produces = "application/json")
    public String getSentimentFromSearchTermSubreddit(@PathVariable String subreddit, @RequestParam String searchTerm) {
        return redditService.getSubRedditDataFromSubmission(subreddit, searchTerm);
    }

    /*
     *
     * REDDIT COMMENTS (Requires a subreddit parameter!!!):
     *
     *  - URL: https://api.pushshift.io/reddit/search/comment/?q=SEARCH_TERM&subreddit=SUB_REDDIT&fields=subreddit,body&after=24h&size=500
     *
     *  - Requires both SEARCH_TERM and SUB_REDDIT params
     *
     *  - Get all comments containing the search term from the subreddit from the last 24 hours
     *
     */
    @GetMapping(value = "/get/comments/{subreddit}", produces = "application/json")
    public String getSentimentFromSearchTermSubredditComments(@PathVariable String subreddit, @RequestParam String searchTerm) {
        return redditService.getSubredditDataFromComments(searchTerm, subreddit);
    }


     /*
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
     */

    @GetMapping(value = "/get/aggregation", produces = "application/json")
    public String getSearchTermAggregatedCounts(@RequestParam String searchTerm,
                                                @RequestParam String frequency,
                                                @RequestParam String timeFrame) {
        return redditService.getSubredditAggregatedCounts(searchTerm, frequency, timeFrame);
    }
}
