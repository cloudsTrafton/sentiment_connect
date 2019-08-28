package com.coolkidsclub.sentiment_connect.controller.RedditDataController


object PushShiftEndpoints {

  def getSubmissionsURL(searchTerm: String, subReddit: String): String = {
    s"https://api.pushshift.io/reddit/search/submission/?q=${this.formatSearchTerm(searchTerm)}&subreddit=$subReddit&fields=subreddit,title&after=24h&size=500"
  }

  def getCommentsURL(searchTerm: String, subReddit: String): String = {
    s"https://api.pushshift.io/reddit/search/comment/?q=${this.formatSearchTerm(searchTerm)}&subreddit=$subReddit&fields=subreddit,body&after=24h&size=500"
  }

  def getCommentsAggregation(searchTerm: String, frequency: String, timeFrame: String): String = {
    s"https://api.pushshift.io/reddit/search/comment/?q=${this.formatSearchTerm(searchTerm)}&aggs=subreddit&frequency=$frequency&after=$timeFrame&size=0"
  }

  def getSubmissionsAggregation(searchTerm: String, frequency: String, timeFrame: String): String = {
    s"https://api.pushshift.io/reddit/search/submission/?q=${this.formatSearchTerm(searchTerm)}&aggs=subreddit&frequency=$frequency&after=$timeFrame&size=0"
  }

  def formatSearchTerm(searchTerm: String): String = {
    searchTerm.trim.replaceAll(" ", "%20")
  }

}

object PushShiftJsonUtils {

  import scala.io.Source
  import scala.io.BufferedSource

  def downloadSubmissionsJson(searchTerm: String, subReddit: String): String = {
    val pushShiftURL: String = PushShiftEndpoints.getSubmissionsURL(searchTerm, subReddit)
    val JsonDataConnection: BufferedSource = Source.fromURL(pushShiftURL)
    val JsonSubmissionString: String = JsonDataConnection.mkString.toString.stripLineEnd
    JsonDataConnection.close()
    JsonSubmissionString
  }

  def downloadCommentsJson(searchTerm: String, subReddit: String): String = {
    val pushShiftURL: String = PushShiftEndpoints.getCommentsURL(searchTerm, subReddit)
    val JsonDataConnection: BufferedSource = Source.fromURL(pushShiftURL)
    val JsonCommentsString: String = JsonDataConnection.mkString.toString.stripLineEnd
    JsonDataConnection.close()
    JsonCommentsString
  }

  def downloadSubmissionsAggregationJson(searchTerm: String, frequency: String, timeFrame: String): String = {
    val pushShiftURL: String = PushShiftEndpoints.getSubmissionsAggregation(searchTerm, frequency, timeFrame)
    val JsonDataConnection: BufferedSource = Source.fromURL(pushShiftURL)
    val JsonAggString: String = JsonDataConnection.mkString.toString.stripLineEnd
    JsonDataConnection.close()
    JsonAggString
  }

  def downloadCommentsAggregationJson(searchTerm: String, frequency: String, timeFrame: String): String = {
    val pushShiftURL: String = PushShiftEndpoints.getCommentsAggregation(searchTerm, frequency, timeFrame)
    val JsonDataConnection: BufferedSource = Source.fromURL(pushShiftURL)
    val JsonAggString: String = JsonDataConnection.mkString.toString.stripLineEnd
    JsonDataConnection.close()
    JsonAggString
  }

}
