let particles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    particles.push(new WaterParticle(random(width), random(height)));
  }
}

function draw() {
  background(255);

  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class WaterParticle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = random(5, 15);
  }

  update() {
    // Apply gravity
    this.acceleration.add(createVector(0, 0.1));

    // Update velocity
    this.velocity.add(this.acceleration);

    // Update position
    this.position.add(this.velocity);

    // Reset acceleration
    this.acceleration.mult(0);

    // Bounce off edges
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -0.5;
    }
  }

  display() {
    fill(0, 0, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
