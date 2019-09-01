package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import java.sql.Timestamp
import java.text.SimpleDateFormat


// Class to hold the NLP data by each row in the Dataframe
case class RedditNlpObject(entityType: String,
                           var loadTime: String,
                           entityName: String,
                           negativeConfidenceAvg: Double,
                           negativeMentionCount: Long,
                           positiveConfidenceAvg: Double,
                           positiveMentionCount: Long,
                           subreddit: String) {

  // Date String Formatting
  private val dateFormat = new SimpleDateFormat("yyyy-MM-dd")

  // Reformat the load_ts timestamp
  this.loadTime = new Timestamp(dateFormat.parse(this.loadTime).getTime).toString.split(" ")(0)

  // Pretty print formatting
  override def toString: String = {
    s"${this.entityType} : ${this.loadTime} : " +
      s"${this.entityName} : ${this.subreddit} : " +
      s"${this.negativeConfidenceAvg} : ${this.negativeMentionCount} : " +
      s"${this.positiveConfidenceAvg} : ${this.positiveMentionCount}"
  }

}
