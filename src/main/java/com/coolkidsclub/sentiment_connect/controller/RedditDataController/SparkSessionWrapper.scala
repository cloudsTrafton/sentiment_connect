package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import com.amazonaws.auth.profile.ProfileCredentialsProvider
import org.apache.spark.sql.SparkSession
import org.apache.log4j.{Level, Logger}


trait SparkSessionWrapper {

  // Todo I don't thing we can use the ProfileCredentialsProvider() if this is running on a server

  // AWS credentials
  final val access_key: String = new ProfileCredentialsProvider().getCredentials.getAWSAccessKeyId
  final val secret_key: String = new ProfileCredentialsProvider().getCredentials.getAWSSecretKey

  // Spark Session
  lazy val sparkSession: SparkSession = SparkSession.builder()
    .appName(name = "sentiment connect data controller")
    .master(master = "local[*]")
    .config("spark.driver.memory", "12G")
    .config("spark.kryoserializer.buffer.max", "200M")
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
    .getOrCreate()

  // Logging config stuffs
  Logger.getLogger("org").setLevel(Level.ERROR)
  Logger.getLogger("akka").setLevel(Level.ERROR)

  // Spark, Hadoop, AWS configs
  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.access.key", access_key)
  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.secret.key", secret_key)
  this.sparkSession.sparkContext.hadoopConfiguration.set("fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem ")

}
