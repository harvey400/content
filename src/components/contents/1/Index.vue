<template>
    <div class="canvas noselect">
        <div id="backgroundDiv">
            <div class="bgGroup" id="background-1">
            </div>
            <div class="bgGroup" id="background-2">
            </div>
        </div>
        <div id="wallContainer">
            <div v-for="(key,wall) in walls" :id="'wall-'+key" :style="randomTop()" class="wallGroup">
                <div class="wall"></div>
                <div class="scoreWall"></div>
                <div class="wall2"></div>
            </div>
        </div>
        <canvas id="confettiDiv">
        </canvas>
        <div id="startScreenDiv" @click="startGame" class="h-screen screen grid grid-cols-1 content-start">
            <div class="h-80 m-3 flex">
                <div>
                    <img src="/1/trophy-icon-2.png" height="50px" width="50px" alt="trophy">
                </div>
                <span id="bestScoreDiv" class="text-stroke text-5xl font-semibold text-white ml-3">0</span>
            </div>
            <div class="mt-56 text-center bg-sky-200 bg-opacity-50">
                <span class="text-7xl font-medium">START</span>
            </div>
            <div></div>
        </div>
        <div id="controllerScreenDiv" @mousedown="jump" style ="visibility: hidden;" class="screen grid grid-cols-1 gap-4 content-start h-48">
            <div id="bestScoreTextDiv" style="visibility: hidden;" class="mt-28 text-center text-4xl font-bold text-stroke text-yellow-300">
                NEW HIGH SCORE 🍆
            </div>
            <div id ="score" class="text-center text-7xl font-bold"></div>
            <div class="text-center mt-80">
                <button id="restartBtn" @click="restartGame()" class="font-semibold border rounded-lg text-4xl p-2" style ="visibility: hidden;">RESTART</button>
            </div>
        </div>
        <div id="ball" :style="ballStyle()"></div>
    </div>
</template>
<script>
    import {onMounted } from 'vue';

    export default {
        setup() {
            let heightLimit = 14;
            let jumpHeight = 0;
            let floor = 790;
            let isGameStart = 0;
            let ball = null
            let wallGroup = null
            let bgGroup = null
            let scoreDiv = null
            let ballStyle = ()=> {}
            let score = 0
            let bestScore = 0;
            let currentCollision = ""
            let ballAnimationContainer
            let wallAnimationContainer
            let confettiOn = 0

            let jump = () => {
                if(!isGameStart)return
                
                jumpHeight = heightLimit

                ball.style.top = parseInt(ball.style.top) - jumpHeight + "px"

                new Audio("/1/sound/sfx_wing.wav").play()
            }

            let startGame = () => {
                isGameStart = 1

                let startScreenDiv = document.querySelector('#startScreenDiv');
                startScreenDiv.style.visibility = "hidden";
                
                let controllerScreenDiv = document.querySelector('#controllerScreenDiv');
                controllerScreenDiv.style.visibility = "visible";

                jump()
            }

            let restartGame = () => {
                initialiseData()

                currentCollision = ""

                let startScreenDiv = document.querySelector('#startScreenDiv');
                startScreenDiv.style.visibility = "visible";
                
                let controllerScreenDiv = document.querySelector('#controllerScreenDiv');
                controllerScreenDiv.style.visibility = "hidden";

                let restartBtn = document.querySelector('#restartBtn');
                restartBtn.style.visibility = "hidden";
                
                scoreDiv.classList.remove('bg-sky-200')
                scoreDiv.classList.remove('bg-opacity-50')


                document.querySelector('#bestScoreTextDiv').style.visibility = "hidden";

                confettiOn = 0;
            }

            let stopGame = () => {
                isGameStart = 0
                clearInterval(wallAnimationContainer)
                clearInterval(ballAnimationContainer)

                scoreDiv.classList.add('bg-sky-200')
                scoreDiv.classList.add('bg-opacity-50')

                setTimeout(() => {
                    let restartBtn = document.querySelector('#restartBtn');
                    restartBtn.style.visibility = "visible";
                }, 1000);

                setBestScore(score)
            }

            let stopClick = () => {
            };

            let setBestScore = (score) => {
                let bestScoreDiv = document.querySelector('#bestScoreDiv');

                if(score > bestScore) {
                    confettiOn = 1;         //Turn on confetti
                    bestScore = score
                    bestScoreDiv.textContent = score

                    document.querySelector('#bestScoreTextDiv').style.visibility = "visible";
                    
                }
            }
            
            let wallAnimation = () => {
                if(isGameStart === 1) {
                    //Wall
                    wallGroup.forEach(element => {
                        //Adjust position if left most
                        if(parseInt(element.style.left) <= -150) {
                            element.style.left = (400 * 3) + "px"
                        }
                        element.style.left = parseInt(element.style.left) - 1 + "px"

                        //check if collided
                        if(isCollide(element.children[0],ball) || isCollide(element.children[2],ball)){
                            
                            new Audio("/1/sound/sfx_hit.wav").play()
                            stopGame();
                        }

                        //Score collision
                        if (isCollide(element.children[1],ball) && currentCollision != element.id) {
                            console.log(currentCollision);
                            score += 1;
                            scoreDiv.textContent = score;
                            currentCollision = element.id
                            new Audio("/1/sound/sfx_point.wav").play()
                        } else {
                            // onScoreCollision = false
                        }
                    })

                    //Background
                    bgGroup.forEach(element => {
                        if(parseFloat(element.style.left) <= -1000) {
                            element.style.left = 1000 + "px"
                        }

                        element.style.left = parseFloat(element.style.left) - (.5) + "px"
                    })

                }
            }

            let ballAnimation = () => {
                if(!isGameStart)return 

                if(parseInt(ball.style.top) >= floor){
                    ball.style.top = floor + "px"
                    jumpHeight = heightLimit;
                }else if(parseInt(ball.style.top) <= 10){
                    ball.style.top = 11 + "px"
                } else {
                    ball.style.top = parseInt(ball.style.top) - jumpHeight + "px"
                    jumpHeight -= 1;
                    ball.style.rotate = ((jumpHeight * -1) * 1.5) + "deg"
                }
                
            }


            //Are you?
            let currentScore
            let bestScoreTextDiv
            let backgroundDiv
            let restartBtn
            let areYou = setInterval(() => {
                if(isGameStart == 0) {
                    
                    currentScore = parseInt(scoreDiv.textContent);
                    bestScoreTextDiv = document.querySelector('#bestScoreTextDiv')
                    backgroundDiv = document.querySelector('#backgroundDiv')
                    restartBtn = document.querySelector('#restartBtn')
                    if(currentScore != score){
                        bestScoreTextDiv.style.visibility = "visible";
                        bestScoreTextDiv.textContent = "Hey look! I'm a cheater! haha";
                        backgroundDiv.remove();
                        restartBtn.remove();
                        setTimeout(() => {
                            location.replace(location.href);
                        }, 5000);
                    }
                }
            }, 1000);

            //Wall
            const walls = [0,1,2]

            //Wall position generator
            let randomTop = () => { 
                    let rand = [0 , -100, -200, -300, -400, -500];
                    return {
                        top:  rand[Math.floor(Math.random() * 6)] + "px",
                    }
            }


            let initialiseData = () => {
                isGameStart = 0

                //Ball
                ball = document.querySelector("#ball");
                ball.style.top = "500px"
                
                //Wall
                wallGroup = document.querySelectorAll(".wallGroup");
                let marginCounter = 0;
                let bg = ['sardines', 'isaw', 'tuyo'];
                wallGroup.forEach(element => {
                    let startingPosition = 450
                    element.style.left = (startingPosition + (marginCounter * 450)) + "px"
                    console.log(element.children[0].style.left);
                    //Set Background Image
                    element.children[0].style.backgroundImage = "url('/1/" + bg[marginCounter] +".png')";
                    element.children[2].style.backgroundImage = "url('/1/" + bg[marginCounter] +".png')";
                    // element.style.left =  "0px"
                    marginCounter++;
                });


                //Background
                
                let bgMarginCounter = 0;
                bgGroup = document.querySelectorAll(".bgGroup");
                bgGroup.forEach(element => {
                    element.style.left = (bgMarginCounter * 1000) + "px"
                    bgMarginCounter++;
                });

                //Score
                scoreDiv = document.querySelector("#score");
                score = 0
                scoreDiv.textContent = score;


                //Animation
                
                //Ball Animation
                ballAnimationContainer = setInterval(ballAnimation,18);
                
                //Wall animation
                wallAnimationContainer = setInterval(wallAnimation,10);
            }

            onMounted(()=>{
                initialiseData()
                setConfetti()
            })

            //Collide checker
            const isCollide = (a, b) => {
                var aRect = a.getBoundingClientRect();
                var bRect = b.getBoundingClientRect();

                return !(
                    ((aRect.top + aRect.height) < (bRect.top)) ||
                    (aRect.top > (bRect.top + bRect.height)) ||
                    ((aRect.left + aRect.width) < bRect.left) ||
                    (aRect.left > (bRect.left + bRect.width))
                );
            }

            let setConfetti = () => {
                let W = window.innerWidth;
                let H = window.innerHeight;
                const canvas = document.getElementById("confettiDiv");
                const context = canvas.getContext("2d");
                let maxConfettis = 10;
                const particles = [];

                const possibleColors = [
                "DodgerBlue",
                "OliveDrab",
                "Gold",
                "Pink",
                "SlateBlue",
                "LightBlue",
                "Gold",
                "Violet",
                "PaleGreen",
                "SteelBlue",
                "SandyBrown",
                "Chocolate",
                "Crimson"
                ];

                function randomFromTo(from, to) {
                return Math.floor(Math.random() * (to - from + 1) + from);
                }

                function confettiParticle() {
                    this.x = Math.random() * W; // x
                    this.y = Math.random() * H - H; // y
                    this.r = randomFromTo(11, 33); // radius
                    this.d = Math.random() * maxConfettis + 11;
                    this.color =
                        possibleColors[Math.floor(Math.random() * possibleColors.length)];
                    this.tilt = Math.floor(Math.random() * 33) - 11;
                    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
                    this.tiltAngle = 0;

                    this.draw = function() {
                        context.beginPath();
                        context.lineWidth = this.r / 2;
                        context.strokeStyle = this.color;
                        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
                        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
                        return context.stroke();
                    };
                }

                function Draw() {

                    const results = [];

                    // Magical recursive functional love
                    requestAnimationFrame(Draw);
                    context.clearRect(0, 0, W, window.innerHeight);

                    //If 1, turn turn on confetti
                    if(confettiOn !== 1 ) {
                        return
                    }

                    for (var i = 0; i < maxConfettis; i++) {
                            results.push(particles[i].draw());
                    }

                    let particle = {};
                    let remainingFlakes = 0;
                    for (var i = 0; i < maxConfettis; i++) {
                        particle = particles[i];

                        particle.tiltAngle += particle.tiltAngleIncremental;
                        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
                        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

                        if (particle.y <= H) remainingFlakes++;

                        // If a confetti has fluttered out of view,
                        // bring it back to above the viewport and let if re-fall.
                        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                        particle.x = Math.random() * W;
                        particle.y = -30;
                        particle.tilt = Math.floor(Math.random() * 10) - 20;
                        }
                    }

                    return results;
                }

                // Push new confetti objects to `particles[]`
                for (var i = 0; i < maxConfettis; i++) {
                    particles.push(new confettiParticle());
                }

                // Initialize
                canvas.width = W;
                canvas.height = H;
                Draw();
            }

            return {jump, stopClick, ballStyle, walls, randomTop, score, isGameStart, startGame, restartGame}
        }
    }
    
</script>
<style scoped>

#ball{
    position: absolute;
    background-image: url('/1/player.png');
    background-size: cover;
    /* background-color: green; */
    top: 700px;
    left: 45%;
    border-radius: 25%;
    height: 50px;
    width: 50px;
}
.screen {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.wall{
    background-color: pink;
    transform: rotate(180deg);
    height: 600px;
    width: 150px;
}
.wall2{
    background-color: pink;
    height: 700px;
    width: 150px;
    margin-top: 0px;
}
.wallContainer{
    position: absolute; 
    top:50px; 
    width: 5000px;
    height: 100%; 
    display: inline-block; 
    overflow: hidden;
}
.wallGroup {
    position: absolute;
    background-color: clear;
    display: inline-block;
}
.scoreWall {
    position: relative;
    left: 130px;
    height: 245px;
    width: 20px;
    /* background-color: black; */
    background-color: clear;
}

#backgroundDiv {
    position: absolute;
    top:0;
    left:0;
    display: inline-block;
    height: 100%;
    width: 2000px;
    background-color: yellow;
}

.bgGroup {
    background-color: orange;
    background-image: url('/1/sky.jpg');
    background-size: 1001px 100%;
    height: 100%;
    width: 1001px;
    position: absolute;
    left: 0px;
    display: inline-block;
}

.text-stroke{
    text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}

#confettiDiv {
    position: absolute;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
    margin: 0;
}
</style>