package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.functions.col

object NlpDataRetriever extends SparkSessionWrapper {

  // S3 locations
  private final val submissionsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/submissions_processed/reddit_submissions_NLP"
  private final val commentsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/comments_processed/reddit_comments_NLP"

  def getCommentsData(searchTerm: String, subReddit: String): DataFrame = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.commentsS3Bucket).toDF()
      .where(col("named_entities").rlike("Trump") && col("subreddit") === "politics")
  }

  def getSubmissionsData(searchTerm: String, subReddit: String): DataFrame = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.submissionsS3Bucket).toDF()
      .where(col("named_entities").rlike(searchTerm) && col("subreddit") === subReddit)
  }

}
