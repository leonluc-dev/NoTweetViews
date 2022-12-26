const tweetViewsSelector = "div.css-1dbjc4n.r-1mf7evn, div.css-1dbjc4n.r-18u37iz.r-1h0z5md";

let observer = new MutationObserver(mutations => {
    const analyticElements = $("a[href*='/analytics']");

	if(analyticElements) {
		const viewElements = analyticElements.closest(tweetViewsSelector);
		if(viewElements)
			viewElements.remove();
	}
});
observer.observe(document, { childList: true, subtree: true });