// Anime Database Array
const animeData = [
 {
 id: 1,
 title: "One Piece",
 category: "Anime",
 rating: "8.9",
 episodes: "1120 Episodes",
 image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/S8_YwFLCh4U"
 },
 {
 id: 2,
 title: "Demon Slayer: Kimetsu no Yaiba",
 category: "Anime",
 rating: "8.8",
 episodes: "54 Episodes",
 image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/VQGCKyvzIM4"
 },
 {
 id: 3,
 title: "Attack on Titan",
 category: "Series",
 rating: "9.0",
 episodes: "87 Episodes",
 image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/MGRm4IzK1SQ"
 },
 {
 id: 4,
 title: "Jujutsu Kaisen",
 category: "Anime",
 rating: "8.7",
 episodes: "47 Episodes",
 image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/f7T48W0BX5M"
 },
 {
 id: 5,
 title: "Spirited Away",
 category: "Movie",
 rating: "8.6",
 episodes: "Full Movie",
 image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/ByXuk9QqQkk"
 },
 {
 id: 6,
 title: "Solo Leveling",
 category: "Anime",
 rating: "8.5",
 episodes: "12 Episodes",
 image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
 videoUrl: "https://www.youtube.com/embed/916UGhS0UcA"
 }
];
// State Management
let myList = [];
// DOM Elements
const animeGrid = document.getElementById('animeGrid');
const searchInput = document.getElementById('searchInput');
const navItems = document.querySelectorAll('.nav-item');
const listCount = document.getElementById('listCount');
const playerModal = document.getElementById('playerModal');
const playerTitle = document.getElementById('playerTitle');
const videoIframe = document.getElementById('videoIframe');
// Render Anime Cards
function renderAnime(list) {
 animeGrid.innerHTML = '';
 if(list.length === 0) {
 animeGrid.innerHTML = '<p style="color:#94a3b8; grid-column: 1/-1; padding:20px;">No anime found matching your 
query.</p>';
 return;
 }
 list.forEach(anime => {
 const card = document.createElement('div');
 card.className = 'anime-card';
 card.innerHTML = `
 <div class="poster-wrap" onclick="openPlayer('${anime.title}', '${anime.episodes}', '${anime.videoUrl}')">
 <img src="${anime.image}" alt="${anime.title}" loading="lazy">
 <div class="rating-tag"><i class="fa-solid fa-star"></i> ${anime.rating}</div>
 </div>
 <div class="card-info">
 <h4 class="card-title" title="${anime.title}">${anime.title}</h4>
 <div class="card-meta">
 <span>${anime.category}</span>
 <span>${anime.episodes}</span>
 </div>
 </div>
 `;
 animeGrid.appendChild(card);
 });
}
// Live Search Filter
searchInput.addEventListener('input', (e) => {
 const query = e.target.value.toLowerCase().trim();
 const filtered = animeData.filter(anime => 
 anime.title.toLowerCase().includes(query) || 
 anime.category.toLowerCase().includes(query)
 );
 renderAnime(filtered);
});
// Category Navigation Filter
navItems.forEach(item => {
 item.addEventListener('click', (e) => {
 e.preventDefault();
 const filter = item.getAttribute('data-filter');
 if(!filter) return;
 navItems.forEach(nav => nav.classList.remove('active'));
 item.classList.add('active');
 if(filter === 'all') {
 renderAnime(animeData);
 } else if(filter === 'Trending') {
 const trending = [...animeData].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
 renderAnime(trending);
 } else {
 const filtered = animeData.filter(a => a.category.toLowerCase() === filter.toLowerCase());
 renderAnime(filtered);
 }
 });
});
// My List Bookmark Feature
function addToMyList(title) {
 if(!myList.includes(title)) {
 myList.push(title);
 listCount.innerText = myList.length;
 alert(`"${title}" added to your My List!`);
 } else {
 alert(`"${title}" is already in your My List.`);
 }
}// Open Video Player Modal
function openPlayer(title, epInfo, videoUrl) {
 playerTitle.innerText = `${title} - ${epInfo}`;
 videoIframe.src = videoUrl + "?autoplay=1";
 playerModal.classList.add('active');
}
// Close Video Player Modal
function closePlayer() {
 playerModal.classList.remove('active');
 videoIframe.src = "";
}
// Close on outside click
window.onclick = function(event) {
 if (event.target === playerModal) {
 closePlayer();
 }
};
// Initial Render
renderAnime(animeData);
