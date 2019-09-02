/**
 * Endpoint calls wrapped in pretty little functions
 *
 */

import axios from 'axios';

const local_path = "http://localhost:8080";

const reddit_get_context_path = "/reddit/get/";

const pushshiftSubmissionsContextPath = "https://api.pushshift.io/reddit/search/submission/";


/**
 * Gets the sentiment data for the search term in the given subreddit within comments or submissions
 * @param subreddit
 * @param searchTerm
 * @param searchType
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getSentimentFromSearchTermSubreddit(subreddit, searchTerm, searchType) {
    const endpoint = local_path + reddit_get_context_path + searchType + "/";
    return axios.get(endpoint + subreddit, {
        params: {'searchTerm': searchTerm},
        headers: {"Access-Control-Allow-Origin": "*"}
    }).catch(error => {
            console.log(error)
        });
}

/**
 * Calls out to pushshift endpoint to get subreddits that contain this term in order of
 * frequency of mentions.
 * @param searchTerm
 * @param frequency
 * @param timeFrame
 * @returns {Promise<AxiosResponse<T>>}
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
}

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