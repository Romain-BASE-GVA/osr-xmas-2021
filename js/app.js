// PARALLAX TREE

// gsap.to('.scroll-to', {
//   autoAlpha: 0,
//   scrollTrigger: {
//     markers: true,
//     trigger: '.header',
//     scrub: true,
//     start: '10px top',
//     end: '50px'
//   },
// });

$(window).on('scroll', function(){

  var y = window.scrollY / 300;

  gsap.to('.scroll-to', {autoAlpha: 1 - y});

});

const tl = gsap.timeline({
	scrollTrigger: {
		trigger: '#app',
		start: 'top top',
		end: 'bottom -50%',
		scrub: true
	}
});

gsap.utils.toArray('.tree-bg').forEach(layer => {
	const depth = layer.dataset.depth;
	const movement = -(layer.offsetHeight * depth)
	tl.to(layer, {y: movement, ease: 'none'}, 0)
});

// Tweakable parameters
// const SNOWFLAKES_PER_LAYER_BG = 160;
// const SNOWFLAKES_PER_LAYER_FG = 60;
const SNOWFLAKES_PER_LAYER_BG = window.innerWidth / 12;
const SNOWFLAKES_PER_LAYER_FG = SNOWFLAKES_PER_LAYER_BG / 160 * 60;
const MAX_SIZE_BG = 10;
const MAX_SIZE_FG = 15;
const GRAVITY_BG = 0.25;
const GRAVITY_FG = 0.75;
// const GRAVITY = 1.5;
const LAYER_COUNT = 3;

const WIND_SPEED = 1;
const WIND_CHANGE = 0.0025;

// const SNOWFLAKES = [];
const SNOWFLAKES_BG = [];
const SNOWFLAKES_FG = [];

var backSnow = function(p) {

    p.setup = function(){
    //   p.createCanvas(100, 100);
    //   p.background(0);

      p.createCanvas(window.innerWidth, window.innerHeight);
      p.noStroke();
    
      // Initialize the snowflakes with random positions
      for (let l = 0; l < LAYER_COUNT; l++) {
        SNOWFLAKES_BG.push([]);
        for (let i = 0; i < SNOWFLAKES_PER_LAYER_BG; i++) {
          SNOWFLAKES_BG[l].push({
            x: p.random(p.width),
            y: p.random(p.height),
            mass: p.random(0.75, 1.25),
            opacity: p.random(.3, .7),
            l: l + 1
          });
        }
      }
    };

    p.draw = function(){
        p.background('black');

        // Iterate through each snowflake to draw and update them
        for (let l = 0; l < SNOWFLAKES_BG.length; l++) {
          const LAYER = SNOWFLAKES_BG[l];
      
          for (let i = 0; i < LAYER.length; i++) {
            const snowflake = LAYER[i];

            p.fill('rgba(255,255,255,'+ snowflake.opacity +')')
            //p.drawingContext.filter = 'blur(1px)'
            p.circle(snowflake.x, snowflake.y, (snowflake.l * MAX_SIZE_BG) / LAYER_COUNT);
            
            updateSnowflake(snowflake);

          }
        }
    };

    function updateSnowflake(snowflake) {
        const diameter = (snowflake.l * MAX_SIZE_BG) / LAYER_COUNT;
        if (snowflake.y > p.height + diameter) snowflake.y = -diameter;
        else snowflake.y += GRAVITY_BG * snowflake.l * snowflake.mass;
      
        // Get the wind speed at the given layer and area of the page
        const wind =
          p.noise(snowflake.l, snowflake.y * WIND_CHANGE, p.frameCount * WIND_CHANGE) -
          0.5;
        if (snowflake.x > p.width + diameter) snowflake.x = -diameter;
        else if (snowflake.x < -diameter) snowflake.x = p.width + diameter;
        else snowflake.x += wind * WIND_SPEED * snowflake.l;
    };

    p.windowResized = function(){
      p.resizeCanvas(p.windowWidth, p.windowHeight, true);
    }
};

var frontSnow = function(p) {

    p.setup = function(){
    //   p.createCanvas(100, 100);
    //   p.background(0);

        p.createCanvas(window.innerWidth, window.innerHeight);
        p.noStroke();
    
      // Initialize the snowflakes with random positions
      for (let l = 0; l < LAYER_COUNT; l++) {
        SNOWFLAKES_FG.push([]);
        for (let i = 0; i < SNOWFLAKES_PER_LAYER_FG; i++) {
          SNOWFLAKES_FG[l].push({
            x: p.random(p.width),
            y: p.random(p.height),
            mass: p.random(0.75, 1.25),
            opacity: p.random(.75, 1),
            l: l + 1
          });
        }
      }
    };

    p.draw = function(){
        //p.background('black');
        p.background('black');

        // Iterate through each snowflake to draw and update them
        for (let l = 0; l < SNOWFLAKES_FG.length; l++) {
          const LAYER = SNOWFLAKES_FG[l];
      
          for (let i = 0; i < LAYER.length; i++) {
            const snowflake = LAYER[i];
            p.fill('rgba(255,255,255,'+ snowflake.opacity +')')
            p.circle(snowflake.x, snowflake.y, (snowflake.l * MAX_SIZE_FG) / LAYER_COUNT);
            updateSnowflake(snowflake);
          }
        }
    };

    // p.windowResized = function(){
    //     p.resizeCanvas(p.windowWidth, p.windowHeight);
    // };

    function updateSnowflake(snowflake) {
        const diameter = (snowflake.l * MAX_SIZE_FG) / LAYER_COUNT;
        if (snowflake.y > p.height + diameter) snowflake.y = -diameter;
        else snowflake.y += GRAVITY_FG * snowflake.l * snowflake.mass;
      
        // Get the wind speed at the given layer and area of the page
        const wind =
          p.noise(snowflake.l, snowflake.y * WIND_CHANGE, p.frameCount * WIND_CHANGE) -
          0.5;
        if (snowflake.x > p.width + diameter) snowflake.x = -diameter;
        else if (snowflake.x < -diameter) snowflake.x = p.width + diameter;
        else snowflake.x += wind * WIND_SPEED * snowflake.l;
    };

    p.windowResized = function(){
      p.resizeCanvas(p.windowWidth, p.windowHeight, true);
    }
};

new p5(backSnow, 'back-canvas');
new p5(frontSnow, 'front-canvas');

//GSAP SNOW GROWING

// var snowShapeAnim = gsap.timeline({paused: true});
// var snowUpAnim = gsap.timeline({paused: true});
// var shape1 = 'M0,47c163-30,319.67,36,499-3,294-64,519-1,867,4.63V87H0Z';
// var shape2 = 'M0,47c163-30,316.66-23.87,499-3,297,34,519-1,867,4.63V87H0Z';

// snowShapeAnim   .to('.snow-path', {attr: { d: shape2 }, duration: 200});

// snowUpAnim.to('.bottom-snow', {yPercent: -100, duration: 200});

// snowShapeAnim.play();
// snowUpAnim.play();







// VUE APP

var dataUrl = $('body').data('data-url');

const XmasItem = {
    props: ['index', 'date', 'title', 'details', 'video'],

    // template: `<li :class="[this.isPastClass, 'x-mas-item']">
    //                           <a href="#" @click.prevent="passThisItem([index])" v-if="isPast">{{ index + 1 }}</a>
    //                           <span v-else>{{ index + 1 }}</span>
    //                       </li>`,
    template:   `<li :class="[this.isPastClass, 'xmas-list__item']" :data-color="this.textColor" :data-bg-color="this.bgColor">
                    <div class="xmas-list__card">
                        <div class="xmas-list__side xmas-list__side--recto">{{ index + 1 }}</div>
                        <div class="xmas-list__side xmas-list__side--verso">{{ index + 1 }}</div>
                    </div>
                </li>`,
    computed: {
        isPast: function(){
            return moment() > moment(this.date).add(8, 'hours');
        },
        isPastClass: function(){
            return moment() > moment(this.date).add(8, 'hours') ? 'xmas-list__item--is-ready' : 'xmas-list__item--is-not-ready';
        },
        bgColor: function(){
            return this.$parent.eventColors[this.index].bgColor
        },
        textColor: function(){
            return this.$parent.eventColors[this.index].textColor
        }
    },
    methods: {
        passDataToPopup([title, details, video]){
            this.$parent.showPopup([title, details, video]);
        },
        passThisItem(index){
            //console.log(index)
            this.$parent.showPopup(index);
            this.$parent.currentBgColor = this.$parent.eventColors[this.index].bgColor;
            this.$parent.currentTextColor = this.$parent.eventColors[this.index].textColor;

        }
    },
    // mounted(){
    //     console.log(this.$parent.eventColors[this.index].bgColor)
    // }

};
  
const App = {
    //el: '#app',
    // data: {
    // dataUrl: 'https://osr-christmas-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    //   events: [],
    // eventsLoaded: false,
    // singleEventIsShowing: false,
    // activeEventID: 0,
    // },
      data() {
        return {
            // dataUrl: 'https://osr-christmas-default-rtdb.europe-west1.firebasedatabase.app/events.json',
            dataUrl: dataUrl,
            events: [],
            eventColors: [
                {'bgColor': 'yellow', 'textColor': 'purple'},
                {'bgColor': 'green', 'textColor': 'pink'},
                {'bgColor': 'light-blue', 'textColor': 'black'},
                {'bgColor': 'dark-blue', 'textColor': 'yellow'},
                {'bgColor': 'purple', 'textColor': 'yellow'},
                {'bgColor': 'green', 'textColor': 'pink'},
                {'bgColor': 'pink', 'textColor': 'green'},
                {'bgColor': 'light-blue', 'textColor': 'black'},
                {'bgColor': 'yellow', 'textColor': 'purple'},
                {'bgColor': 'green', 'textColor': 'pink'},
                {'bgColor': 'pink', 'textColor': 'green'},
                {'bgColor': 'purple', 'textColor': 'yellow'},
                {'bgColor': 'green', 'textColor': 'pink'},
                {'bgColor': 'light-blue', 'textColor': 'black'},
                {'bgColor': 'dark-blue', 'textColor': 'yellow'},
                {'bgColor': 'purple', 'textColor': 'yellow'},
                {'bgColor': 'pink', 'textColor': 'green'},
                {'bgColor': 'yellow', 'textColor': 'purple'},
                {'bgColor': 'green', 'textColor': 'pink'},
                {'bgColor': 'dark-blue', 'textColor': 'yellow'},
                {'bgColor': 'purple', 'textColor': 'yellow'},
                {'bgColor': 'pink', 'textColor': 'green'},
                {'bgColor': 'yellow', 'textColor': 'purple'},
                {'bgColor': 'light-blue', 'textColor': 'black'}
            ],
            eventsLoaded: false,
            singleEventIsShowing: false,
            activeEventID: 0,
            currentBgColor: 'pink',
            currentTextColor: 'purple'
        }
      },
      components: {
          XmasItem
      },
      computed: {
          activeEvent: function (){
              return this.events[this.activeEventID]
          }
      },
      methods: {
      getAndSetEvents: function () {
              console.log(this.dataUrl)
              axios.get(this.dataUrl)
                  .then(response => {
                      // this.events = response.data;
                      this.events = response.data.events;
                      console.log(response.data);
                      this.eventsLoaded = true;
                  })
                  .catch(function (error) {
                      // handle error
                      console.log(error);
                  })
                  .then(function () {
                      // always executed
                  });
      },
          showPopup: function (index){
              //console.log(index);
              this.activeEventID = index;
              this.singleEventIsShowing = true;
              //console.log(this.activeEvent)
          },
          closePopup: function(){
              this.singleEventIsShowing = false;
              //console.log('close popup')
          }
    },
    // watch: {
    //   eventsLoaded: function(val) {
    //     // console.log(val)
    //       // do something when the data changes.
    //       if (val) {
    //         setTimeout(function(){

    //           var lastTopItem = $('body').find('.xmas-list__item--is-ready').last().offset().top;

    //           console.log(lastTopItem);

    //           $('HTML, BODY').animate({
    //             scrollTop: lastTopItem - 20
    //           }, 1000);

    //         }, 500);


    //       }
    //   }
    // },
    mounted: function () {
      this.getAndSetEvents();
    }
};
  
Vue.createApp(App).mount('#app');

