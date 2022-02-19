const App = {
  currentImage: 0,
  totalImages: 0,
  images: [],

  async init() {
    const images = await App.getImages();
    App.images = images;
    App.totalImages = images.length;

    images.forEach((image, index) => {
      App.createImage(image, index);
    });
    App.addEventsButtons();
  },

  async getImages() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos').then((res) => res.json());
      const images = response.slice(0, 10);

      return images;
    } catch (error) {
      console.log({ error: { message: 'Erro ao buscar imagens', error } });
    }
  },

  createImage(image, index) {
    const imageElement = document.createElement('img');

    imageElement.id = index;
    imageElement.src = image.url;
    imageElement.alt = image.title;

    App.appendElementDom(imageElement, 'images');
    App.createDots(index);
  },

  createDots(index, indexDotUpdate) {
    const dot = document.createElement('li');

    dot.id = index;

    if (index === 0 && !indexDotUpdate) {
      dot.classList.add('active');
    }

    if (indexDotUpdate && indexDotUpdate === index) {
      dot.classList.add('active');
    }

    App.appendElementDom(dot, 'dots');
  },

  updateDots(indexDotUpdate) {
    const currentDot = document.querySelector('.active');
    currentDot.classList.remove('active');

    const dots = document.getElementById('dots');
    dots.innerHTML = '';

    App.images.forEach((image, index) => {
      App.createDots(index, indexDotUpdate);
    });
  },

  appendElementDom(element, parent) {
    const imagesContainer = document.getElementById(parent);
    imagesContainer.appendChild(element);
  },

  addEventsButtons() {
    const buttonNext = document.getElementById('next');
    const buttonPrev = document.getElementById('prev');

    buttonNext.addEventListener('click', App.nextImage);
    buttonPrev.addEventListener('click', App.prevImage);
  },

  nextImage() {
    const nextImage = document.getElementById(App.currentImage + 1);

    if (nextImage) {
      nextImage.scrollIntoView();

      App.updateDots(App.currentImage + 1);
      App.currentImage++;
    } else {
      const imageInit = document.getElementById(0);
      imageInit.scrollIntoView();

      App.updateDots(0);
      App.currentImage = 0;
    }
  },

  prevImage() {
    const prevImage = document.getElementById(App.currentImage - 1);

    if (prevImage) {
      prevImage.scrollIntoView();
      App.updateDots(App.currentImage - 1);

      App.currentImage--;
    } else {
      const lastImage = document.getElementById(App.totalImages - 1);
      lastImage.scrollIntoView();

      App.updateDots(App.totalImages - 1);
      App.currentImage = App.totalImages - 1;
    }
  },
};

App.init();
