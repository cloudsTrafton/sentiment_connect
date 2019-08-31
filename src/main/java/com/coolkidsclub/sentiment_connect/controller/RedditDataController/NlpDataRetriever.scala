package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import org.apache.spark.sql.functions.col
import org.apache.spark.sql.{DataFrame, SaveMode}

object NlpDataRetriever extends SparkSessionWrapper {

  // S3 NLP data locations
  private final val submissionsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/submissions_processed/reddit_submissions_NLP"
  private final val commentsS3Bucket = "s3a://reddit-data-sentiment-connect/sentiment-data-output/comments_processed/reddit_comments_NLP"

  // S3 search terms/subreddits params for data collection
  private final val submissionParams = "s3a://reddit-data-sentiment-connect/submission-parameters"
  private final val commentParams = "s3a://reddit-data-sentiment-connect/comment-parameters"

  // CurrentData Parameters
  private var currentSubmissionParams: Seq[(String, String)] = this.getCommentParams
  private var currentCommentsParams: Seq[(String, String)] = this.getCommentParams


  // Main function to get NLP comment Data
  def getCommentsDataFiltered(searchTerm: String, subReddit: String): Array[RedditNlpObject] = {

    val rawNlpData: DataFrame = this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .json(this.commentsS3Bucket).toDF()
      .where(col(colName = "named_entities").rlike(searchTerm) && col(colName = "subreddit") === subReddit)

    val formattedData = rawNlpData.rdd.collect().map(row => {
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

    val formattedData = rawNlpData.rdd.collect().map(row => {
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

  def checkSubmissionParams(searchTerm: String, subReddit: String): Boolean = {
    val dataCheck: Boolean = this.currentSubmissionParams.contains((searchTerm, subReddit))
    if (!dataCheck) {
      reloadSubmissionParams(searchTerm, subReddit)
    }
    dataCheck
  }

  def checkCommentParams(searchTerm: String, subReddit: String): Boolean = {
    val dataCheck: Boolean = this.currentCommentsParams.contains((searchTerm, subReddit))
    if (!dataCheck) {
      reloadCommentParams(searchTerm, subReddit)
    }
    dataCheck
  }


  private def reloadSubmissionParams(searchTerm: String, subReddit: String): Unit = {
    import sparkSession.implicits._
    val combinedParams: Seq[(String, String)] = this.currentSubmissionParams ++ Seq((searchTerm, subReddit))
    val dataParams = combinedParams.toDF

    // Overwrite and save new submissions parameters
    println("Reloading Submission Parameters")
    dataParams.coalesce(numPartitions = 1).write.mode(SaveMode.Overwrite)
      .format(source = "csv")
      .option("header", "true")
      .save(this.submissionParams)
    println(s"Saved New Submission Parameter: $searchTerm, r/$subReddit")
    this.currentSubmissionParams = this.getSubmissionParams
  }


  private def reloadCommentParams(searchTerm: String, subReddit: String): Unit = {
    import sparkSession.implicits._
    val combinedParams: Seq[(String, String)] = this.currentSubmissionParams ++ Seq((searchTerm, subReddit))
    val dataParams = combinedParams.toDF

    // Overwrite and save new submissions parameters
    println("Reloading Comment Parameters")
    dataParams.coalesce(numPartitions = 1).write.mode(SaveMode.Overwrite)
      .format(source = "csv")
      .option("header", "true")
      .save(this.commentParams)
    println(s"Saved New Comment Parameter: $searchTerm, r/$subReddit")
    this.currentCommentsParams = this.getCommentParams
  }


  private def getSubmissionParams: Seq[(String, String)] = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .csv(this.submissionParams)
      .rdd.map(param => (param(0).toString, param(1).toString)).collect().toSeq
  }


  private def getCommentParams: Seq[(String, String)] = {
    this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .csv(this.commentParams)
      .rdd.map(param => (param(0).toString, param(1).toString)).collect().toSeq
  }

}
