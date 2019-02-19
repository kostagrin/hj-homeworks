const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    this.uploadButton.accept = 'image/png';
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');
    this.images = [];
    this.imagesCount = 0;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.registerEvents();
  }


  registerEvents() {
    this.uploadButton.addEventListener('input', event => {
      Array.from(this.uploadButton.files).forEach(i => this.images.push(i));
      this.imagesCount = this.images.length;
      this.imagesCountContainer.textContent = this.imagesCount;

      this.canvas.width = Math.ceil(Math.sqrt(this.imagesCount)) * 100;
      this.canvas.height = Math.round(Math.sqrt(this.imagesCount)) * 100;
      let x = 0,
        y = 0;
      this.images.forEach((img, index) => {
        let i = new Image(100, 100);
        i.src = URL.createObjectURL(img);
        i.addEventListener('load', () => {
          if (x >= this.canvas.width) {
            x = 0;
            y += 100;
          }
          this.ctx.drawImage(i, x, y, 100, 100);
          x += 100;
        });
      });
    });

    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      this.imageElement.src = this.canvas.toDataURL();
      this.imageElement.alt = 'sprite.png';
      this.imageElement.title = 'sprite.png';

      let pic = `.icon {
        background-image: url('sprite.png');
        display: inline-block;
      }\n`;
      this.codeContainer.value = pic + this.images.reduce(function (prev, cur, i) {
        cur = `.icon.icon_${i} {
          width: 100px;
          height: 100px;
          background-position: 0px 0px;
        }\n`
        return prev + cur;
      }, '');

    });
  }
}

new SpriteGenerator(document.getElementById('generator'));