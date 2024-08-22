// Replace 'YOUR_API_KEY' with your actual NewsAPI key
const apiKey = 'ee1097ca01fc4e31a88a3bbd7ab106e3';
const articlesContainer = document.getElementById('newsResults');
const headlinesList = document.getElementById('headlines-list');

function displayArticles(data) {
  articlesContainer.innerHTML = '';

  if (data.articles && data.articles.length > 0) {
    data.articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');

      // Check if the article has an image
      if (article.urlToImage) {
        // If an image is available, create an <img> element
        const imageElement = document.createElement('img');
        imageElement.src = article.urlToImage;
        imageElement.alt = article.title;
        imageElement.classList.add('article-image'); // Add a class for styling if needed

        // Append the image to the article element
        articleElement.appendChild(imageElement);
      }

      // Create elements for title, description, and read more link
      const titleElement = document.createElement('h2');
      titleElement.textContent = article.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = article.description;

      const readMoreLink = document.createElement('a');
      readMoreLink.href = article.url;
      readMoreLink.textContent = 'Read more';
      readMoreLink.target = '_blank';

      // Append all elements to the article element
      articleElement.appendChild(titleElement);
      articleElement.appendChild(descriptionElement);
      articleElement.appendChild(readMoreLink);

      // Append the article element to the news results container
      articlesContainer.appendChild(articleElement);
    });
  } else {
    articlesContainer.innerHTML = '<p>No news found for this city.</p>';
  }
}

function fetchTopHeadlines() {
  fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayArticles(data);

      // Loop through the top headlines and make them clickable
      data.articles.forEach(article => {
        const link = document.createElement('div');
        link.classList.add('headline-link');
        link.textContent = article.title;
        link.onclick = function() {
          window.open(article.url, '_blank');
        };
        headlinesList.appendChild(link);
      });
    })
    .catch(error => {
      console.error('Error fetching top headlines:', error);
    });
}

document.getElementById('cityForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const city = document.getElementById('cityInput').value;

  fetch(`https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayArticles(data);
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      articlesContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
    });
});

// Call the function to fetch and display top headlines on page load
fetchTopHeadlines();
fetchTopHeadlines();
