
let alumni = JSON.parse(localStorage.getItem("alumni")) || [];

const form = document.getElementById("alumniForm");
const table = document.querySelector("#alumniTable tbody");
const hasil = document.getElementById("hasil");
const search = document.getElementById("search");

form.addEventListener("submit",function(e){
e.preventDefault();

let data={
nama:document.getElementById("nama").value,
prodi:document.getElementById("prodi").value,
tahun:document.getElementById("tahun").value,
kota:document.getElementById("kota").value,
status:"Belum Dilacak"
};

alumni.push(data);
saveData();
renderTable();

form.reset();
});

search.addEventListener("keyup",renderTable);

function saveData(){
localStorage.setItem("alumni",JSON.stringify(alumni));
}

function renderTable(){

table.innerHTML="";
let keyword=search.value.toLowerCase();

alumni.forEach((a,index)=>{

if(!a.nama.toLowerCase().includes(keyword)) return;

let row=`
<tr>
<td>${a.nama}</td>
<td>${a.prodi}</td>
<td>${a.tahun}</td>
<td>${a.kota}</td>
<td>${a.status}</td>
<td>
<button onclick="lacak(${index})">Lacak</button>
<button onclick="hapus(${index})">Hapus</button>
</td>
</tr>
`;

table.innerHTML+=row;

});

}

function lacak(index){

let jobs=["Software Engineer","Data Scientist","Web Developer","Researcher"];
let companies=["Google","Microsoft","Startup AI","Tech Nusantara"];
let sources=["LinkedIn","GitHub","Google Scholar"];

let job=jobs[Math.floor(Math.random()*jobs.length)];
let company=companies[Math.floor(Math.random()*companies.length)];
let source=sources[Math.floor(Math.random()*sources.length)];
let confidence=Math.floor(Math.random()*30)+70;

alumni[index].status="Teridentifikasi";
saveData();
renderTable();

hasil.innerHTML=`
<h3>${alumni[index].nama}</h3>
<p>Pekerjaan: ${job}</p>
<p>Perusahaan: ${company}</p>
<p>Sumber: ${source}</p>
<p>Confidence Score: ${confidence}%</p>
`;
}

function hapus(index){
alumni.splice(index,1);
saveData();
renderTable();
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

renderTable();
