var Galaxy = function( name_, ctx_) {
			this.ctx = ctx_;
			this.name = name_
			this.sun = new Planet(0,300 /*Diameter in KM - 1391000 is the true dia but it scales the other planets and it lacks in visaul*/,"Sun",0);
			this.planets = [];
			this.planets.push( new Planet(100,80/*Diameter in KM*/,"1:Mercury",this.orbitSpeed(88),false, this.ctx));
			this.planets.push( new Planet(150,100/*Diameter in KM*/,"2:Venus"  ,this.orbitSpeed(224.7),false,this.ctx));
			this.planets.push( new Planet(220,110/*Diameter in KM*/,"3:Earth"	,this.orbitSpeed(365.25),false,this.ctx));
			this.planets.push( new Planet(280,90/*Diameter in KM*/,"4:Mars"	,this.orbitSpeed(686.93),false,this.ctx));
			this.planets.push( new Planet(340,140/*Diameter in KM*/,"5:Jupiter",this.orbitSpeed(4330.6),false,this.ctx));
			this.planets.push( new Planet(420,140/*Dia km*/,"6:Saturn"	,this.orbitSpeed(10755.7),true,this.ctx));
			this.planets.push( new Planet(490,130 /*dia km*/,"7:Uranus"	,this.orbitSpeed(30687),false,this.ctx));
			this.planets.push( new Planet(560,120 /*dia km*/,"8:Neptune",this.orbitSpeed(60190),false,this.ctx));


			//this.planets.push( new Planet(-500,20 /*dia km*/,"",this.orbitSpeed(100),false,this.ctx));
			//this.planets.push( new Planet(-510,20 /*dia km*/,"",this.orbitSpeed(110),false,this.ctx));
			//this.planets.push( new Planet(-520,20 /*dia km*/,"",this.orbitSpeed(120),false,this.ctx));
			//this.planets.push( new Planet(-530,20 /*dia km*/,"",this.orbitSpeed(90),false,this.ctx));
			//this.planets.push( new Planet(-540,20 /*dia km*/,"",this.orbitSpeed(80),false,this.ctx));


			//this.planets.push( new Planet(-1050,300 /*dia km*/,"Deathstar",this.orbitSpeed(900),false));

			//this.planets.push( new Planet(380,10,"9:Pluto"	,this.orbitSpeed(90545.4)));
		

		};

		

		Galaxy.prototype.orbitSpeed = function ( n ){
			n = n/12
			return ( (0.2/n) )
		}
		Galaxy.prototype.render = function () {
			push()
			stroke(200);
			strokeWeight(2);
			text(this.name,10,10);
			pop();

			translate(width/2,height/2);

			this.sun.render();
			if ( this.planets != null){
				for (var i = 0 ; i<this.planets.length;i++){
					this.planets[i].render();
				}
			}
		}

		var Planet = function(distance_ , r_, name_, soo_, rings_, ctx_) {
			this.ctx = ctx_;
			this.distance = distance_;
			//this.y = y_;
			this.r = r_/4;
			//console.log(name_ + ":" + this.r);
			this.name = name_
			this.angle = 0;	
			this.speedOfOrbit = soo_;
			this.rings = rings_;
			//this.tail = [];

		};

		Planet.prototype.render = function () {
			this.update();
			this.show();
		}

		Planet.prototype.update = function() {

			this.angle += this.speedOfOrbit;
			if (this.name === "Deathstar" || this.name === ""){
				//console.log(this.name);
				//this.tail.push(createVector(this.distance,0));
				//this.distance+=1;
				//console.log(this.distance);
				//if ( this.tail.length === 100){
				//	this.tail.splice(0,1);
				//}

			}

			
		};

		Planet.prototype.dia = function () {
			return ( this.r * 2 );
		}

		Planet.prototype.gradient = function (a,b,targetC) {
			var gradX = 50;//mouseX - width / 2;
  			var gradY = 50;//mouseY - height / 2;
  			var gradient = ctx.createRadialGradient(0, 0, b, gradX, gradY, 0);
  			//console.log ( gradX);
  			//console.log ( gradY);
  			gradient.addColorStop(0, targetC);
  			gradient.addColorStop(1, "white");
  			ctx.fillStyle = gradient;
  			ellipse(0, 0, a, b);
		}

		Planet.prototype.show = function() {
			push();
				if (this.name === "Deathstar") {
					stroke(250,50,50);
				} else {
					stroke(100,100,255);
				}
				translate(this.distance, 0);
				
				strokeWeight(2);
				noFill();
				ellipse(0-this.distance, 0,this.distance*2,this.distance*2);
			pop();

			push();
				rotate(this.angle);
				translate(this.distance, 0);
				stroke(200);
				strokeWeight(2);
				fill(127, 255);

				if ( this.name === "Deathstar"){
					this.gradient(this.dia(),this.dia(),"black");
				}else if ( this.name === "Sun"){
					this.gradient(this.dia(),this.dia(),"yellow");
				} else {
					this.gradient(this.dia(),this.dia(),"blue");
				}				
				ellipse(0, 0,this.dia(),this.dia());
				
				if ( this.rings ){
					noFill();
					strokeWeight(1);
					ellipse(0, 0,this.dia()+8,this.dia()+8);
					ellipse(0, 0,this.dia()+10,this.dia()+10);
					ellipse(0, 0,this.dia()+14,this.dia()+14);
				}

				if ( this.name === "" ){
					push();
					rotate(0);
					for (var i = 0 ; i < this.tail.length ; i++){

						//console.log(this.tail[i].x + ":" + this.tail[i].y);
						translate(this.tail[i].x, 0);
						stroke(200);
						strokeWeight(2);
						point(0, 0);
					}
					pop();
				}
				text(this.name,this.r*-1, 0); //need to make the radius negitive so the label is push to the top left.
				
				
				//text(""+this.r*8000*2 + "km",-this.r,0);
				
			pop();
		};

