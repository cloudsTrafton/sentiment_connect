package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import java.sql.Timestamp
import java.text.SimpleDateFormat

case class RedditNlpObject(entityType: String,
                           var loadTime: String,
                           entityName: String,
                           negativeConfidenceAvg: Double,
                           negativeMentionCount: Long,
                           positiveConfidenceAvg: Double,
                           positiveMentionCount: Long,
                           subreddit: String) {

  // todo probably clean this bit up
  private val dateFormat = new SimpleDateFormat("yyyy-mm-dd")
  this.loadTime = new Timestamp(dateFormat.parse(this.loadTime).getTime).toString

}
