const customSketch = (p) => {
    let bikeX = 0;
    let wheelAngle = 0;
    let baseSpeed = 2;
  
    p.setup = function() {
      p.createCanvas(p.windowWidth, p.windowHeight);
      bikeX = 0;
      wheelAngle = 0;
    };
  
    p.draw = function() {
      p.background(240);
      drawSun();
      drawClouds();
      drawRoad();
  
      bikeX += baseSpeed;
      if (bikeX > p.width + 100) {
        bikeX = -100;
      }
  
      p.push();
      p.translate(bikeX, 300);
      drawStylizedBikeWithRider();
      p.pop();
  
      wheelAngle += 0.1;
    };
  
    function drawSun() {
      p.fill(255, 204, 0);
      p.noStroke();
      p.ellipse(p.width - 100, 80, 80, 80);
    }
  
    function drawClouds() {
      p.fill(255);
      p.noStroke();
      let cloudX = p.frameCount * 0.5 % p.width;
      p.ellipse(150 + cloudX, 100, 60, 60);
      p.ellipse(200 + cloudX, 100, 80, 80);
      p.ellipse(250 + cloudX, 100, 60, 60);
    }
  
    function drawRoad() {
      p.fill(50);
      p.rect(0, 320, p.width, 50);
    }
  
    function drawStylizedBikeWithRider() {
      p.stroke(0);
      p.strokeWeight(6);
      p.noFill();
  
      p.ellipse(0, 0, 60, 60);
      p.ellipse(100, 0, 60, 60);
  
      p.line(0, 0, 40, -30);
      p.line(40, -30, 40, -60);
      p.line(0, 0, 40, -60);
      p.line(40, -50, 90, -50);
      p.line(90, -50, 100, 0);
  
      const pedalX = 40 + 10 * p.cos(wheelAngle);
      const pedalY = -30 + 10 * p.sin(wheelAngle);
      p.line(40, -30, pedalX, pedalY);
      p.line(pedalX, pedalY, pedalX + 8 * p.sin(wheelAngle), pedalY - 8 * p.cos(wheelAngle));
  
      const pedalX2 = 40 + 10 * p.cos(wheelAngle + p.PI);
      const pedalY2 = -30 + 10 * p.sin(wheelAngle + p.PI);
      p.line(40, -30, pedalX2, pedalY2);
      p.line(pedalX2, pedalY2, pedalX2 + 8 * p.sin(wheelAngle + p.PI), pedalY2 - 8 * p.cos(wheelAngle + p.PI));
  
      p.line(90, -50, 90, -65);
      p.line(90, -65, 100, -65);
      p.line(40, -60, 30, -60);
  
      p.strokeWeight(5);
      p.fill(0);
      p.line(40, -60, 60, -80);
      p.ellipse(65, -90, 20, 20);
  
      p.fill(100);
      p.arc(65, -95, 24, 18, p.PI, p.TWO_PI);
      p.stroke(0);
      p.line(53, -90, 77, -90);
  
      p.line(60, -80, 90, -65);
      p.line(60, -80, 85, -70);
  
      const legX = 40 + 10 * p.cos(wheelAngle);
      const legY = -30 + 10 * p.sin(wheelAngle);
      p.line(40, -60, legX, legY);
  
      const legX2 = 40 + 10 * p.cos(wheelAngle + p.PI);
      const legY2 = -30 + 10 * p.sin(wheelAngle + p.PI);
      p.line(40, -60, legX2, legY2);
    }
  };
  