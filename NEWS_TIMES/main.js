let news = [];
let menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");

// 최근 뉴스 가져오기
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "i7tqjNo6r1w-hCVJkDZ_koWrsUdMTyTSOgGxjy9B5h4",
  });

  let response = await fetch(url, { headers: header }); // ajax 이용방법, http이용방법, fetch 이용방법
  let data = await response.json(); // 위에 데이터를 부르는 것이 끝나고 json을 불러야함
  news = data.articles;
  render();
};

// 선택한 토픽별로 뉴스 가져오기
const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );

  let header = new Headers({
    "x-api-key": "i7tqjNo6r1w-hCVJkDZ_koWrsUdMTyTSOgGxjy9B5h4",
  });

  let response = await fetch(url, { headers: header }); // ajax 이용방법, http이용방법, fetch 이용방법
  let data = await response.json(); // 위에 데이터를 부르는 것이 끝나고 json을 불러야함
  news = data.articles;
  render();
};

// 검색한 키워드 별로 뉴스 가져오기
const getNewsByKeyword = async () => {
  // 1. 검색 키워드 읽어오기
  // 2. url에 검색 키워드 붙이기
  // 3. 헤더준비
  // 4. url 부르기
  // 5. data 가져오기
  // 6. data 보여주기

  let keyword = document.getElementById("search-input").value;
  let url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "i7tqjNo6r1w-hCVJkDZ_koWrsUdMTyTSOgGxjy9B5h4",
  });

  let response = await fetch(url, { headers: header }); // ajax 이용방법, http이용방법, fetch 이용방법
  let data = await response.json(); // 위에 데이터를 부르는 것이 끝나고 json을 불러야함
  news = data.articles;
  render();
};

const render = () => {
  let newsHTML = "";

  newsHTML = news
    .map((item) => {
      return `
      <div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${item.media}" alt="">
          </div>
          <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <div>${item.rights} * ${item.published_date}</div></div>
        </div>
      `;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
