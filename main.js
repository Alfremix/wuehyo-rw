song = "";

function preload()
{
song = loadSound("jeje.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;



leftWristX = 0;
leftWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
    console.log("iniciaCanvas");

}
function modelLoaded(){
    console.log("poseNt esta inicialicado");
}
function gotPoses(results){

    if(results.length>0){
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("Volume").innerHTML = "Volume = "+volume;
        song.setVolume(volume);
        if(rightWristY>0&&rightWristY<=100){
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100&&rightWristY<=200){
           document.getElementById("speed").innerHTML = "speed=1x";
           song.rate(1);
        }
        else if(rightWristY>200&&rightWristY<=300){
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
    }
    else if(rightWristY>300&&rightWristY<=400){
        document.getElementById("speed").innerHTML = "speed=2x";
        song.rate(2);
    }
      else if(rightWristY>400){
        document.getElementById("speed").innerHTML = "speed=2.5x";
        song.rate(2.5);

      }
    }
    if(scoreLeftWrist>0.2){
          circle(leftWristX, leftWristY,20);
          InNumberleftWristY = Number(leftWristY);
    new_leftWristY = floor(InNumberleftWristY *2);
    leftWristY_divide_1000 = new_leftWristY/1000;
    document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
    song.setVolume(leftWristY_divide_1000);
    }
    
    }
    
    function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    }

