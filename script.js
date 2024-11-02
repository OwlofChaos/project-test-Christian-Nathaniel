var didScroll
var lastScrollTop = 0
var delta = 5
var navbarHeight = $("header").outerHeight()

$(window).scroll(function (event) {
  didScroll = true
})

setInterval(function () {
  if (didScroll) {
    hasScrolled()
    didScroll = false
  }
}, 250)

function hasScrolled() {
  var st = $(this).scrollTop()

  if (Math.abs(lastScrollTop - st) <= delta) return

  if (st > lastScrollTop && st > navbarHeight) {
    $("header").removeClass("nav-down").addClass("nav-up")
  } else {
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("nav-up").addClass("nav-down")
    }
  }

  lastScrollTop = st
}

const post = {
    id: 1,
    title: "Jangan Asal Pilih Influencer, Kenali Tingkatan Influencers Berdasarkan Jumlah Followers",
    date: "2023-11-18",
    thumbnail: "app-idea-card.png",
    status: "draft",
    followers: "100K-500K",
    content: "Pelajari cara memilih influencer yang tepat untuk kampanye pemasaran Anda..."
};
  
  const sortBySelect = document.getElementById('sort-by');
  const itemsPerPageSelect = document.getElementById('items-per-page');
  const postList = document.querySelector('.post-list-items');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  
  let currentPage = 1;
  let itemsPerPage = 10;
  let sortedPosts = [...posts];
  
  function sortPosts(sortBy) {
    if (sortBy === 'latest') {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }
  
  function paginatePosts(currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPosts.slice(startIndex, endIndex);
  }
  
  function renderPosts(posts) {
    postList.innerHTML = '';
    posts.forEach(post => {
      const postItem = document.createElement('li');
      postItem.classList.add('post-list-item');
      postItem.innerHTML = `
        <img src="${post.thumbnail}" alt="${post.title}" loading="lazy">
        <div class="title">${post.title}</div>
        <div class="status">${post.status}</div>
      `;
      postList.appendChild(postItem);
    });
  }
  
  sortPosts(sortBySelect.value);
  renderPosts(paginatePosts(currentPage, itemsPerPage));

  sortBySelect.addEventListener('change', () => {
    sortPosts(sortBySelect.value);
    renderPosts(paginatePosts(currentPage, currentItemsPerPage));
  });
  
  itemsPerPageSelect.addEventListener('change', () => {
    currentItemsPerPage = parseInt(itemsPerPageSelect.value);
    renderPosts(paginatePosts(currentPage, currentItemsPerPage));
  });
  
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts(paginatePosts(currentPage, currentItemsPerPage));
    }
  });
  
  nextPageBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(sortedPosts.length / currentItemsPerPage)) {
      currentPage++;
      renderPosts(paginatePosts(currentPage, currentItemsPerPage));
    }
  });

axios.get('http://127.0.0.1:5500/#ideas/https://suitmedia-backend.suitdev.com/api/ideas', {
    params: {
        'page[number]': 1,
        'page[size]': 10,
        'append': ['small_image', 'medium_image'],
        'sort': 'published_at'
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});