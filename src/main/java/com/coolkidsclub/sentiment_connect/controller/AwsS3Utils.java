package com.coolkidsclub.sentiment_connect.controller;


import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import java.io.File;
import java.util.Date;


public class AwsS3Utils {

    private AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_2).withCredentials(new ProfileCredentialsProvider()).build();

    public AwsS3Utils() {

    }

    public void loadCommentData(String rawData) {
        Date date = new Date();
        String fileName = "comment-data-" + date.toString();
        File file = new File(rawData);
        String commentsFolder = "reddit-data-sentiment-connect/pushshift-data-input/comments_raw/";
        this.amazonS3.putObject(commentsFolder, fileName, file);
    }

    public void loadSubmissionData(String rawData) {
        Date date = new Date();
        String fileName = "comment-data-" + date.toString();
        File file = new File(rawData);
        String submissionsFolder = "reddit-data-sentiment-connect/pushshift-data-input/submissions_raw/";
        this.amazonS3.putObject(submissionsFolder, fileName, file);
    }


}
