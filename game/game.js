class menuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene", active: true });
        this.menuMusic = null;
    }

    preload() {
        this.load.image("bg", "./assets/bg.jpeg");
        this.load.image("kredit", "./assets/kreditMenu.png");
        this.load.image("button", "./assets/button.png");
        this.load.image("text", "./assets/text.png");
        this.load.audio("soundMenu", "./sound/soundMenu.mp3");
        this.load.audio("click", "./sound/click.mp3");
    }

    create() {

        this.kredit = this.add.image(70, 70, "kredit").setScale(0).setDepth(10).setInteractive();

        this.tweens.add({
            targets : this.kredit,
            scale : 0.5,
            delay : 750,
            duration : 500,
            ease : "linear"
        });

        this.kredit.on('pointerdown', ()=> {
            this.sound.play("click");

            if (this.menuMusic) {
                this.menuMusic.stop();
                this.menuMusic = null;
            }

            this.scene.start('kredit');
        })
        

        if (!this.sound.get("menuMusic")) {
            this.menuMusic = this.sound.add("soundMenu", {
                volume: 1,
                loop: true
            });
            this.menuMusic.play();
        }

        this.add.image(683, 380, "bg").setScale(1.9, 1.7);
        const button = this.add.image(683, 480, "button").setScale(0).setInteractive();

        button.on("pointerdown", () => {
            this.sound.play("click");

            if (this.menuMusic) {
                this.menuMusic.stop();
                this.menuMusic = null;
            }
            this.scene.start("gamePlay");
        });

        const text = this.add.image(1366 / 2, -100, "text").setScale(0.6);
        this.tweens.add({
            targets: button,
            scale: 1,
            ease: "back",
            delay: 750,
            duration: 500
        });

        this.tweens.add({
            targets: text,
            y: 220,
            ease: "Bounce.easeOut",
            delay: 1000,
            duration: 1000
        });
    }
}















class kredit extends Phaser.Scene {
    constructor() {
        super ({ key : "kredit" })
    }

    preload() {
        this.load.image("bgk", "./assets/bg.jpeg");
        this.load.image("kataKredit", "./assets/kredit.png");
        this.load.image("back", "./assets/back.png");
        this.load.image("kotakKredit", "./assets/gameover.png");
        this.load.audio("soundMenu", "./sound/soundMenu.mp3");
    }


    create() {
        if (!this.sound.get("menuMusic")) {
            this.menuMusic = this.sound.add("soundMenu", {
                volume: 1,
                loop: true
            });
            this.menuMusic.play();
        }

        this.add.text(1366 / 2, 766 / 2 + 50, "Developer : Farel Nur Akbar \n \n Kelas : XI PPLG B \n \n Assets : Pinterest, ithc.io, freepik \n \n Music : Artist.io, Zasplat", { align : "center", fontSize : "2rem", fontWeight : "bolder" }).setDepth(10).setOrigin(0.5, 0.5);
        this.add.image(1366/2, 100, 'kataKredit').setDepth(2);
        this.add.image(1366/2, 766 / 2 + 50, 'kotakKredit').setScale(3, 2,7).setDepth(2);
        this.add.image(1366/2, 764/2, 'bgk').setScale(2.9, 1.7);
        this.back = this.add.image(70, 70, 'back').setDepth(10).setInteractive().setScale(0.5);

        this.back.on('pointerdown', ()=> {
            this.sound.play("click");

            if (this.menuMusic) {
                this.menuMusic.stop();
                this.menuMusic = null;
            }

            this.scene.start('menuScene');
        })
    }


}


















class gamePlay extends Phaser.Scene {
    constructor() {
        super({ key: "gamePlay" });

        this.targetImage = null;
        this.images = [];
        this.targetName = '';
        this.score = 0;
        this.scoreText = null;
        this.timeText = null;
        this.timerEvent = null;
        this.timeLeft = 5;
        this.level = 1;
        this.tweenPlaying = false;
    }

    preload() {
        this.load.spritesheet('char', 'assets/char.png', {
            frameWidth: 59,
            frameHeight: 59
        });
        this.load.image('bgplay', 'assets/bgplay.png');
        this.load.image('pisang', 'assets/stroberi.png');
        this.load.image('apel', 'assets/apel.png');
        this.load.image('anggur', 'assets/semangka.png');
        this.load.image('jeruk', 'assets/jeruk.png');
        this.load.image('kotakover', 'assets/gameover.png');
        this.load.image('skor', 'assets/skor.png');
        this.load.image('reset', 'assets/reset.png');
        this.load.image('menu', 'assets/menu.png');
        this.load.image('kataover', 'assets/katagameover.png');
        this.load.image('menang', 'assets/menang.png');
        this.load.image('nyawa', 'assets/nyawa.png');
        this.load.image('next', 'assets/next.png');
        this.load.audio('soundGame', 'sound/soundGame.mp3');
        this.load.audio('walk', 'sound/walk.mp3');
        this.load.audio('benar', 'sound/benar.mp3');
        this.load.audio('salah', 'sound/salah.mp3');
        this.load.audio('win', 'sound/win.mp3');
        this.load.audio('wrong', 'sound/wrong.mp3');
    }

    create() {

        this.lives = 3; 
        this.livesImages = []; 
        
        for (let i = 0; i < this.lives; i++) {
            const lifeImage = this.add.image(1223 + i * 40, 24, 'nyawa').setScale(0.14).setDepth(10);
            this.livesImages.push(lifeImage); 
        }
        
        this.sound.play('soundGame', {volume : 1 , loop : true});

        this.add.image(1366 / 2, 764 / 2, "bgplay").setScale(2, 1.5);
        this.kotak1 = this.add.image(1366 / 2, -500, "kotakover").setScale(1.5, 2.2).setDepth(10);
        this.kotak2 = this.add.image(1366 / 2, -500 / 2, "kotakover").setScale(2, 0.8).setDepth(10);
        this.add.image(110, 27, "skor").setScale(0.6, 0.4);
        this.add.image(1260, 27, "skor").setScale(0.6, 0.4);
        this.add.image(110, 740, "skor").setScale(0.6, 0.4);
        this.add.image(1260, 740, "skor").setScale(0.6, 0.4);
        this.reset = this.reset = this.add.image(1180 / 2, -500, "reset").setScale(0.55).setDepth(11).setInteractive();

        this.reset.on('pointerdown', () => {
            this.resetGame();
        });

        this.menu = this.menu = this.add.image(1570 / 2, -500, "menu").setDepth(11).setInteractive();
        this.next = this.next = this.add.image(1570 / 2, -500, "next").setDepth(11).setInteractive();

        this.next.on('pointerdown', () => {
            this.scene.start("gamePlay2");
        })

        this.kataover = this.add.image(1366 / 2, -500, "kataover").setDepth(11).setScale(1.7);
        this.kotakbuah = this.add.image(1366 / 2, 80, "kotakover").setScale(0.9);
        this.menang = this.add.image(1366 / 2, -500, "menang").setScale(1.7).setDepth(11);


        this.finalScoreText = this.add.text(1030 / 2, -500, 'Skor Akhir: ' + this.score, {
            fontSize: '40px',
            fontWeight : '900',
            fill: '#ffffff'
        }).setDepth(12);

        this.anims.create({
            key: 'berjalanKiri',
            frames: this.anims.generateFrameNumbers('char', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'berjalanKanan',
            frames: this.anims.generateFrameNumbers('char', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'berjalanbawah',
            frames: this.anims.generateFrameNumbers('char', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "berjalanatas",
            frames: this.anims.generateFrameNumbers('char', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.char = this.physics.add.sprite(200, 200, 'char').setScale(0.8).setCollideWorldBounds(true);
        this.scoreText = this.add.text(23, 11, 'Skor: 0', { fontSize: '32px', fill: '#fff' });
        this.timeText = this.add.text(1170, 725, 'Waktu: 80', { fontSize: '32px', fill: '#fff' });
        this.levelText = this.add.text(23, 725, 'Level 1', { fontSize: '32px', fill: '#fff' });

        this.setNewTargetImage();
        this.spawnFruits();

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            repeat: this.timeLeft - 1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    resetGame() {
        this.lives = 3;
        this.livesImages = [];

        this.livesImages.forEach(lifeImage => {
            lifeImage.destroy();
        });

        for (let i = 0; i < this.lives; i++) {
            const lifeImage = this.add.image(1221 + i * 40, 24, 'nyawa').setScale(0.14).setDepth(10);
            this.livesImages.push(lifeImage);
        }

        this.score = 0;
        this.timeLeft = 80;
        this.level = 1;
        this.scoreText.setText('Skor: ' + this.score);
        this.timeText.setText('Waktu: ' + this.timeLeft);
        this.levelText.setText('Level ' + this.level);
    
        this.images.forEach(image => image.destroy());
        this.images = [];
        this.setNewTargetImage();
        this.spawnFruits();
    
        if (this.timerEvent) {
            this.timerEvent.remove();
        }
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            repeat: this.timeLeft - 1
        });
    
        this.char.setPosition(200, 200);
    
        this.kotak1.setY(-500);
        this.kotak2.setY(-500);
        this.kataover.setY(-500);
        this.menang.setY(-500);
        this.reset.setY(-500);
        this.menu.setY(-500);
        this.next.setY(-500);
        this.finalScoreText.setY(-500);
    
        this.tweens.killAll();
    
        this.tweenPlaying = false;
        this.sound.stopAll();

        this.sound.play('soundGame', {volume : 1 , loop : true});
    
        this.timerEvent.paused = false;
    }
    

    setNewTargetImage() {
        const keys = ['pisang', 'apel', 'anggur', 'jeruk'];
        this.targetName = Phaser.Utils.Array.GetRandom(keys);

        if (this.targetImage) {
            this.targetImage.setTexture(this.targetName);
        } else {
            this.targetImage = this.add.image(1366 / 2, 80, this.targetName).setScale(1.3);
        }
    }

    spawnFruits() {
        this.images.forEach(image => image.destroy());
        this.images = [];

        const keys = ['pisang', 'apel', 'anggur', 'jeruk'];
        Phaser.Utils.Array.Shuffle(keys);

        for (let i = 0; i < keys.length; i++) {
            let x, y, distance;
            do {
                x = Phaser.Math.Between(200, 1166);
                y = Phaser.Math.Between(300, 600);
                distance = Phaser.Math.Distance.Between(x, y, this.char.x, this.char.y);
            } while (distance < 100);

            const fruit = this.physics.add.image(x, y, keys[i]).setInteractive().setScale(0.5);
            
            let isSoundPlaying = false;

            this.physics.add.overlap(this.char, fruit, () => {
                if (keys[i] === this.targetName) {
                    this.score += 10;
                    this.scoreText.setText('Skor: ' + this.score);
                    fruit.destroy();

                    this.sound.play('benar', { volume: 1 });

                    if (this.score >= 150) {
                        if (!this.tweenPlaying) {
                            this.tweenPlaying = true;  
                        
                            this.timerEvent.paused = true;

                            this.sound.stopAll();

                        if (!isSoundPlaying) {
                            isSoundPlaying = true; 
                            this.sound.play('win', {
                                volume: 1,
                                loop: false
                            })
                        };
                        
                  
                            this.tweens.add({
                                targets: this.finalScoreText,
                                y: 764 / 2,   
                                ease: "linear",  
                                delay: 2000,  
                                duration: 800,
                                onStart: () => {
            
                                    this.finalScoreText.setText('Skor Akhir: ' + this.score);
                                }
                            });
                            
                            this.tweens.add({
                                targets: this.kotak1,
                                y: 764 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.kotak2,
                                y: 500 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.reset,
                                y: 1020 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.next,
                                y: 1020 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.menang,
                                y: 500 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800,
                                onComplete: () => { this.tweenPlaying = false; } 
                            });
                        }
                        
                        
                    } else {
                        this.setNewTargetImage();
                        this.spawnFruits();
                    }
                } else {
                    if (this.lives > 1) {
                      
                        this.lives--; 
                        const lifeImage = this.livesImages.pop();
                        lifeImage.destroy(); 
                        this.setNewTargetImage(); 
                        this.spawnFruits(); 

                        this.sound.play('wrong', { volume: 1 });
                    } else {
                  
                        if (!this.tweenPlaying) {
                            this.tweenPlaying = true;  
                
                        
                            this.timerEvent.paused = true; 
                
                          
                            this.sound.stopAll();

                            if (!isSoundPlaying) {
                                isSoundPlaying = true; 
                                this.sound.play('salah', { volume: 1, loop: false }); 
                            }
                
                          
                            this.finalScoreText.setText('Skor Akhir: ' + this.score);

                            this.tweens.add({
                                targets: this.finalScoreText,
                                y: 764 / 2,   
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                     
                            this.tweens.add({
                                targets: this.kotak1,
                                y: 764 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                        
                            this.tweens.add({
                                targets: this.kotak2,
                                y: 500 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
      
                            this.tweens.add({
                                targets: this.reset,
                                y: 1020 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                        
                            this.tweens.add({
                                targets: this.menu,
                                y: 1020 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                            this.tweens.add({
                                targets: this.kataover,  
                                y: 500 / 2,             
                                ease: "linear",
                                duration: 800,
                                delay : 2000,
                                onComplete: () => {
                                    this.tweenPlaying = false; 
                                    console.log("Tween complete, game over animation finished");
                                }
                            });
                        } else {
                            console.log("Tween is already playing, skipping game over animation");
                        }
                    }
                    
                }
            });

            this.images.push(fruit);
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.timeText.setText('Waktu: ' + this.timeLeft);

        if (this.timeLeft <= 0) {
            if (!this.tweenPlaying) {
                this.tweenPlaying = true;  
            
                this.timerEvent.paused = true;

                this.sound.stopAll();

                this.sound.play('salah', {
                    volume: 1,
                    loop : false
                });
            
      
                this.tweens.add({
                    targets: this.finalScoreText,
                    y: 764 / 2,  
                    ease: "linear",  
                    delay: 2000,  
                    duration: 800,
                    onStart: () => {
                  
                        this.finalScoreText.setText('Skor Akhir: ' + this.score);
                    }
                });
            
                this.tweens.add({
                    targets: this.kotak1,
                    y: 764 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.kotak2,
                    y: 500 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.reset,
                    y: 1020 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.menu,
                    y: 1020 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.kataover,
                    y: 500 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800,
                    onComplete: () => { this.tweenPlaying = false; } 
                });
            }
        }
    }

    endGame() {
        alert('Waktu habis! Skor akhir: ' + this.score);
        this.scene.restart();
    }

    update() {

        
        if (this.tweenPlaying) {
            this.char.setVelocity(0);
            return; 
        }
    
        this.char.setVelocity(0);
    
        let currentAnimation = null;
        let isWalking = false;

        if (this.cursors.left.isDown) {
            this.char.setVelocityX(-150);
            currentAnimation = 'berjalanKiri';
            isWalking = true;
        } else if (this.cursors.right.isDown) {
            this.char.setVelocityX(150);
            currentAnimation = 'berjalanKanan';
            isWalking = true;
        } else if (this.cursors.up.isDown) {
            this.char.setVelocityY(-150);
            currentAnimation = 'berjalanatas';
            isWalking = true;
        } else if (this.cursors.down.isDown) {
            this.char.setVelocityY(150);
            currentAnimation = 'berjalanbawah';
            isWalking = true;
        }
    
        if (isWalking && !this.walkSoundPlaying) {
            this.walkSoundPlaying = true; 
            this.sound.play('walk', { volume: 1, loop: true });
        } else if (!isWalking && this.walkSoundPlaying) {
            this.walkSoundPlaying = false;
            this.sound.stopByKey('walk'); 
        }
    
        if (currentAnimation) {
            this.char.anims.play(currentAnimation, true);
        } else {
            this.char.anims.stop();
        }
    }
    
    
}






























class gamePlay2 extends Phaser.Scene {
    constructor() {
        super({ key: "gamePlay2" });

        this.targetImage = null;
        this.images = [];
        this.targetName = '';
        this.score = 0;
        this.scoreText = null;
        this.timeText = null;
        this.timerEvent = null;
        this.timeLeft = 60;
        this.level = 1;
        this.tweenPlaying = false;
    }

    preload() {
        this.load.spritesheet('char', 'assets/char.png', {
            frameWidth: 59,
            frameHeight: 59
        });
        this.load.image('bgplay', 'assets/bgplay.png');
        this.load.image('pisang', 'assets/stroberi.png');
        this.load.image('apel', 'assets/apel.png');
        this.load.image('anggur', 'assets/semangka.png');
        this.load.image('jeruk', 'assets/jeruk.png');
        this.load.image('kotakover', 'assets/gameover.png');
        this.load.image('skor', 'assets/skor.png');
        this.load.image('reset', 'assets/reset.png');
        this.load.image('menu', 'assets/menu.png');
        this.load.image('kataover', 'assets/katagameover.png');
        this.load.image('menang', 'assets/menang.png');
        this.load.image('nyawa', 'assets/nyawa.png');
        this.load.image('next', 'assets/next.png');
        this.load.audio('soundGame', 'sound/soundGame.mp3');
        this.load.audio('walk', 'sound/walk.mp3');
        this.load.audio('benar', 'sound/benar.mp3');
        this.load.audio('salah', 'sound/salah.mp3');
        this.load.audio('win', 'sound/win.mp3');
        this.load.audio('wrong', 'sound/wrong.mp3');
    }

    create() {

        this.lives = 3; 
        this.livesImages = []; 
        
        for (let i = 0; i < this.lives; i++) {
            const lifeImage = this.add.image(1223 + i * 40, 24, 'nyawa').setScale(0.14).setDepth(10);
            this.livesImages.push(lifeImage); 
        }
        
        this.sound.play('soundGame', {volume : 1 , loop : true});

        this.add.image(1366 / 2, 764 / 2, "bgplay").setScale(2, 1.5);
        this.kotak1 = this.add.image(1366 / 2, -500, "kotakover").setScale(1.5, 2.2).setDepth(10);
        this.kotak2 = this.add.image(1366 / 2, -500 / 2, "kotakover").setScale(2, 0.8).setDepth(10);
        this.add.image(110, 27, "skor").setScale(0.6, 0.4);
        this.add.image(1260, 27, "skor").setScale(0.6, 0.4);
        this.add.image(110, 740, "skor").setScale(0.6, 0.4);
        this.add.image(1260, 740, "skor").setScale(0.6, 0.4);
        this.reset = this.reset = this.add.image(1180 / 2, -500, "reset").setScale(0.55).setDepth(11).setInteractive();

        this.reset.on('pointerdown', () => {
            this.resetGame();
        });

        this.menu = this.menu = this.add.image(1570 / 2, -500, "menu").setDepth(11).setInteractive();
        this.next = this.next = this.add.image(1570 / 2, -500, "next").setDepth(11).setInteractive();

        this.menu.on('pointerdown', () => {
            this.scene.start("menuScene");
        })

        this.kataover = this.add.image(1366 / 2, -500, "kataover").setDepth(11).setScale(1.7);
        this.kotakbuah = this.add.image(1366 / 2, 80, "kotakover").setScale(0.9);
        this.menang = this.add.image(1366 / 2, -500, "menang").setScale(1.7).setDepth(11);


        this.finalScoreText = this.add.text(1030 / 2, -500, 'Skor Akhir: ' + this.score, {
            fontSize: '40px',
            fontWeight : '900',
            fill: '#ffffff'
        }).setDepth(12);

        this.anims.create({
            key: 'berjalanKiri',
            frames: this.anims.generateFrameNumbers('char', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'berjalanKanan',
            frames: this.anims.generateFrameNumbers('char', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'berjalanbawah',
            frames: this.anims.generateFrameNumbers('char', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "berjalanatas",
            frames: this.anims.generateFrameNumbers('char', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.char = this.physics.add.sprite(200, 200, 'char').setScale(0.8).setCollideWorldBounds(true);
        this.scoreText = this.add.text(23, 11, 'Skor: 0', { fontSize: '32px', fill: '#fff' });
        this.timeText = this.add.text(1170, 725, 'Waktu: 80', { fontSize: '32px', fill: '#fff' });
        this.levelText = this.add.text(23, 725, 'Level 2', { fontSize: '32px', fill: '#fff' });

        this.setNewTargetImage();
        this.spawnFruits();

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            repeat: this.timeLeft - 1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    resetGame() {
        this.lives = 3;
        this.livesImages = [];

        this.livesImages.forEach(lifeImage => {
            lifeImage.destroy();
        });

        for (let i = 0; i < this.lives; i++) {
            const lifeImage = this.add.image(1221 + i * 40, 24, 'nyawa').setScale(0.14).setDepth(10);
            this.livesImages.push(lifeImage);
        }

        this.score = 0;
        this.timeLeft = 80;
        this.level = 1;
        this.scoreText.setText('Skor: ' + this.score);
        this.timeText.setText('Waktu: ' + this.timeLeft);
        this.levelText.setText('Level ' + this.level);
    
        this.images.forEach(image => image.destroy());
        this.images = [];
        this.setNewTargetImage();
        this.spawnFruits();
    
        if (this.timerEvent) {
            this.timerEvent.remove();
        }
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            repeat: this.timeLeft - 1
        });
    
        this.char.setPosition(200, 200);
    
        this.kotak1.setY(-500);
        this.kotak2.setY(-500);
        this.kataover.setY(-500);
        this.menang.setY(-500);
        this.reset.setY(-500);
        this.menu.setY(-500);
        this.finalScoreText.setY(-500);
    
        this.tweens.killAll();
    
        this.tweenPlaying = false;
        this.sound.stopAll();

        this.sound.play('soundGame', {volume : 1 , loop : true});
    
        this.timerEvent.paused = false;
    }
    

    setNewTargetImage() {
        const keys = ['pisang', 'apel', 'anggur', 'jeruk'];
        this.targetName = Phaser.Utils.Array.GetRandom(keys);

        if (this.targetImage) {
            this.targetImage.setTexture(this.targetName);
        } else {
            this.targetImage = this.add.image(1366 / 2, 80, this.targetName).setScale(1.3);
        }
    }

    spawnFruits() {
        this.images.forEach(image => image.destroy());
        this.images = [];

        const keys = ['pisang', 'apel', 'anggur', 'jeruk'];
        Phaser.Utils.Array.Shuffle(keys);

        for (let i = 0; i < keys.length; i++) {
            let x, y, distance;
            do {
                x = Phaser.Math.Between(200, 1166);
                y = Phaser.Math.Between(300, 600);
                distance = Phaser.Math.Distance.Between(x, y, this.char.x, this.char.y);
            } while (distance < 100);

            const fruit = this.physics.add.image(x, y, keys[i]).setInteractive().setScale(0.5);
            
            let isSoundPlaying = false;

            this.physics.add.overlap(this.char, fruit, () => {
                if (keys[i] === this.targetName) {
                    this.score += 10;
                    this.scoreText.setText('Skor: ' + this.score);
                    fruit.destroy();

                    this.sound.play('benar', { volume: 1 });

                    if (this.score >= 200) {
                        if (!this.tweenPlaying) {
                            this.tweenPlaying = true;  
                        
                            this.timerEvent.paused = true;

                            this.sound.stopAll();

                        if (!isSoundPlaying) {
                            isSoundPlaying = true; 
                            this.sound.play('win', {
                                volume: 1,
                                loop: false
                            })
                        };
                        
                  
                            this.tweens.add({
                                targets: this.finalScoreText,
                                y: 764 / 2,   
                                ease: "linear",  
                                delay: 2000,  
                                duration: 800,
                                onStart: () => {
            
                                    this.finalScoreText.setText('Skor Akhir: ' + this.score);
                                }
                            });
                            
                            this.tweens.add({
                                targets: this.kotak1,
                                y: 764 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.kotak2,
                                y: 500 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.reset,
                                y: 1020 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.next,
                                y: 1020 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800
                            });
                            this.tweens.add({
                                targets: this.menang,
                                y: 500 / 2,
                                ease: "linear",
                                delay: 2000,
                                duration: 800,
                                onComplete: () => { this.tweenPlaying = false; } 
                            });
                        }
                        
                        
                    } else {
                        this.setNewTargetImage();
                        this.spawnFruits();
                    }
                } else {
                    if (this.lives > 1) {
                      
                        this.lives--; 
                        const lifeImage = this.livesImages.pop();
                        lifeImage.destroy(); 
                        this.setNewTargetImage(); 
                        this.spawnFruits(); 

                        this.sound.play('wrong', { volume: 1 });
                    } else {
                  
                        if (!this.tweenPlaying) {
                            this.tweenPlaying = true;  
                
                        
                            this.timerEvent.paused = true; 
                
                          
                            this.sound.stopAll();

                            if (!isSoundPlaying) {
                                isSoundPlaying = true; 
                                this.sound.play('salah', { volume: 1, loop: false }); 
                            }
                
                          
                            this.finalScoreText.setText('Skor Akhir: ' + this.score);

                            this.tweens.add({
                                targets: this.finalScoreText,
                                y: 764 / 2,   
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                     
                            this.tweens.add({
                                targets: this.kotak1,
                                y: 764 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                        
                            this.tweens.add({
                                targets: this.kotak2,
                                y: 500 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
      
                            this.tweens.add({
                                targets: this.reset,
                                y: 1020 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                        
                            this.tweens.add({
                                targets: this.menu,
                                y: 1020 / 2,
                                ease: "linear",
                                duration: 800,
                                delay : 2000
                            });
                
                            this.tweens.add({
                                targets: this.kataover,  
                                y: 500 / 2,             
                                ease: "linear",
                                duration: 800,
                                delay : 2000,
                                onComplete: () => {
                                    this.tweenPlaying = false; 
                                    console.log("Tween complete, game over animation finished");
                                }
                            });
                        } else {
                            console.log("Tween is already playing, skipping game over animation");
                        }
                    }
                    
                }
            });

            this.images.push(fruit);
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.timeText.setText('Waktu: ' + this.timeLeft);

        if (this.timeLeft <= 0) {
            if (!this.tweenPlaying) {
                this.tweenPlaying = true;  
            
                this.timerEvent.paused = true;

                this.sound.stopAll();

                this.sound.play('salah', {
                    volume: 1,
                    loop : false
                });
            
      
                this.tweens.add({
                    targets: this.finalScoreText,
                    y: 764 / 2,  
                    ease: "linear",  
                    delay: 2000,  
                    duration: 800,
                    onStart: () => {
                  
                        this.finalScoreText.setText('Skor Akhir: ' + this.score);
                    }
                });
            
                this.tweens.add({
                    targets: this.kotak1,
                    y: 764 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.kotak2,
                    y: 500 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.reset,
                    y: 1020 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.menu,
                    y: 1020 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800
                });
                this.tweens.add({
                    targets: this.kataover,
                    y: 500 / 2,
                    ease: "linear",
                    delay: 2000,
                    duration: 800,
                    onComplete: () => { this.tweenPlaying = false; } 
                });
            }
        }
    }

    endGame() {
        alert('Waktu habis! Skor akhir: ' + this.score);
        this.scene.restart();
    }

    update() {

        
        if (this.tweenPlaying) {
            this.char.setVelocity(0);
            return; 
        }
    
        this.char.setVelocity(0);
    
        let currentAnimation = null;
        let isWalking = false;

        if (this.cursors.left.isDown) {
            this.char.setVelocityX(-250);
            currentAnimation = 'berjalanKiri';
            isWalking = true;
        } else if (this.cursors.right.isDown) {
            this.char.setVelocityX(250);
            currentAnimation = 'berjalanKanan';
            isWalking = true;
        } else if (this.cursors.up.isDown) {
            this.char.setVelocityY(-250);
            currentAnimation = 'berjalanatas';
            isWalking = true;
        } else if (this.cursors.down.isDown) {
            this.char.setVelocityY(250);
            currentAnimation = 'berjalanbawah';
            isWalking = true;
        }
    
        if (isWalking && !this.walkSoundPlaying) {
            this.walkSoundPlaying = true; 
            this.sound.play('walk', { volume: 1, loop: true });
        } else if (!isWalking && this.walkSoundPlaying) {
            this.walkSoundPlaying = false;
            this.sound.stopByKey('walk'); 
        }
    
        if (currentAnimation) {
            this.char.anims.play(currentAnimation, true);
        } else {
            this.char.anims.stop();
        }
    }
    
    
}













    

const config = {
    type: Phaser.AUTO,
    width: 1366,
    height: 764,
    scene: [menuScene, kredit, gamePlay, gamePlay2],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    audio: {
        disableWebAudio: false
    }
};

const game = new Phaser.Game(config);
