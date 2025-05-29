function toggleSchools() {
  const schoolLinks = document.getElementById('schoolLinks');
  const arrowIcon = document.getElementById('arrowIcon');

  schoolLinks.classList.toggle('open');

  arrowIcon.classList.toggle('fa-chevron-down');
  arrowIcon.classList.toggle('fa-chevron-up');
}