let allData = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 10;

// LOAD CSV
fetch('alumni2000-2025.csv')
  .then(res => res.text())
  .then(csv => {

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true
    });

    allData = parsed.data;
    filteredData = allData;

    console.log(allData[0]); // cek struktur
    displayData();
});

// TAMPIL DATA
function displayData(){
  const table = document.getElementById("dataAlumni");
  table.innerHTML = "";

  let start = (currentPage-1)*rowsPerPage;
  let end = start + rowsPerPage;

  let pageData = filteredData.slice(start,end);

  pageData.forEach(d=>{
  table.innerHTML += `
  <tr>
    <td>${d["Nama Lulusan"] || ""}</td>
    <td>${d["Email"] || d["email"] || ""}</td>
    <td>${d["No Hp"] || d["no_hp"] || ""}</td>
    <td>${d["Linkedin"] || d["linkedin"] || ""}</td>
    <td>${d["Tempat Kerja"] || d["tempat_kerja"] || ""}</td>
    <td>${d["Posisi"] || d["posisi"] || ""}</td>
    <td>${d["Status"] || d["status"] || ""}</td>
  </tr>
    `;
  });

  document.getElementById("pageInfo").innerText =
  `Page ${currentPage} / ${Math.ceil(filteredData.length/rowsPerPage)}`;
}

// PAGINATION
function nextPage(){
  if(currentPage*rowsPerPage < filteredData.length){
    currentPage++;
    displayData();
  }
}

function prevPage(){
  if(currentPage>1){
    currentPage--;
    displayData();
  }
}

// FILTER
function applyFilter(){

  let f = {
    nama: val("f_nama"),
    email: val("f_email"),
    hp: val("f_hp"),
    linkedin: val("f_linkedin"),
    ig: val("f_ig"),
    fb: val("f_fb"),
    tt: val("f_tt"),
    kerja: val("f_kerja"),
    posisi: val("f_posisi"),
    status: val("f_status")
  };

  filteredData = allData.filter(d=>{
  return (
    (!f.nama || (d["Nama Lulusan"] || "").toLowerCase().includes(f.nama)) &&
    (!f.email || (d["Email"] || d["email"] || "").toLowerCase().includes(f.email)) &&
    (!f.hp || (d["No Hp"] || d["no_hp"] || "").toLowerCase().includes(f.hp)) &&
    (!f.linkedin || (d["Linkedin"] || d["linkedin"] || "").toLowerCase().includes(f.linkedin)) &&
    (!f.kerja || (d["Tempat Kerja"] || d["tempat_kerja"] || "").toLowerCase().includes(f.kerja)) &&
    (!f.posisi || (d["Posisi"] || d["posisi"] || "").toLowerCase().includes(f.posisi)) &&
    (!f.status || (d["Status"] || d["status"] || "").toLowerCase().includes(f.status))
  );
  });

  currentPage=1;
  displayData();
}

function resetFilter(){
  document.querySelectorAll("input").forEach(i=>i.value="");
  filteredData = allData;
  currentPage=1;
  displayData();
}

function val(id){
  return document.getElementById(id).value.toLowerCase();
}

// LOGOUT
function logout(){
  localStorage.removeItem("login");
  window.location.href="login.html";
}