'use strict';

import Carousel from './Carousel/index.js';

class CarouselController {

  /**
   *
   * @param {string} url
   */
  constructor (url) {
    this._carousel = null;
    this._error = null;
    this._isFetching = false;

    this.goPrev = this.goPrev.bind(this);
    this.loadData(url);
  }

  get isFetching () {
    return this._isFetching;
  }

  set isFetching (value) {
    if (typeof value !== 'boolean') {
      throw new TypeError();
    }
    if (!value && typeof this.onload === 'function') {
      this.onload(new Event('load'));
    }
    this._isFetching = value;
  }

  get error () {
    return this._error;
  }

  set error (value) {
    if (value instanceof Error) {

      if(typeof this.onerror === 'function'){
        this.onerror(new Event('error'));
      }

      this._error = value;
    } else {
      throw new TypeError();
    }
  }

  loadData = (url) => {
    this.isFetching = true;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this._carousel = new Carousel(data);
        this.isFetching = false;
      })
      .catch(err => {
        this.isFetching = false;
        this.error = err;
      });
  };

  goNext = () => {

  };

  goPrev () {

  };

  renderButton () {

    const arrowImg = new Image();
    arrowImg.src = `${location.origin}/assets/icons/arrow.png`;
    const button = document.createElement('div');
    button.classList.add('button');
    button.appendChild(arrowImg);
    return button;
  }


  renderSlide(src, index){

  }

  renderSliderContainer () {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slidesContainer');

    if(this.isFetching){

    }else{
      this._carousel.imagesPaths.forEach( (value, index) => {
        sliderContainer.appendChild( this.renderSlide(value, index));
      })
    }


    return sliderContainer;
  }

  render () {

    const prevButton = this.renderButton();
    prevButton.setAttribute('alt', '<<');
    prevButton.onclick = this.goPrev;

    const nextButton = this.renderButton();
    nextButton.setAttribute('alt', '>>');
    nextButton.style.transform = 'rotate(180deg)';
    nextButton.style.transformOrigin = 'center';
    nextButton.onclick = this.goNext;

    const wrapper = document.createElement('div');
    wrapper.classList.add('carouselWrapper');
    wrapper.appendChild(prevButton);
    wrapper.appendChild(this.renderSliderContainer());
    wrapper.appendChild(nextButton);
    return wrapper;
  }

}


