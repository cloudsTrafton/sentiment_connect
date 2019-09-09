package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import org.apache.spark.sql.functions.{col, desc}
import org.apache.spark.sql.{DataFrame, SaveMode}

object NlpDataRetriever extends SparkSessionWrapper {

  // S3 NLP data locations
  private final val submissionsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/submissions_processed/reddit_submissions_NLP"
  private final val commentsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/comments_processed/reddit_comments_NLP"

  // S3 search terms/subreddits params for data collection
  private final val submissionParamsPath = "s3a://reddit-data-sentiment-connect/submission-parameters"
  private final val commentParamsPath = "s3a://reddit-data-sentiment-connect/comment-parameters"

  // Current Data Parameters
  private var currentSubmissionParams: Array[(String, String)] = this.getCommentParams
  private var currentCommentsParams: Array[(String, String)] = this.getCommentParams


  // Main function to get NLP comment Data
  def getCommentsDataFiltered(searchTerm: String, subReddit: String): Array[RedditNlpObject] = {

    val rawNlpData: DataFrame = this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.commentsS3Bucket).toDF()
      .where(col(colName = "named_entities").rlike(searchTerm) && col(colName = "subreddit") === subReddit)
      .orderBy(desc(columnName = "load_ts"))

    val formattedData: Array[RedditNlpObject] = rawNlpData.rdd.collect().map(row => {
      RedditNlpObject(
        entityType = row(0).toString,
        loadTime = row(1).toString,
        entityName = row(2).toString,
        negativeConfidenceAvg = row(3).asInstanceOf[Double],
        negativeMentionCount = row(4).asInstanceOf[Long],
        positiveConfidenceAvg = row(5).asInstanceOf[Double],
        positiveMentionCount = row(6).asInstanceOf[Long],
        subreddit = row(7).toString)
    })
    formattedData
  }


  // Main function to get NLP submission Data
  def getSubmissionsDataFiltered(searchTerm: String, subReddit: String): Array[RedditNlpObject] = {

    val rawNlpData: DataFrame = this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.submissionsS3Bucket).toDF()
      .where(col(colName = "named_entities").rlike(searchTerm) && col(colName = "subreddit") === subReddit)
      .orderBy(desc(columnName = "load_ts"))

    val formattedData: Array[RedditNlpObject] = rawNlpData.rdd.collect().map(row => {
      RedditNlpObject(
        entityType = row(0).toString,
        loadTime = row(1).toString,
        entityName = row(2).toString,
        negativeConfidenceAvg = row(3).asInstanceOf[Double],
        negativeMentionCount = row(4).asInstanceOf[Long],
        positiveConfidenceAvg = row(5).asInstanceOf[Double],
        positiveMentionCount = row(6).asInstanceOf[Long],
        subreddit = row(7).toString)
    })
    formattedData
  }


  // Call this first to check for submissions data
  def checkSubmissionParams(searchTerm: String, subReddit: String): Boolean = {
    val dataCheck: Boolean = this.currentSubmissionParams.contains((searchTerm, subReddit))
    if (!dataCheck) {
      reloadSubmissionParams(searchTerm, subReddit)
    }
    dataCheck
  }


  // Call this first for check for comments data
  def checkCommentParams(searchTerm: String, subReddit: String): Boolean = {
    val dataCheck: Boolean = this.currentCommentsParams.contains((searchTerm, subReddit))
    if (!dataCheck) {
      reloadCommentParams(searchTerm, subReddit)
    }
    dataCheck
  }


  // Method to get the full submissions data (for testing)
  def getSubmissionDataFull: DataFrame = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.submissionsS3Bucket).toDF()
      .orderBy(desc(columnName = "load_ts"))
  }


  // Method to get the full comment data (for testing)
  def getCommentDataFull: DataFrame = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.commentsS3Bucket).toDF()
      .orderBy(desc(columnName = "load_ts"))
  }


  private def reloadSubmissionParams(searchTerm: String, subReddit: String): Unit = {
    import sparkSession.implicits._
    val combinedParams: Seq[(String, String)] = this.currentSubmissionParams ++ Seq((searchTerm, subReddit))
    val dataParams: DataFrame = combinedParams.toDF

    // Overwrite and save new submissions parameters
    println("Reloading Submission Parameters")
    dataParams.coalesce(numPartitions = 1).write.mode(SaveMode.Overwrite)
      .format(source = "csv")
      .option("header", "true")
      .save(this.submissionParamsPath)
    println(s"Saved New Submission Parameter: $searchTerm, r/$subReddit")

    // Reset current submission parameters
    this.currentSubmissionParams = this.getSubmissionParams
  }


  private def reloadCommentParams(searchTerm: String, subReddit: String): Unit = {
    import sparkSession.implicits._
    val combinedParams: Seq[(String, String)] = this.currentSubmissionParams ++ Seq((searchTerm, subReddit))
    val dataParams: DataFrame = combinedParams.toDF

    // Overwrite and save new submissions parameters
    println("Reloading Comment Parameters")
    dataParams.coalesce(numPartitions = 1).write.mode(SaveMode.Overwrite)
      .format(source = "csv")
      .option("header", "true")
      .save(this.commentParamsPath)
    println(s"Saved New Comment Parameter: $searchTerm, r/$subReddit")

    // Reset current comment parameters
    this.currentCommentsParams = this.getCommentParams
  }


   def getSubmissionParams: Array[(String, String)] = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .csv(this.submissionParamsPath)
      .rdd.map(param => (param(0).toString, param(1).toString)).collect()
  }


   def getCommentParams: Array[(String, String)] = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .csv(this.commentParamsPath)
      .rdd.map(param => (param(0).toString, param(1).toString)).collect()
  }

}
