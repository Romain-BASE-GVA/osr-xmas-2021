// Tweakable parameters
const SNOWFLAKES_PER_LAYER = 60;
const MAX_SIZE_BG = 10;
const MAX_SIZE_FG = 15;
const GRAVITY = 0.75;
const LAYER_COUNT = 3;

const WIND_SPEED = 1;
const WIND_CHANGE = 0.0025;

const SNOWFLAKES = [];
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
        for (let i = 0; i < SNOWFLAKES_PER_LAYER; i++) {
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
            p.circle(snowflake.x, snowflake.y, (snowflake.l * MAX_SIZE_BG) / LAYER_COUNT);
            updateSnowflake(snowflake);
          }
        }
    };

    function updateSnowflake(snowflake) {
        const diameter = (snowflake.l * MAX_SIZE_BG) / LAYER_COUNT;
        if (snowflake.y > p.height + diameter) snowflake.y = -diameter;
        else snowflake.y += GRAVITY * snowflake.l * snowflake.mass;
      
        // Get the wind speed at the given layer and area of the page
        const wind =
          p.noise(snowflake.l, snowflake.y * WIND_CHANGE, p.frameCount * WIND_CHANGE) -
          0.5;
        if (snowflake.x > p.width + diameter) snowflake.x = -diameter;
        else if (snowflake.x < -diameter) snowflake.x = p.width + diameter;
        else snowflake.x += wind * WIND_SPEED * snowflake.l;
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
        for (let i = 0; i < SNOWFLAKES_PER_LAYER; i++) {
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
        else snowflake.y += GRAVITY * snowflake.l * snowflake.mass;
      
        // Get the wind speed at the given layer and area of the page
        const wind =
          p.noise(snowflake.l, snowflake.y * WIND_CHANGE, p.frameCount * WIND_CHANGE) -
          0.5;
        if (snowflake.x > p.width + diameter) snowflake.x = -diameter;
        else if (snowflake.x < -diameter) snowflake.x = p.width + diameter;
        else snowflake.x += wind * WIND_SPEED * snowflake.l;
    }
};

new p5(backSnow, 'back-canvas');
new p5(frontSnow, 'front-canvas');


// VUE APP

const XmasItem = {
    props: ['index', 'date', 'title', 'details', 'video'],

    template: `<li :class="[this.isPastClass, 'x-mas-item']">
                              <a href="#" @click.prevent="passThisItem([index])" v-if="isPast">{{ index + 1 }}</a>
                              <span v-else>{{ index + 1 }}</span>
                          </li>`,
    computed: {
        isPast: function(){
            return moment() > moment(this.date);
        },
        isPastClass: function(){
            return moment() > moment(this.date) ? 'x-mas-item--is-ready' : 'x-mas-item--is-not-ready';
        }
    },
    methods: {
        passDataToPopup([title, details, video]){
            this.$parent.showPopup([title, details, video]);
        },
        passThisItem(index){
            //console.log(index)
            this.$parent.showPopup(index);
        }
    }
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
            dataUrl: 'https://osr-christmas-default-rtdb.europe-west1.firebasedatabase.app/events.json',
            events: [],
            eventsColor: [
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
                {'bg-color': 'green', 'text-color': 'yellow'},
            ],
            eventsLoaded: false,
            singleEventIsShowing: false,
            activeEventID: 0,
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
                      this.events = response.data;
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
    mounted: function () {
      this.getAndSetEvents();
    }
};
  
Vue.createApp(App).mount('#app')

