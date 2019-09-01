/**
 * Endpoint calls wrapped in pretty little functions
 *
 */

import axios from 'axios';

const local_path = "http://localhost:8080";

const reddit_get_context_path = "/reddit/get/";

const pushshiftSubmissionsContextPath = "https://api.pushshift.io/reddit/search/submission/";

//https://api.pushshift.io/reddit/search/submission/?q=trump&aggs=subreddit&frequency=hour&after=400m&size=0


//https://api.pushshift.io/reddit/search/submission/?q=trump&aggs=subreddit&frequency=hour&after=400m&size=0


/**
 * Calls the endpoint to get sentiment information by subreddit on submissions.
 * @param subreddit the subreddit.
 * @param searchTerm the searchTerm
 * @returns {string}
 */
export function getSentimentFromSearchTermSubreddit(subreddit, searchTerm) {
    let res = '';
    const endpoint =
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
 * Calls endpoint to get all subreddits in which the search term appears.
 * @param searchTerm
 * @param frequency
 * @param timeFrame
 * @returns {string}
 */
export async function getSubRedditsForSearchTerm(searchTerm, frequency, timeFrame) {
    return axios.get("https://api.pushshift.io/reddit/search/submission/", {
        params: {'q': searchTerm,
                 'frequency': frequency,
                 'after': timeFrame,
                 'size': 0,
                 'aggs': 'subreddit'}
    }).catch(error => {
            console.log(error)
        });
    // let res = '';
    // callAggsEndpoint(searchTerm, frequency, timeFrame).then(response => {
    //     console.log(response);
    // });
}

let callAggsEndpoint = async function(searchTerm, frequency, timeFrame) {
    return axios.get("https://api.pushshift.io/reddit/search/submission/", {
        params: {'q': searchTerm,
            'frequency': frequency,
            'after': timeFrame,
            'size': 0,
            'aggs': 'subreddit'}
    })
        .then(response => {
            return response.data.aggs.subreddit;
        })
        .catch(error => {
            console.log(error)
        });
};

/**
 * Calls the endpoint to get sentiment information by subreddit on submissions.
 * @param subreddit
 * @param searchTerm
 * @returns {[]}
 */
export function getSentimentFromSearchTermSubredditComments(subreddit, searchTerm) {
    let res = '';
    axios.get(local_path + reddit_get_context_path + "comments/" + subreddit, {
        params: {'searchTerm': searchTerm},
        headers: {"Access-Control-Allow-Origin": "*"}
    })
        .then(response => {return response.data})
        .catch(error => {
            console.log(error)
        });
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