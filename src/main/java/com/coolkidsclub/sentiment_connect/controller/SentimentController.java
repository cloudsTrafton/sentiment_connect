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
    Submissions:

    after = Epoch value or Integer + "s,m,h,d" (i.e. 30d for 30 days)

    Ex: https://api.pushshift.io/reddit/search/submission/?q=amazon&after=24h&size=500&fields=title,subreddit
    EX with r/ : https://api.pushshift.io/reddit/search/submission/?q=amazon&after=24h&size=500&fields=title,subreddit&subreddit=SUB

    */

    /*
    Comments: (MUST REQUIRE A SUB-REDDIT

    Ex: https://api.pushshift.io/reddit/search/comment/?q=amazon&subreddit=SUB&after=24h&size=500&fields=title,subreddit



    */

    /*
    * https://api.pushshift.io/reddit/search/comment/?q=trump&after=7d&aggs=subreddit&&size=0
    *
    * */

//    @GetMapping(value = "/comment/{search_term}/{time_period}", produces = "application/json")
//    public void getSentimentForComments
    // TODO not sure if we should have one or multiple endpoints, leaning towards one only...


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
