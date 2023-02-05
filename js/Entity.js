class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
  }
  explode(){
    this.setScale(2)
    this.play("explosion-big");
    this.on('animationcomplete', function() {
        this.destroy();
    }, this);
  }


  die(){
    this.setScale(3)
    this.play("diver-death");
    this.on('animationcomplete', function() {
      this.destroy();
  }, this);
  }
}
class Enemy extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(700, 900);
    this.setSize(25, 28).setOffset(20, 14);
    this.setScale(3.5);
    this.flipX = false;
    this.play("monster3", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Diver extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 700;
    this.setScale(2);
    this.setSize(60, 24).setOffset(10, 26);
    this.flipX = false;
    this.play("diver", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy()
  }
}

class Enemy2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(700, 1200);
    this.setSize(200, 60).setOffset(60, 30);
    this.setScale(1);
    this.flipX = false;
    this.play("monster2", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Enemy3 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(-600, -1100);
    this.setSize(200, 60).setOffset(0, 30);
    this.setScale(1);
    this.flipX = true;
    this.play("monster2", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
  }
}

class Mine extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = -500;
    this.setScale(2.4);
    this.setSize(50, 50).setOffset(10, 8);
    this.flipX = false;
    this.setTexture('mine')
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
  }
}

class Mine1 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = -800;
    this.setScale(2.4);
    this.setSize(50, 50).setOffset(10, 8);
    this.flipX = false;
    this.setTexture('mine')
    this. rangeDown = this.y + 120
    this. rangeUp = this.y - 120
    this.speed = Phaser.Math.Between(1, 3);

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}

class Mine2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = -800;
    this.setScale(2.4);
    this.setSize(50, 50).setOffset(10, 8);
    this.flipX = false;
    this.setTexture('mine')
    this. rangeDown = this.y + 120
    this. rangeUp = this.y - 120
    this.speed = Phaser.Math.Between(1, 3);

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y -= this.speed;
  }
}

class Enemy4 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(400, 600);
    this.setScale(6);
    this.setSize(13, 13).setOffset(9, 7);
    this.flipX = false;
    this.play("monster7", true);
    this. rangeDown = this.y + 400
    this. rangeUp = this.y - 400
    this.speed = Phaser.Math.Between(3,6);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y -= this.speed;
  }
}

class Enemy5 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(400, 600);
    this.setScale(6);
    this.setSize(13, 13).setOffset(9, 7);
    this.flipX = false;
    this.play("monster7", true);
    this. rangeDown = this.y + 400
    this. rangeUp = this.y - 400
    this.speed = Phaser.Math.Between(3,6);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}

class Enemy6 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(800, 1000);
    this.setScale(9);
    this.setSize(23, 6).setOffset(8, 14);
    this.flipX = false;
    this.play("monster11", true);
    this. rangeDown = this.y + 200
    this. rangeUp = this.y - 200
    this.speed = Phaser.Math.Between(5,8);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y -= this.speed;
  }
}
class Enemy7 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(800, 1000);
    this.setScale(9);
    this.setSize(23, 6).setOffset(8, 14);
    this.flipX = false;
    this.play("monster11", true);
    this. rangeDown = this.y + 200
    this. rangeUp = this.y - 200
    this.speed = Phaser.Math.Between(5,8);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}

class Diver2 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 400;
    this.setScale(2);
    this.setSize(60, 24).setOffset(10, 26);
    this.flipX = false;
    this.play("diver", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy()
  }
}

class Enemy8 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(-500, -700);
    this.setScale(6);
    this.setSize(22, 8).setOffset(8, 6);
    this.flipX = true;
    this.play("monster5", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
  }
}

class Enemy9 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(600, 800);
    this.setScale(8);
    this.setSize(15, 14).setOffset(9, 11);
    this.flipX = false;
    this.play("monster4", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Enemy10 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(400, 600);
    this.setScale(6);
    this.setSize(30, 12).setOffset(22, 7);
    this.flipX = false;
    this.play("monster6", true);
    this. rangeForward = this.x + 800
    this.speed = 24;
    this.cooldown = 90;
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.cooldown > 0)
    this.cooldown--;
    if(this.cooldown === 0){
      this.x +=this.speed
    }
  }
}

class Enemy11 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(700, 900);
    this.setScale(6);
    this.setSize(18, 8).setOffset(9, 3);
    this.flipX = false;
    this.play("monster13", true);
    this. rangeDown = this.y + 50
    this. rangeUp = this.y - 50
    this.speed = 2
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}

class Enemy12 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 400;
    this.setScale(4);
    this.setSize(25, 25).setOffset(4, 6);
    this.flipX = false;
    this.play("monster12", true);

  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Enemy13 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = -400;
    this.setScale(4);
    this.setSize(25, 25).setOffset(4, 2);
    this.flipX = true;
    this.play("monster12", true);

  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < -200) this.destroy();

  }
}

class Enemy14 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 600;
    this.setScale(7);
    this.setSize(22, 6).setOffset(8, 10);
    this.flipX = false;
    this.play("monster8", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Enemy15 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = - 600;
    this.setScale(7);
    this.setSize(25, 7).setOffset(0, 13);
    this.flipX = true;
    this.play("monster9", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
  }
}

class Enemy16 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(800, 1000);
    this.setScale(7);
    this.setSize(25, 8).setOffset(8, 14);
    this.flipX = false;
    this.play("monster10", true);
    this. rangeDown = this.y + 400
    this. rangeUp = this.y - 400
    this.speed = Phaser.Math.Between(3,6);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}

class Enemy17 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(-800, -1200);
    this.setScale(7);
    this.setSize(25, 8).setOffset(0, 14);
    this.flipX = true;
    this.play("monster10", true);
    this. rangeDown = this.y + 400
    this. rangeUp = this.y - 400
    this.speed = Phaser.Math.Between(-3,-6);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < -200) this.destroy();
    if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
  }
}


class Enemy18 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(1000, 1400);
    this.setSize(200, 60).setOffset(60, 30);
    this.setScale(1);
    this.flipX = false;
    this.play("monster1", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy();
  }
}

class Enemy19 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = Phaser.Math.Between(-900, -1300);
    this.setSize(200, 60).setOffset(0, 30);
    this.setScale(1);
    this.flipX = true;
    this.play("monster1", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x < - 200) this.destroy();
  }
}

class Enemy20 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 1200
    this.setScale(8);
    this.setSize(40, 40).setOffset(23, 5);
    this.flipX = true;
    this.play("monster14", true);
    this. rangeDown = this.y + 300
    this. rangeUp = this.y - 300
    this.speed = Phaser.Math.Between(-2,-12);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    console.log(this.cooldown)
    if (this.x > config.width + 400) {
      this.body.velocity.x = Phaser.Math.Between(-1200,-1500);  
      } 
    if (this.x < - 400) {
      this.body.velocity.x = Phaser.Math.Between(1200,1500);
  }
  if(this.y >= this.rangeDown)
    this.speed = - this.speed;
    else if(this.y <= this.rangeUp)
    this.speed = - this.speed;
    this.y += this.speed;
}
}




class Diver3 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 600;
    this.setScale(2);
    this.setSize(60, 24).setOffset(10, 26);
    this.flipX = false;
    this.play("diver", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy()
  }
}

class Diver4 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.body.velocity.x = 500;
    this.setScale(2);
    this.setSize(60, 24).setOffset(10, 26);
    this.flipX = false;
    this.play("diver", true);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x > config.width + 200) this.destroy()
  }
}




