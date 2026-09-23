const products=[
{name:'Assinatura Premium',category:'Assinaturas',price:19.90,desc:'Acesso digital com entrega imediata.'},
{name:'Assinatura VIP',category:'Assinaturas',price:29.90,desc:'Plano premium da Koala Store.'},
{name:'Nitro / Discord',category:'Discord',price:24.90,desc:'Produto digital para Discord.'},
{name:'Discord Boost',category:'Discord',price:34.90,desc:'Boost para seu servidor.'},
{name:'Pack Gamer',category:'Jogos',price:14.90,desc:'Pacote digital para gamers.'},
{name:'Gift Card Gamer',category:'Jogos',price:25.00,desc:'Código digital entregue rapidamente.'},
{name:'Produto Especial',category:'Jogos',price:9.90,desc:'Oferta especial da Koala Store.'},
{name:'Produto VIP',category:'Assinaturas',price:39.90,desc:'Acesso exclusivo e entrega imediata.'}
];
let cart=JSON.parse(localStorage.getItem('koala-cart')||'[]');
const money=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function imageZone(key,label,cls='product-img'){return `<div class="drop-zone ${cls}" data-key="${key}" data-label="${esc(label)}"><span>ARRASTE O ARQUIVO</span></div>`}
function card(p,i){return `<article class="product">${imageZone('product-'+i,'Imagem do produto '+p.name)}<div class="product-body"><span class="badge">${esc(p.category)}</span><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><div class="price">${money(p.price)}</div><button class="btn primary" onclick="addCart(${i})">Comprar</button></div></article>`}
function render(list=products, target='products'){document.getElementById(target).innerHTML=list.map((p,i)=>card(p,products.indexOf(p))).join('');bindDropZones()}
function filterCategory(cat){const list=products.filter(p=>p.category===cat);document.getElementById('categoryTitle').textContent=cat;document.getElementById('categoryText').textContent=`Produtos da categoria ${cat}.`;document.getElementById('categoryArea').classList.remove('hidden');render(list,'categoryProducts');document.getElementById('categoryArea').scrollIntoView({behavior:'smooth',block:'start'})}
function renderSearch(){const q=document.getElementById('search').value.toLowerCase().trim();render(products.filter(p=>(p.name+' '+p.category+' '+p.desc).toLowerCase().includes(q)),'products')}
function addCart(i){cart.push(products[i]);localStorage.setItem('koala-cart',JSON.stringify(cart));updateCart();}
function updateCart(){document.getElementById('cartQty').textContent=cart.length;document.getElementById('cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${esc(p.name)}</span><b>${money(p.price)}</b></div>`).join(''):'<p style="color:#8ea4bc">Seu carrinho está vazio.</p>';document.getElementById('cartTotal').textContent=money(cart.reduce((a,p)=>a+p.price,0))}
function modal(id,open=true){document.getElementById(id).classList.toggle('open',open)}
function bindDropZones(){document.querySelectorAll('.drop-zone').forEach(z=>{if(z.dataset.bound)return;z.dataset.bound='1';z.addEventListener('click',()=>pick(z));z.addEventListener('dragover',e=>{e.preventDefault();z.classList.add('dragover')});z.addEventListener('dragleave',()=>z.classList.remove('dragover'));z.addEventListener('drop',e=>{e.preventDefault();z.classList.remove('dragover');const f=e.dataTransfer.files[0];if(f)saveImage(z,f)});loadImage(z)})}
function pick(z){const input=document.createElement('input');input.type='file';input.accept='image/*';input.onchange=()=>{if(input.files[0])saveImage(z,input.files[0])};input.click()}
function saveImage(z,file){if(!file.type.startsWith('image/'))return alert('Escolha um arquivo de imagem.');const r=new FileReader();r.onload=()=>{try{localStorage.setItem('koala-img-'+z.dataset.key,r.result);showImage(z,r.result)}catch(e){alert('A imagem é grande demais para o armazenamento local. Use uma imagem menor.')}};r.readAsDataURL(file)}
function loadImage(z){const x=localStorage.getItem('koala-img-'+z.dataset.key);if(x)showImage(z,x)}
function showImage(z,src){z.classList.add('has-image');z.querySelector('img')?.remove();const img=document.createElement('img');img.src=src;img.alt=z.dataset.label;z.prepend(img)}
document.querySelectorAll('.category-card').forEach(c=>c.addEventListener('click',()=>filterCategory(c.dataset.category)));
document.getElementById('search').addEventListener('input',renderSearch);document.getElementById('showAll').addEventListener('click',()=>{document.getElementById('categoryArea').classList.add('hidden');document.getElementById('produtos').scrollIntoView({behavior:'smooth'});});document.getElementById('loginBtn').onclick=()=>modal('loginModal');document.getElementById('cartBtn').onclick=()=>modal('cartModal');document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>modal(b.dataset.close,false));document.getElementById('checkout').onclick=()=>alert('Configure seu checkout/Pix para finalizar os pedidos.');
document.getElementById('reviewForm').addEventListener('submit',e=>{e.preventDefault();const reviews=JSON.parse(localStorage.getItem('koala-reviews')||'[]');reviews.unshift({name:document.getElementById('reviewName').value,text:document.getElementById('reviewText').value,stars:+document.getElementById('reviewStars').value});localStorage.setItem('koala-reviews',JSON.stringify(reviews));e.target.reset();renderReviews()});
function renderReviews(){const a=JSON.parse(localStorage.getItem('koala-reviews')||'[]');document.getElementById('reviews').innerHTML=a.map(r=>`<article class="review"><div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div><b>${esc(r.name)}</b><p>${esc(r.text)}</p></article>`).join('')||'<article class="review"><div class="stars">★★★★★</div><b>Seja o primeiro</b><p>Conte como foi sua experiência com a Koala Store.</p></article>'}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
function snow(){const s=document.getElementById('snow');for(let i=0;i<45;i++){const f=document.createElement('i');f.className='flake';f.style.left=Math.random()*100+'%';f.style.width=f.style.height=(2+Math.random()*3)+'px';f.style.opacity=.25+Math.random()*.45;f.style.animationDuration=(14+Math.random()*12)+'s';f.style.animationDelay=(-Math.random()*25)+'s';s.appendChild(f)}}
snow();render();renderReviews();updateCart();bindDropZones();
