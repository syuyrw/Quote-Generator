const apiKey = "5jyhttcfhYQqiRuCvtVwVw==3mzIeqt70YflkdF8";
const button = document.getElementById("button");
const quoteText = document.getElementById("quote");
const quoted = document.getElementById("quoted");
const quoteArea = document.getElementById("quote-area");
const tweetButton = document.getElementById("tweet");
const linebreak = document.createElement("br");

button.addEventListener("click", async () => {
    // Clear any previous quote text
    quoteText.textContent = "";
    quoted.textContent = "";

    // Unhide quote div if it is hidden
    quoteArea.style.display = "block";

    fetch(`https://api.api-ninjas.com/v1/quotes`, {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                console.log(`"${data[0].quote}", - ${data[0].author}`);
                displayQuote(data[0].quote, data[0].author);
                tweetButton.addEventListener("click", () => tweet(data[0].quote, data[0].author));
            }
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
        });
});


// function to display quote and author
function displayQuote(quote, author) {
    quoteText.textContent = `"${quote}"`;
    quoted.textContent = `- ${author}`;
    // console.log(quote, quoted);
}

function tweet(quote, author) {
    const tweetText = `"${quote}"\n- ${author}`;
    const encodedTweetText = encodeURIComponent(tweetText);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;
    window.open(tweetUrl, '_blank');
};

const interval = setInterval(function() {
    // Clear any previous quote text
    quoteText.textContent = "";
    quoted.textContent = "";

    // Unhide quote div if it is hidden
    quoteArea.style.display = "block";

    fetch(`https://api.api-ninjas.com/v1/quotes`, {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.length > 0) {
                console.log(`"${data[0].quote}", - ${data[0].author}`);
                displayQuote(data[0].quote, data[0].author);
                tweetButton.addEventListener("click", () => tweet(data[0].quote, data[0].author));
            }
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
        });
}, 20000);