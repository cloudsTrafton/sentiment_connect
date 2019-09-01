package com.coolkidsclub.sentiment_connect.controller.RedditDataController


object DataTesting extends App {

  /*
    RAW Data Testing
  */

  // Submissions
  val rawSubmissionDataTest = NlpDataRetriever.getSubmissionDataFull
  println(s"Full Submission Count: ${rawSubmissionDataTest.count()}\n")
  println("Distinct Submission Parameters: \n")

  val submissionParams: Array[(String, String)] = rawSubmissionDataTest.select("named_entities", "subreddit")
    .distinct().rdd.collect
    .map(row => {
      (row(0).toString, row(1).toString)
    })
  submissionParams.foreach(println)


  // Comments
  val rawCommentDataTest = NlpDataRetriever.getCommentDataFull
  println(s"\nFull Comment Count: ${rawCommentDataTest.count()}\n")
  println("Distinct Comment Parameters: \n")

  val commentParams: Array[(String, String)] = rawCommentDataTest.select("named_entities", "subreddit")
    .distinct().rdd.collect
    .map(row => {
      (row(0).toString, row(1).toString)
    })
  commentParams.foreach(println)


  /*
    Filtered Data Testing
  */

  // Submissions
  submissionParams.foreach(param => {
    println(s"\nSubmissions Filtered: (${param._1}, ${param._2})")
    NlpDataRetriever.getSubmissionsDataFiltered(param._1, param._2).foreach(println)
    println("\n")
  })


  // Comments
  commentParams.foreach(param => {
    println(s"Comments Filtered: (${param._1}, ${param._2})")
    NlpDataRetriever.getCommentsDataFiltered(param._1, param._2).foreach(println)
    println("\n")
  })

}
