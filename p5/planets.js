var canvas;
var planets = [];
var suns = [];
var speed = 1;
var pCount = 0;
var a = 0;
var planetSizeRange = [0.1,0.4];

//Each planet has a number
//That number dictates amount of children planets
//Use to calculate spacing

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", "-1");

    //suns.push(new Sun(random(50,100)))
    planets.push(new Planet(300,0))
    pCount++;
    //suns[0].spawnPlanets(random(random(suns[0].radius*0.05,suns[0].radius*0.1)));

}

function draw() {
    background(0);
    fill(255);
    //text("Planet Count: " + pCount, 10, 20);
    translate(width/2,height/2)
    planets[0].show();

    //draw rings
    for(var i = 0; i < suns.length;i++){
        for (var j = 0; j < suns[i].planets.length; j++){
            stroke(255, 50);
            noFill();
            ellipse(0,0,suns[i].planets[j].distance*2,suns[i].planets[j].distance*2);
            noStroke();
        }
    }
    fill(233,243,255,200);
    noStroke();
    rect(-width/2,-height/2,width,height);

}

function Sun(radius){
    this.radius = radius;
    this.planets = []; 
    this.padding = random(this.radius, this.radius*1.5);   
    
    this.show = function(){
        fill(255,255,0);
        ellipse(0,0, this.radius*2,this.radius*2);
        //sphere(this.radius*2);
        for(var i = 0; i < this.planets.length; i++){
            //Show rings
            stroke(255, 50);
            noFill();
            ellipse(0,0,this.planets[i].distance*2,this.planets[i].distance*2);
            noStroke();
            //show planets
            push();
            //rotate(this.planets[i].angle);
            translate(this.planets[i].distance,0)
            this.planets[i].show();
            pop();
        }
    };

    this.spawnPlanets = function(number){
        var currentDistance = this.padding;
        for(var i = 0; i < number; i++){
            pCount++;
            this.planets[i] = new Planet(this.radius*0.5, this.radius + currentDistance);
            currentDistance += this.planets[i].radius*4 + this.planets[i].d;
        }
    };
}

function Planet(radius, distance){

    this.radius = random(radius*0.1,radius*0.5);
    this.d = random(this.radius, this.radius*4);
    this.distance = distance + this.radius + this.d;
    this.angle = random(radians(360));
    this.dir = Math.sign(random(-1,1))
    this.planets = [];
    this.r = random(0,255);
    this.g = random(0,255);
    this.b = random(0,255);
    this.c = random(125,255);
    this.padding = random(this.radius, this.radius*1.5);   

    var currentDistance = this.padding;
    for(var i = 0; i < floor(random(0,radius*0.05)); i++){
        pCount++;
        this.planets[i] = new Planet(this.radius*0.5, this.radius + currentDistance);
        currentDistance += this.planets[i].radius*4 + this.planets[i].d;;
    }

    this.show = function(){
        push();
        this.angle+= ((sqrt(distance/this.distance)/1000)*speed) * this.dir;
        fill(this.r,this.g,this.b)
        fill(this.c)
        ellipse(0,0, this.radius*2,this.radius*2);
        //sphere(this.radius*2);
        for(var i = 0; i < this.planets.length; i++){
            //Show rings
            stroke(255, 50);
            noFill();
            ellipse(0,0,this.planets[i].distance*2,this.planets[i].distance*2);
            noStroke();
            //Show planets
            push();
            rotate(this.planets[i].angle);
            translate(this.planets[i].distance,0)
            this.planets[i].show();
            pop();
        }
        pop();
    }
    
}
