/**
 * Endpoint calls wrapped in pretty little functions
 *
 */

import axios from 'axios';

const local_path = "http://localhost:8080";

const reddit_get_context_path = "/reddit/get/";


/**
 * Calls the endpoint to get sentiment information by subreddit on submissions.
 * @param subreddit the subreddit.
 * @param searchTerm the searchTerm
 * @returns {string}
 */
export function getSentimentFromSearchTermSubreddit(subreddit, searchTerm) {
    let res = '';
    axios.get(local_path + reddit_get_context_path + "submissions/" + subreddit, {
        params: {'searchTerm': searchTerm},
        headers: {"Access-Control-Allow-Origin": "*"}
    })
        .then(response => (res = response.data.data))
        .catch(error => {
            console.log(error)
        });
    return res
}

/**
 * Calls the endpoint to get sentiment information by subreddit on submissions.
 * @param subreddit
 * @param searchTerm
 * @returns {string}
 */
export function getSentimentFromSearchTermSubredditComments(subreddit, searchTerm) {
    let res = '';
    axios.get(local_path + reddit_get_context_path + "comments/" + subreddit, {
        params: {'searchTerm': searchTerm},
        headers: {"Access-Control-Allow-Origin": "*"}
    })
        .then(response => (res = response.data.data))
        .catch(error => {
            console.log(error)
        });
    return res
}


/**
 * Calls endpoint to get aggregated information.
 * @param searchTerm
 * @param frequency
 * @param timeFrame
 * @returns {string}
 */
export function getSearchTermAggregatedCounts(searchTerm, frequency, timeFrame) {
    let res = '';
    axios.get(local_path + reddit_get_context_path + "aggregation", {
        params: {'searchTerm': searchTerm,
                 'frequency': frequency,
                 'timeFrame': timeFrame},
        headers: {"Access-Control-Allow-Origin": "*"}
    })
        .then(response => (res = response.data.data))
        .catch(error => {
            console.log(error)
        });
    return res
}