package com.coolkidsclub.sentiment_connect.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Plain old java business object that contains the fields from Reddit that we actually care about.
 * Since the push shift API gives us more than we really need, we can just ignore the properties not
 * present in this object when pulling it in.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class RedditPostData {

    private static final long serialVersionUID = 1L;

    private String id;

    private String permalink;

    private String subreddit;

    private String subreddit_id;

    private String title;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPermalink() {
        return permalink;
    }

    public void setPermalink(String permalink) {
        this.permalink = permalink;
    }

    public String getSubreddit() {
        return subreddit;
    }

    public void setSubreddit(String subreddit) {
        this.subreddit = subreddit;
    }

    public String getSubreddit_id() {
        return subreddit_id;
    }

    public void setSubreddit_id(String subreddit_id) {
        this.subreddit_id = subreddit_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
