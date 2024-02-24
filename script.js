const postContainer = document.querySelector('.post-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// Show Posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach(({ id, title, body }) => {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = ` <div class="number">${id}</div>
        <div class="post-info">
          <h2 class="post-title">${title}</h2>
          <p class="post-body">
            ${body}
          </p>
        </div>`;
    postContainer.appendChild(post);
  });
}

//show loader and fetch posts
const showLoading = () => {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 1000);
  }, 2000);
};

// Filter posts by input
const filterPost = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// Initial Fetching
showPosts();

//Event Listener on Posts
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
});

filter.addEventListener('input', filterPost);
