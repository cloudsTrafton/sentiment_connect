package com.coolkidsclub.sentiment_connect.controller.RedditDataController

import java.text.SimpleDateFormat
import java.sql.Timestamp


object DataTesting extends App {

  val submissionsTest: Array[RedditNlpObject] = NlpDataRetriever.getSubmissionsDataFiltered(searchTerm = "Trump", subReddit = "politics")

  val dateFormat = new SimpleDateFormat("yyyy-mm-dd")
  val mapTest = submissionsTest.map(obj => {
    new Timestamp(dateFormat.parse(obj.loadTime).getTime)
  })

  submissionsTest.foreach(obj => println(obj.entityType))

}
