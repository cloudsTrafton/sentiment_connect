package com.coolkidsclub.sentiment_connect.service.impl;

import com.coolkidsclub.sentiment_connect.controller.RedditDataController.NlpDataRetriever;
import com.coolkidsclub.sentiment_connect.controller.RedditDataController.PushShiftEndpoints;
import com.coolkidsclub.sentiment_connect.controller.RedditDataController.RedditNlpObject;
import com.coolkidsclub.sentiment_connect.service.i.RedditService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;

/**
 * Provides service for interacting with the PushShift Reddit API
 */

@Service
public class RedditServiceImpl implements RedditService {


    @Override
    public ArrayList<RedditNlpObject> getSubmissionNlpData(String searchTerm, String subreddit) {
        ArrayList<RedditNlpObject> nlpObjects = new ArrayList<>();

        // Check if searchTerm and subreddit are in the params list
        if (NlpDataRetriever.checkSubmissionParams(searchTerm, subreddit)) {
            Collections.addAll(nlpObjects, NlpDataRetriever.getCommentsDataFiltered(searchTerm, subreddit));
        } else {
            nlpObjects.add(RedditNlpObject.DEFAULT_OBJ()); // len = 1
        }
        System.out.println("searchTerm = " + searchTerm + " subreddit = " + subreddit);
        return nlpObjects;
    }

    @Override
    public ArrayList<RedditNlpObject> getCommentNlpData(String searchTerm, String subreddit) {
        ArrayList<RedditNlpObject> nlpObjects = new ArrayList<>();

        // Check if searchTerm and subreddit are in the params list
        if (NlpDataRetriever.checkCommentParams(searchTerm, subreddit)) {
            Collections.addAll(nlpObjects, NlpDataRetriever.getCommentsDataFiltered(searchTerm, subreddit));
        } else {
            nlpObjects.add(RedditNlpObject.DEFAULT_OBJ());  // len = 1
        }
        System.out.println("searchTerm = " + searchTerm + " subreddit = " + subreddit);
        return nlpObjects;
    }

}
