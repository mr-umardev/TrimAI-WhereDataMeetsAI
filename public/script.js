// JavaScript to handle the navbar toggle for mobile view
const mobileMenu = document.getElementById('mobile-menu');
const navbarMenu = document.querySelector('.navbar-menu');

mobileMenu.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Function to handle text summarization
document.getElementById('submit-button').addEventListener('click', () => {
    const textToSummarize = document.getElementById('text_to_summarize').value.trim();

    // Simple validation for minimum character length
    if (textToSummarize.length < 200) {
        alert('Please enter at least 200 characters.');
        return;
    }

    // Clear previous summary
    document.getElementById('summary').value = 'Processing...';

    // Simulate the summarization process
    summarizeText(textToSummarize)
        .then(summary => {
            document.getElementById('summary').value = summary;
        })
        .catch(error => {
            console.error('Error summarizing text:', error);
            alert('An error occurred while summarizing the text. Please try again later.');
        });
});

// Function to summarize text dynamically
function summarizeText(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const sentences = text.split('. ').filter(sentence => sentence.trim().length > 0);
            const keywords = extractKeywords(text);
            const sentenceScores = [];

            // Rank sentences based on keyword occurrences
            sentences.forEach(sentence => {
                let score = 0;
                keywords.forEach(keyword => {
                    if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
                        score++;
                    }
                });
                // Push sentences with scores to an array
                sentenceScores.push({ sentence, score });
            });

            // Sort sentences by score in descending order
            sentenceScores.sort((a, b) => b.score - a.score);

            // Create summary by taking the top scored sentences
            const summaryLength = Math.min(5, sentenceScores.length); // Adjust number of sentences in summary
            const summary = sentenceScores.slice(0, summaryLength).map(item => item.sentence).join('. ') + (sentenceScores.length > summaryLength ? '...' : '');
            resolve(summary);
        }, 1000); // Simulating a delay for the summarization process
    });
}

// Function to extract keywords from the text
function extractKeywords(text) {
    const words = text.match(/\w+/g); // Match words
    const wordCounts = {};

    // Count frequency of each word
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (lowerWord.length > 3) { // Exclude very short words
            wordCounts[lowerWord] = (wordCounts[lowerWord] || 0) + 1;
        }
    });

    // Sort words by frequency and take the top 10 as keywords
    const sortedKeywords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]);
    return sortedKeywords.slice(0, 10); // Return top 10 keywords
}
