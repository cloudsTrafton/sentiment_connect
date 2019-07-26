package com.coolkidsclub.sentiment_connect.model

import org.apache.log4j.Logger
import org.apache.log4j.Level
import org.apache.spark.rdd.RDD
import org.apache.spark.{SparkConf, SparkContext}
//import org.apache.spark.

object SparkTest extends App {
  val config = new SparkConf().setMaster("local").setAppName("test")
  val sparkContext = new SparkContext(config)
  Logger.getLogger("org").setLevel(Level.ERROR)
  Logger.getLogger("akka").setLevel(Level.ERROR)
  val file: RDD[String] = sparkContext.textFile("/Users/claudiatrafton/Documents/Software engineering/sentiment_connect/src/main/java/com/coolkidsclub/sentiment_connect/model/dummy.txt")
  // word count
  val wordCounts: RDD[(String, Int)] = file.flatMap(line => line.split(" "))
    .map(word => (word.toLowerCase, 1))
    .reduceByKey(_ + _)
    .sortBy(_._2, false)
  // output
  wordCounts.foreach(println)
  println(s"Total words: ${wordCounts.count()}")
}
