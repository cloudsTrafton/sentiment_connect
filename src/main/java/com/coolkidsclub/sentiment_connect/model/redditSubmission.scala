package com.coolkidsclub.sentiment_connect.model

case class redditSubmission(subReddit: String, title: String) extends Product with Serializable {

  def getSubmissionsubreddit: String = this.subReddit

  def getSubmissionTitle: String = this.title

  override def canEqual(that: Any): Boolean = that.isInstanceOf[redditSubmission]

  override def productElement(n: Int): Any = n match {
    case 0 => subReddit
    case 1 => title
  }
}