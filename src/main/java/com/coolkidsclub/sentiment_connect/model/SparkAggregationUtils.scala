package com.coolkidsclub.sentiment_connect.model

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.sql.functions.{col, current_timestamp, explode}

trait sparkAggSessionWrapper {
  lazy val sparkSession: SparkSession = SparkSession.builder().appName("Aggregation Utils").config("spark.master", "local").getOrCreate()
}

object SparkAggregationUtils extends sparkAggSessionWrapper {

  def processAggregationData(jsonPath: String, redditType: String): DataFrame = {
    val countName = if (redditType.equals("C")) "comment_count" else "submission_count"

    val commentAggRaw: DataFrame = this.sparkSession.read
      .option("inferSchema", value = true)
      .option("header", value = true)
      .option("multiLine", value = true)
      .option("mode", "DROPMALFORMED")
      .json(jsonPath).toDF()
      .select("aggs.*")
      .select(explode(col("subreddit")))
      .select("col.*")
      .withColumnRenamed("doc_count", countName)
      .withColumnRenamed("key", "subreddit")
      .withColumn("load_ts", current_timestamp())
    commentAggRaw
  }

}

case class SparkAggregationProcessing(redditJson: String, fileType: String) {
  private val aggData = SparkAggregationUtils.processAggregationData(redditJson, fileType)

  def getAggregationData: DataFrame = this.aggData
}
