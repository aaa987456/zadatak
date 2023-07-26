
class Slider {
    constructor({ slider, images, prev, next }) {
      this.slider = slider;
      this.images = images;
      this.prev = prev;
      this.next = next;

      this.currentPosition = 0;
      this.width = this.widthImages();

      this.addClassAndAtts();
      this.cloneImages();

      
      this.slider.find("img:last-child").addClass("active");

      
      this.prev.on('click', this.leftclick.bind(this));
      this.next.on('click', this.rightclick.bind(this));
    }


    widthImages() {
      let width = 0;
      this.images.each(function(){
        width += $(this).width();
      });
      return width;
    }

    
    addClassAndAtts() {
      this.images.each(function(index){
        $(this).addClass("img-${index + 1}");
        $(this).attr("data-index", index + 1);
      });
    }

    
    cloneImages() {
      if (this.slider.find('img:first-child').offset().left > 0) {
        if (this.slider.find('img:first-child').offset().left > this.width) {
          let times = Math.ceil(this.slider.find('img:first-child').offset().left / this.width);
          for (let i = 0; i < times; i++) {
            this.slider.prependd(this.images.clone());
          }
        } 
        else {
          this.slider.prepend(this.images.clone());
        }
      }
    }

    
  

    leftclick() {
      const activeImg = this.slider.find('img.active');
      activeImg.removeClass('active');
      activeImg.prev().addClass('active');
      let img = this.slider.find('img:last-child');
      this.currentPosition = activeImg.width() ;
      this.slider.animate(
        { left: this.currentPosition },
        () => {
          
          this.slider.css('left', -100);
          this.slider.prepend(img);
        }
      );
    }
    rightclick() {
      const activeImg = this.slider.find('img.active');
      activeImg.removeClass('active');
      activeImg.next().addClass('active');
      
      let img = this.slider.find('img').eq(0);
      this.currentPosition = - activeImg.next().width() ;
    
      
      this.slider.animate({right: -this.currentPosition }, () => {
        this.slider.append(img); 
        
      });
    }
    }
  
    $(document).ready(function() {
    
      const slider1 = new Slider({
          slider: $(".slider1"),
          images: $(".slider1 .images"),
          prev: $(".left"),
          next: $(".right"),
        });
    
        const slider2 = new Slider({
          slider: $(".slider2"),
          images: $(".slider2 .images"),
          prev: $(".left"),
          next: $(".right"),
        });
      });
    