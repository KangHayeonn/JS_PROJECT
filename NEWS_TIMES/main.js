let news = [];
let page = 1;
let totalPages = 0;
let menus = document.querySelectorAll(".menus button");

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");
let url; // 전역변수

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "i7tqjNo6r1w-hCVJkDZ_koWrsUdMTyTSOgGxjy9B5h4",
    });

    url.searchParams.set("page", page); // &page=${page}

    let response = await fetch(url, { headers: header }); // ajax 이용방법, http이용방법, fetch 이용방법
    let data = await response.json(); // 위에 데이터를 부르는 것이 끝나고 json을 불러야함

    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles;
      totalPages = data.total_pages;
      page = data.page;
      render();
      pagination();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
    console.log("잡힌 에러는", error.message);
  }
};

// 최근 뉴스 가져오기
const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );
  getNews();
};

// 선택한 토픽별로 뉴스 가져오기
const getNewsByTopic = async (event) => {
  page = 1;
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
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
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

const render = () => {
  let newsHTML = "";

  newsHTML = news
    .map((item) => {
      return `
      <div class="row news">
          <div class="col-lg-4 img-location">
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

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagination = () => {
  // total_page수
  // 내가 보려는 page
  // 내가 어떤 그룹에 있는지 page group
  let pageGroup = Math.ceil(page / 5);
  // last
  let last = pageGroup * 5;
  last = last > totalPages ? totalPages : last;
  // first
  let first = last > 4 ? last - 4 : 1;
  // first~last 페이지 프린트

  let paginationHTML =
    pageGroup != 1
      ? `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onClick="moveToPage(${1})">
    <span aria-hidden="true">&lt&lt;</span>
  </a>
  </li><li class="page-item">
<a class="page-link" href="#" aria-label="Previous" onClick="moveToPage(${
          page - 1
        })">
  <span aria-hidden="true">&lt;</span>
</a>
</li>`
      : ``;

  // 만약, total page가 3까지 밖에 없을 경우 (3개의 페이지만 프린트 하는법) -> last, first 로직 바궈야함
  // << >> 이 버튼 만들어 주기(맨처음으로 가기, 맨 끝으로 가는 버튼 만들기)
  // 내가 그룹 1일때 << < 이 버튼이 없다
  // 내가 마지막 그룹일 때 > >> 이 버튼이 없다

  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onClick="moveToPage(${i})">${i}</a></li>`;
  }

  paginationHTML +=
    pageGroup != Math.ceil(totalPages / 5)
      ? `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next" onClick="moveToPage(${
    page + 1
  })">
    <span aria-hidden="true">&gt;</span>
  </a>
</li><li class="page-item">
<a class="page-link" href="#" aria-label="Next" onClick="moveToPage(${totalPages})">
  <span aria-hidden="true">&gt&gt;</span>
</a>
</li>`
      : ``;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  // 1. 이동하고 싶은 페이지를 알아야함
  page = pageNum;
  // 2. 이동하고 싶은 페이지를 가지고 api를 다시 호출
  getNews();
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
