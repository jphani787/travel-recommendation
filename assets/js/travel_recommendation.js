const keywords = ['countries', 'country', 'temples', 'temple', 'beaches', 'beach'];
const keywordMatch = {
    'countries': 'countries',
    'country': 'countries',
    'temples': 'temples',
    'temple': 'temples',
    'beaches': 'beaches',
    'beach': 'beaches'
};
async function searchKeyword() {
    var searchKeyword = document.getElementById("search-keyword").value;
    if(!searchKeyword && searchKeyword === "") {
        console.log("Please enter a destination or keyword!");
        return;
    }
    if (keywords.includes(searchKeyword.toLowerCase())) {
        const url = "assets/data/travel_recommendation_api.json";
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const filteredData = data[keywordMatch[searchKeyword.toLowerCase()]];
            getSearchResult(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        console.log("Entered destination or keyword is invalid!");
    }
}

function clearKeyword() {
    document.getElementById("search-keyword").value = "";
    const searchResultsContent = document.getElementById("search-results-content");
    searchResultsContent.innerHTML = "";
    searchResultsContent.classList.remove('search-results-content');
}

function getSearchResult(filteredData) {
    const searchResultsContent = document.getElementById("search-results-content");
    searchResultsContent.innerHTML = "";
    searchResultsContent.classList.add('search-results-content');
    filteredData.forEach(item => {
        if(item?.cities){
            item?.cities.forEach(city => {
                searchResultsContent.innerHTML += getItem(city);
            });
        }else {
            searchResultsContent.innerHTML += getItem(item);
        }
    });
}

function getItem(item) {
    return `<div class="search-result-item glass-effect">
                <img src="assets/images/${item.imageUrl}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <button class="button book-now-button">Visit</button>
            </div>`;
}
