const viewCounterSingleSelector = "div.css-1dbjc4n.r-2sztyj.r-1efd50x.r-5kkj8d.r-13awgt0.r-18u37iz.r-tzz3ar.r-s1qlax.r-1yzf0co > div.css-1dbjc4n"; //View counter for: Single tweet without replies
const viewCounterThreadSelector = "div.css-1dbjc4n.r-1mf7evn"; //View counter for: Single tweet in thread
const viewCounterListSelector = "div.css-1dbjc4n.r-18u37iz.r-1h0z5md" //View counter for: Tweet in list/timeline

const tweetViewsSelectors = [
    viewCounterSingleSelector,
    viewCounterThreadSelector,
    viewCounterListSelector
];

let observer = new MutationObserver(mutations => {
    const allAddedNodes = mutations.flatMap(x=> Array.from(x.addedNodes ?? []));
    //Find all view analytic links
    const analyticElements = $(allAddedNodes).find("a[href*='/analytics']");

    if(analyticElements) {
        //Find the closest parent views matching the viewcount selectors
        const tweetViewElements = analyticElements.closest(tweetViewsSelectors.join(", "));
        if(tweetViewElements) {
            //Remove all viewcount elements in the list
            tweetViewElements.remove();
        }
    }
});
observer.observe(document, { childList: true, subtree: true });