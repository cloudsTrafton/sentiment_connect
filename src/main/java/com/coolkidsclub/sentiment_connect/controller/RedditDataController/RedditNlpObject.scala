package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import java.sql.Timestamp
import java.text.SimpleDateFormat


// Class to hold the NLP data by each row in the DataFrame
case class RedditNlpObject(entityType: String,
                           var loadTime: String,
                           entityName: String,
                           negativeConfidenceAvg: Double,
                           negativeMentionCount: Long,
                           positiveConfidenceAvg: Double,
                           positiveMentionCount: Long,
                           subreddit: String) {

  // Date String Formatting
  @transient
  private val dateFormat = new SimpleDateFormat("yyyy-MM-dd")

  // Reformat the load_ts timestamp
  this.loadTime = new Timestamp(dateFormat.parse(this.loadTime).getTime).toString.split(" ")(0)
  this.loadTime = this.loadTime.toString

  // Pretty print formatting
  override def toString: String = {
    s"{entityType: ${this.entityType}, " +
      s"loadTime: ${this.loadTime}, " +
      s"entityName: ${this.entityName}, " +
      s"subreddit: ${this.subreddit}, " +
      s"negativeConfidenceAvg: ${this.negativeConfidenceAvg}, " +
      s"negativeMentionCount: ${this.negativeMentionCount}, " +
      s"positiveConfidenceAvg: ${this.positiveConfidenceAvg}, " +
      s"positiveMentionCount: ${this.positiveMentionCount}} "
  }

}

object RedditNlpObject {
  val DEFAULT_OBJ = new RedditNlpObject(
    entityType = "DEFAULT_OBJECT",
    loadTime = "2019-01-01",
    entityName = "",
    negativeConfidenceAvg = 0.0,
    negativeMentionCount = 0,
    positiveConfidenceAvg = 0.0,
    positiveMentionCount = 0,
    subreddit = "")
}
