let news = [];

const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`
  );
  let header = new Headers({
    "x-api-key": "i7tqjNo6r1w-hCVJkDZ_koWrsUdMTyTSOgGxjy9B5h4",
  });

  let response = await fetch(url, { headers: header }); // ajax 이용방법, http이용방법, fetch 이용방법
  let data = await response.json(); // 위에 데이터를 부르는 것이 끝나고 json을 불러야함
  news = data.articles;
  console.log(response);
  console.log(news);
  console.log(url);

  render();
};

const render = () => {
  let newsHTML = "";

  newsHTML = news
    .map((news) => {
      return `
      <div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="https://img8.yna.co.kr/etc/inner/KR/2021/12/22/AKR20211222124400005_01_i_P4.jpg" alt="">
          </div>
          <div class="col-lg-8"><h2>bts 짱</h2><p>코딩 알려주는 누나 bts 광팬임 ㅡㅡ</p><div>출처 : kbs</div>
        </div>
      `;
    })
    .join("");

  console.log(newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
