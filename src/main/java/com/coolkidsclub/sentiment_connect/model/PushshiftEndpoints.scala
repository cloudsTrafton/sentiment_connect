package com.coolkidsclub.sentiment_connect.model

case class PushshiftEndpoints() {

  def getSubmissionsURL(searchTerm: String, subReddit: String): String = {
    s"https://api.pushshift.io/reddit/search/submission/?q=$searchTerm&subreddit=$subReddit&fields=subreddit,title&after=24h&size=500"
  }

  def getCommentsURL(searchTerm: String, subReddit: String): String = {
    s"https://api.pushshift.io/reddit/search/comment/?q=$searchTerm&subreddit=$subReddit&fields=subreddit,body&after=24h&size=500"
  }

  def getCommentsAggregation(searchTerm: String, frequency: String, timeFrame: String): String = {

    // todo Probalby need some checks for the frequncy and timeframe since those need to be in the proper format
    s"https://api.pushshift.io/reddit/search/comment/?q=$searchTerm&aggs=subreddit&frequency=$frequency&after=$timeFrame&size=0"
  }

  def getSubmissionsAggregation(searchTerm: String, frequency: String, timeFrame: String): String = {
    // todo Probalby need some checks for the frequncy and timeframe since those need to be in the proper format
    s"https://api.pushshift.io/reddit/search/submission/?q=$searchTerm&aggs=subreddit&frequency=$frequency&after=$timeFrame&size=0"
  }

}
