import { tweetsData } from './tweetsData.js'

const feedELe = document.getElementById('feed')
const tweetBtn = document.getElementById('tweet-btn')
const tweetInput = document.getElementById('tweet')

tweetBtn.addEventListener('click', function() {
    console.log(tweetInput.value)
})

document.addEventListener('click', function(e) {

    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } 
        else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
})

function handleLikeClick(tweetId) {

    const targetTweetObj = tweetsData.filter( tweet => {
        return tweet.uuid == tweetId
    })[0]

    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {

    const targetTweetObj = tweetsData.filter( tweet => {
        return tweet.uuid == tweetId
    })[0]

    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function getFeedHtml() {

    let feedHtml = tweetsData.map( tweet => {

        const likeIconClass = tweet.isLiked ? 'liked' : ''

        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''

    return `
                <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}" data-like=${tweet.uuid}></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${tweet.uuid}></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
    `
})
    return feedHtml
}


function render() {
    feedELe.innerHTML = getFeedHtml()
}

render()