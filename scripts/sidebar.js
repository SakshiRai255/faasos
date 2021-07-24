function closeSidebar() {
  let sidebar = document.getElementById('sidebar');
  sidebar.style.display = 'none';

  let sidebarMain = document.getElementById('sidebarMain');
  sidebarMain.classList.toggle('activeSideBar');
}

function openSidebar() {
  let sidebar = document.getElementById('sidebar');
  sidebar.style.display = 'block';

  setTimeout(function () {
    let sidebarMain = document.getElementById('sidebarMain');
    sidebarMain.classList.toggle('activeSideBar');
  }, 200);
}
