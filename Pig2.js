class Pig2 extends BaseClass {
  constructor(x, y) {
    super(x, y, 50, 50);
    this.image = loadImage('sprites/KingPig.png');
    this.image2 = loadImage('sprites/pgiout.png');
    this.visiblity = 255;
  }

  display() {
    if (this.body.speed < 4) {
      super.display();
    } else {
      World.remove(world, this.body);
      push();
      this.visiblity = this.visiblity - 2;
      tint(255, this.visiblity);
      image(this.image2, this.body.position.x, this.body.position.y, 50, 50);
      pop();
    }
  }

  Score() {
    if (this.visiblity < 0 && this.visiblity > -100) {
      score = score + 1;
    }
  }
}
