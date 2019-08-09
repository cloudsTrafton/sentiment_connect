package com.coolkidsclub.sentiment_connect.model

import org.apache.spark.sql.DataFrame

case class SparkNlpDataProcessing(redditJson: String, fileType: String) {

  // Process Raw JSON data
  private val rawData: DataFrame = sparkNlpUtils.processRawJSON(redditJson, fileType)

  // Entity extraction
  private val nerData: DataFrame = sparkNlpUtils.processNERData(rawData)

  // Sentiment Extraction
  private val sentimentData: DataFrame = sparkNlpUtils.processSentimentData(rawData)

  // Join Entity and Sentiment data
  private val processedData: DataFrame = sparkNlpUtils.joinAndLoadProcessedData(nerData, sentimentData)

  // Agg data?
  private val NlpAggregationData: DataFrame = sparkNlpUtils.processNlpAggregation(processedData)

  def getProcessedData: DataFrame = this.processedData

  def getNLPData: DataFrame = this.NlpAggregationData

}
