package com.coolkidsclub.sentiment_connect.controller.RedditDataController


import com.amazonaws.auth.profile.ProfileCredentialsProvider
import org.apache.spark.sql.SparkSession
import org.apache.log4j.{Level, Logger}


trait SparkSessionWrapper {

  // AWS credentials
  final val access_key: String = new ProfileCredentialsProvider().getCredentials.getAWSAccessKeyId
  final val secret_key: String = new ProfileCredentialsProvider().getCredentials.getAWSSecretKey

  // Spark Session
  lazy val sparkSession: SparkSession = SparkSession.builder()
    .appName("sentiment-connect data controller")
    .master("local[*]")
    .config("spark.driver.memory", "12G")
    .config("spark.kryoserializer.buffer.max", "200M")
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
    .getOrCreate()

  // Spark config stuffs
  Logger.getLogger("org").setLevel(Level.ERROR)
  Logger.getLogger("akka").setLevel(Level.ERROR)

  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.access.key", access_key)
  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.secret.key", secret_key)
  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem ")

}
