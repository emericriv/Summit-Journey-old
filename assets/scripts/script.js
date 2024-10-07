// Vrai JS
  document.querySelector('.navbar-brand').addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le comportement par défaut du lien

    // Trouve la tab Accueil et active-la
    var homeTab = new bootstrap.Tab(document.querySelector('#home-tab'));
    homeTab.show();
  });


// Laboratoire
const dropZone = document.getElementById('dropzone');
const inputFile = document.getElementById('imageUpload');

// Événements pour le drag-and-drop
dropZone.addEventListener('click', () => inputFile.click());
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});
inputFile.addEventListener('change', () => handleFiles(inputFile.files));

// Fonction de gestion des fichiers et affichage des miniatures
function handleFiles(files) {
    dropZone.innerHTML = '';  // Réinitialiser la zone de drop
    Array.from(files).forEach(file => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.width = '50px';  // Largeur fixe pour les images
        img.style.height = 'auto';   // Conserver le ratio
        img.style.margin = '5px';    // Espace entre les images
        dropZone.appendChild(img);
    });
}
