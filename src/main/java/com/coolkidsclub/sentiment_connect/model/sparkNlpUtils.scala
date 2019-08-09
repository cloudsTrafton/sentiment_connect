package com.coolkidsclub.sentiment_connect.model

import org.apache.spark.sql.{DataFrame, SparkSession}
import org.apache.spark.ml.PipelineModel
import org.apache.spark.sql.functions.{col, current_timestamp, desc, explode, mean, monotonically_increasing_id, sum, when}

// trait to hold the spark session
trait sparkNlpSessionWrapper {
  lazy val sparkSession: SparkSession = SparkSession.builder().appName("NLP Utils").config("spark.master", "local").getOrCreate()
}


// Trait to hold the NLP models/pipelines
trait sparkNlpWrapper {
  final val entityModelPath: String = "/Users/briankalinowski/Desktop/sentiment_connect/src/main/java/com/coolkidsclub/sentiment_connect/NLP_Trained_Models/recognize_entities_dl_en_2.1.0_2.4_1562946909722"
  final val sentimentModelPath: String = "/Users/briankalinowski/Desktop/sentiment_connect/src/main/java/com/coolkidsclub/sentiment_connect/NLP_Trained_Models/analyze_sentiment_en_2.1.0_2.4_1563204637489"
  lazy val NERPipeline: PipelineModel = PipelineModel.load(this.entityModelPath)
  lazy val sentimentPipeLine: PipelineModel = PipelineModel.load(this.sentimentModelPath)
}


// NLP data Processing object
object sparkNlpUtils extends sparkNlpSessionWrapper with sparkNlpWrapper {

  def processRawJSON(jsonPath: String, redditType: String): DataFrame = {

    val textColumn: String = {
      if (redditType.equals("C")) "body" else if (redditType.equals("S")) "title" else throw new Exception
    }

    this.sparkSession.read
      .option("inferSchema", value = true) // infer json schema
      .option("header", value = true) // header columns
      .option("multiLine", value = true) // multiline option
      .option("mode", "DROPMALFORMED") // drops any mal-formatted json records
      .json(jsonPath).toDF()
      .select(explode(col("data"))) // expands json array root
      .select("col.*") // expands col json struct
      .select("subreddit", textColumn) // select needed columns
      .withColumnRenamed(textColumn, "text") // rename title to text
      .withColumn("prime_id", monotonically_increasing_id()) // adds an increasing id to each row
  }


  def processNERData(redditData: DataFrame): DataFrame = {
    val NERData = this.NERPipeline.transform(redditData) // transform with NER model
      .select("prime_id", "subreddit", "entities.result")
      .withColumnRenamed("result", "named_entity")
      .orderBy("prime_id")
    NERData
  }


  def processSentimentData(data: DataFrame): DataFrame = {
    val sentimentData = this.sentimentPipeLine.transform(data) // transform with Sentiment model
      .select("prime_id", "subreddit", "sentiment.result", "sentiment.metadata")
      .withColumnRenamed("result", "sentiment")
      .withColumnRenamed("metadata", "sentiment_confidence")
      .orderBy("prime_id")
    sentimentData
  }


  def joinAndLoadProcessedData(nerData: DataFrame, sentimentData: DataFrame): DataFrame = {
    nerData.join(sentimentData, Seq("prime_id", "subreddit"), "inner")
      .withColumn("named_entity", explode(col("named_entity"))) // expand named entities array
      .withColumn("sentiment", explode(col("sentiment"))) // expand sentiment array
      .withColumn("sentiment_confidence", explode(col("sentiment_confidence"))) // expand sentiment confidence array
      .withColumn("sentiment_confidence", col("sentiment_confidence").getField("confidence")) // get confidence value
      .withColumn("load_ts", current_timestamp()) // add timestamp column
  }


  def processNlpAggregation(processedData: DataFrame): DataFrame = {
    processedData.groupBy("subreddit", "named_entity").agg(
      sum(when(col("sentiment") === "positive", 1).otherwise(0)).as("positive_count"), // sum of positive sentences
      mean(when(col("sentiment") === "positive", col("sentiment_confidence")).otherwise(0.0)).as("positive_confidence_avg"),
      sum(when(col("sentiment") === "negative", 1).otherwise(0)).as("negative_count"), // sum of negative sentences
      mean(when(col("sentiment") === "negative", col("sentiment_confidence")).otherwise(0.0)).as("negative_confidence_avg"))
      .withColumn("load_ts", current_timestamp())
      .orderBy(desc("positive_count"), desc("positive_confidence_avg"))
  }

}
