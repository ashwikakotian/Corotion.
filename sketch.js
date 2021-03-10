var bgI ,bg
var b1,b2 ,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b16
var b17,b18,b19,b20,b21,b22,b23,b24,b25,b26,b27,b28,b30,b31,b32,b33,b34,b35
var b36,b37,b38,b39,b40,b41,b42,b43,b45,b46,b47,b48,b49,b50,b51,b52,b53,b54,b55,b56
var player ,playerI
var c1I,c2I,c3I,c1,c2,c3,borderGroup,cGroup,cBGroup;
var food,foodGroup
var score;
var gameOverImage,sI,s1,s2,s3,s4,s5,s6,s7
var sGroup
var counter=0
var count =0

var gameState;
var die,sound,win,sani,a,p



function preload(){
    bgI=loadImage("images/bg.png")
    playerI=loadImage("images/em.png")
    c1I=loadImage("images/c1.png")
    c2I=loadImage("images/c2.png")
    c3I=loadImage("images/c3.png")
    gameOverImage=loadImage("images/gameO.jpg")
    sI=loadImage("images/s.png")

    soundI=loadSound("s.mp3")
    die=loadSound("d.mp3")
    win=loadSound("w (3).mp3")
    sani=loadSound("c.mp3")
    a=loadSound("a.wav")
    p=loadSound("p.wav")

}
function setup(){
    createCanvas(1200,800)
    bg=createSprite(600,400)
    bg.addImage(bgI);

    gameState="PLAY"
    score= 0;
    
    borders();

   b55=createSprite(285,370,15,60)
   b56=createSprite(910,370,15,60)

    //player1
    player=createSprite(1050,700)
    player.addImage(playerI)
    player.scale=0.03;
    
   player.setCollider("rectangle",0,0,1200,1200)
    

    //player2
    c1=createSprite(550,380,10,10);
    c1.addImage(c3I);
    c1.scale=(0.1);
    //c1.debug=true
    c1.setCollider("rectangle",0,0,200,200)
    
  

    c2=createSprite(650,380,10,10);
    c2.addImage(c2I);
    c2.scale=(0.1);
    //c2.debug=true
    c2.setCollider("rectangle",0,0,200,200)
    

    s1=createSprite(330,180)
    s1.addImage(sI)    
    s1.scale=0.2
    s1.setCollider("circle",0,0,100)
    //s1.debug=true

    s2=createSprite(650,110)
    s2.addImage(sI)    
    s2.scale=0.2
    s2.setCollider("circle",0,0,100)

    s3=createSprite(330,380)
    s3.addImage(sI)    
    s3.scale=0.2
    s3.setCollider("circle",0,0,100)

    s4=createSprite(150,650)
    s4.addImage(sI)    
    s4.scale=0.2
    s4.setCollider("circle",0,0,100)

    s5=createSprite(760,420)
    s5.addImage(sI)    
    s5.scale=0.2
    s5.setCollider("circle",0,0,100)




    foodGroup=createGroup();
    dots();
    sGroup=createGroup();
    borderGroup=createGroup(); 
    cBGroup=createGroup();
}
function draw(){

    background(0);
    console.log(gameState)

    fill("white")
    textSize(50)
    text("Score: "+ score, 100,50);
    drawSprites()
    makeGroup();

    for(var i=0; i<foodGroup.length ;i++){
        if(foodGroup.get(i).isTouching(player) ){
            foodGroup.get(i).destroy();
            score=score+10;
            count=count+1;
            soundI.play()
        }
   }

   
   if(player.x<50 ){
    player.x=1150;
  }
  if(player.x>1150){
      player.x=50
  } 

  movePlayer()

    

   borderGroup.setVisibleEach(false);
    b56.visible=false
    b55.visible=false



   if(c1.isTouching(player) && gameState==="PLAY"){
    
        bg.addImage(gameOverImage)
        
        gameState="END"
        

   }

   if(c2.isTouching(player) && gameState==="PLAY"){
    
    // bg.addImage(gameOverImage)

    
    gameState="END"
    
   }

    if (sGroup.isTouching(player)){
        gameState="ATTACT"
        

        for(var i =0;i<sGroup.length; i++){
            if(sGroup.get(i).isTouching(player)){
                sGroup.get(i).destroy()
                
              
            }
        }
    }
    if (gameState==="END") {
        
    bg.addImage(gameOverImage)
        score = 0;
        player.destroy();
        c1.destroy();
        c2.destroy();
        foodGroup.setVisibleEach(false)
        sGroup.setVisibleEach(false)
        text("Codvid Won",460,500)
        die.play()
    }
    if(score===4290){
        bg.addImage(gameOverImage)
        //gameOver.scale=0.5
       console.log("win")
        gameState= "WIN"
        
        }

    if (gameState==="WIN") {
        
    bg.addImage(gameOverImage)
        score = 0;
        player.destroy();
        c1.destroy();
        c2.destroy();
        foodGroup.setVisibleEach(false)
        sGroup.setVisibleEach(false)
        text("Virus Fighter Won",400,500)
        win.play()
       
    }



   if (gameState==="ATTACT") {
       // a.play()
       counter++;
       sani.play()

       if (player.isTouching(c1)) {
        
        gameState="WIN"
    
        }
       
       if (player.isTouching(c2)) {
        
        gameState="WIN"
    
        }

        
        push()
    
        
        fill("orange")
        ellipse(c1.x,c1.y,35)
        ellipse(c2.x,c2.y,35)
        
        pop()
    
        if(counter===300){
            gameState= "PLAY"
            counter=0
        }
      
       
    }
    
  

}


function movePlayer(){
    
    //soundI.play()

    if(keyDown("w")){
        c1.velocityY=-3;
        c1.velocityX=0;
    }
    if(keyDown("a")){
        c1.velocityX=-3;
        c1.velocityY=0;
        
    }
    if(keyDown("s")){
        c1.velocityX=0;
        c1.velocityY=3;
    }
    if(keyDown("d")){
        c1.velocityX=3;
        c1.velocityY=0;
    }

    if(keyDown("i")){
        c2.velocityY=-3;
        c2.velocityX=0;
    }

    
    if(keyDown("j")){
        c2.velocityX=-3;
        c2.velocityY=0;
        
    }
    if(keyDown("k")){
        c2.velocityX=0;
        c2.velocityY=3;
    }
    if(keyDown("l")){
        c2.velocityX=3;
        c2.velocityY=0;
    }

    if(keyDown(RIGHT_ARROW)){
        player.velocityX=3;
        player.velocityY=0;
    }
    if(keyDown(LEFT_ARROW)){
        
        player.velocityX=-3
        player.velocityY=0
    }
    if(keyDown(UP_ARROW)){
        player.velocityY=-3
        player.velocityX=0
    }
    if(keyDown(DOWN_ARROW)){
        
        player.velocityY=3
        player.velocityX=0
        
    }
    
   
}


function makeGroup(){

    player.bounceOff(borderGroup);
    c1.bounceOff(borderGroup);
    c2.bounceOff(borderGroup);
    c1.bounceOff(cBGroup);
    c2.bounceOff(cBGroup);

    borderGroup.add(b1);
    borderGroup.add(b2);
    borderGroup.add(b3);
    borderGroup.add(b4);
    borderGroup.add(b5);
    borderGroup.add(b6);
    borderGroup.add(b7);
    borderGroup.add(b8);
    borderGroup.add(b9);
    borderGroup.add(b10);
    borderGroup.add(b11);
    borderGroup.add(b12);
    borderGroup.add(b13);
    borderGroup.add(b14);
    borderGroup.add(b15);
    borderGroup.add(b16);
    borderGroup.add(b17);
    borderGroup.add(b18);
    borderGroup.add(b19);
    borderGroup.add(b20);
    borderGroup.add(b21);
    borderGroup.add(b22);
    borderGroup.add(b23);
    borderGroup.add(b24);
    borderGroup.add(b25);
    borderGroup.add(b26);
    borderGroup.add(b27);
    borderGroup.add(b28);
    borderGroup.add(b29);
    borderGroup.add(b30);
    borderGroup.add(b31);
    borderGroup.add(b32);
    borderGroup.add(b33);
    borderGroup.add(b34);
    borderGroup.add(b35);
    borderGroup.add(b36);
    borderGroup.add(b37);
    borderGroup.add(b38);
    borderGroup.add(b39);
    borderGroup.add(b40);
    borderGroup.add(b41);
    borderGroup.add(b42);
    borderGroup.add(b43);
    borderGroup.add(b44);
    borderGroup.add(b45);
    borderGroup.add(b46);
    borderGroup.add(b47);
    borderGroup.add(b48);
    borderGroup.add(b49);
    borderGroup.add(b50);
    borderGroup.add(b51);
    borderGroup.add(b52);
    borderGroup.add(b53);
    borderGroup.add(b54);
    //borderGroup.add(b55);


    sGroup.add(s1)
    sGroup.add(s2)
    sGroup.add(s3)
    sGroup.add(s4)
    sGroup.add(s5)

    cBGroup.add(b56)
    cBGroup.add(b55)
    
    
}


function dots(){
    for(var i=160; i<550 ; i+=20){
        var food1= createSprite(i,105,5,5);
        food1.shapeColor= "gold";
        foodGroup.add(food1);
    }
    for(var i=650; i<1050 ; i+=20){
        var food2= createSprite(i,105,5,5);
        food2.shapeColor= "gold";
        foodGroup.add(food2);
    }
    for(var i=160; i<1050 ; i+=20){
        var food3= createSprite(i,187,5,5);
        food3.shapeColor= "gold";
        foodGroup.add(food3);
    }
    for(var i=150; i<550 ; i+=20){
        var food4= createSprite(i,510,5,5);
        food4.shapeColor= "gold";
        foodGroup.add(food4);
    }
    for(var i=650; i<1050 ; i+=20){
        var food5= createSprite(i,510,5,5);
        food5.shapeColor= "gold";
        foodGroup.add(food5);
    }
    for(var i=160; i<1050 ; i+=20){
        var food6= createSprite(i,705,5,5);
        food6.shapeColor= "gold";
        foodGroup.add(food6);
    }
    for(var i=127; i<620 ; i+=20){
        var  food7= createSprite(335,i,5,5);
        food7.shapeColor= "gold";
        foodGroup.add(food7);
    }
    for(var i=400; i<800 ; i+=20){
        var food8= createSprite(i,580,5,5);
        food8.shapeColor= "gold";
        foodGroup.add(food8);
    }
    for(var i=415; i<800 ; i+=20){
        var food9= createSprite(i,450,5,5);
        food9.shapeColor= "gold";
        foodGroup.add(food9);
    }
    for(var i=127; i<620 ; i+=20){
     var food10= createSprite(870,i,5,5);
        food10.shapeColor= "gold";
        foodGroup.add(food10);
    }
    for(var i=440; i<800 ; i+=20){
        var food11= createSprite(i,315,5,5);
        food11.shapeColor= "gold";
        foodGroup.add(food11);
    }
   
    for(var i=340; i<430 ; i+=20){
        var food12= createSprite(760,i,5,5);
        food12.shapeColor= "gold";
        foodGroup.add(food12);
    }
    for(var i=110; i<250 ; i+=20){
        var food13= createSprite(160,i,5,5);
        food13.shapeColor= "gold";
        foodGroup.add(food13);
    }

    for(var i=110; i<250 ; i+=20){
     var   food14= createSprite(1060,i,5,5);
        food14.shapeColor= "gold";
        foodGroup.add(food14);
    }
    for(var i=150; i<300 ; i+=20){
       var food15= createSprite(i,250,5,5);
        food15.shapeColor= "gold";
        foodGroup.add(food15);
    }
    for(var i=900; i<1050 ; i+=20){
      var  food16= createSprite(i,250,5,5);
        food16.shapeColor= "gold";
        foodGroup.add(food16);
    }
    for(var i=900; i<1050 ; i+=20){
       var food17= createSprite(i,635,5,5);
        food17.shapeColor= "gold";
        foodGroup.add(food17);
    }
    for(var i=150; i<350 ; i+=20){
       var food18= createSprite(i,635,5,5);
        food18.shapeColor= "gold";
        foodGroup.add(food18);
    }
    for(var i=100; i<350 ; i+=20){
       var food19= createSprite(i,380,5,5);
        food19.shapeColor= "gold";
        foodGroup.add(food19);
    }
    for(var i=900; i<1100 ; i+=20){
      var  food20= createSprite(i,380,5,5);
        food20.shapeColor= "gold";
        foodGroup.add(food20);
    }
    for(var i=250; i<300 ; i+=20){
       var food21= createSprite(550,i,5,5);
        food21.shapeColor= "gold";
        foodGroup.add(food21);
    }
    for(var i=625; i<700 ; i+=20){
       var food22= createSprite(550,i,5,5);
        food22.shapeColor= "gold";
        foodGroup.add(food22);
    }
    for(var i=625; i<700 ; i+=20){
       var food23= createSprite(650,i,5,5);
        food23.shapeColor= "gold";
        foodGroup.add(food23);
    }
    for(var i=210; i<260 ; i+=20){
       var food24= createSprite(450,i,5,5);
        food24.shapeColor= "gold";
        foodGroup.add(food24);

    }
    for(var i=210; i<260 ; i+=20){
       var food25= createSprite(750,i,5,5);
        food25.shapeColor= "gold";
        foodGroup.add(food25);
    }
    for(var i=250; i<300 ; i+=20){
       var food26= createSprite(650,i,5,5);
        food26.shapeColor= "gold";
        foodGroup.add(food26);
    }
    for(var i=100; i<200 ; i+=20){
       var food27= createSprite(550,i,5,5);
        food27.shapeColor= "gold";
        foodGroup.add(food27);
    }
    for(var i=100; i<200 ; i+=20){
      var  food28= createSprite(650,i,5,5);
        food28.shapeColor= "gold";
        foodGroup.add(food28);
    }
    for(var i=350; i<450 ; i+=20){
      var  food29= createSprite(i,380,5,5);
        food29.shapeColor= "gold";
        foodGroup.add(food29);
    }
    for(var i=790; i<890 ; i+=20){
        var food30= createSprite(i,380,5,5);
        food30.shapeColor= "gold";
        foodGroup.add(food30);
    }
    for(var i=525; i<600 ; i+=20){
        var food32= createSprite(1050,i,5,5);
        food32.shapeColor= "gold";
        foodGroup.add(food32);
    }
    for(var i=525; i<600 ; i+=20){
        var food33= createSprite(150,i,5,5);
        food33.shapeColor= "gold";
        foodGroup.add(food33);
    }
    for(var i=625; i<700 ; i+=20){
        var food34= createSprite(150,i,5,5);
        food34.shapeColor= "gold";
        foodGroup.add(food34);
    }
    for(var i=625; i<700 ; i+=20){
        var food35= createSprite(1050,i,5,5);
        food35.shapeColor= "gold";
        foodGroup.add(food35);
    }
    for(var i=600; i<660 ; i+=20){
        var food36= createSprite(750,i,5,5);
        food36.shapeColor= "gold";
        foodGroup.add(food36);
    }
    for(var i=600; i<660 ; i+=20){
        var food37= createSprite(450,i,5,5);
        food37.shapeColor= "gold";
        foodGroup.add(food37);
    }
    for(var i=500; i<570 ; i+=20){
        var food38= createSprite(550,i,5,5);
        food38.shapeColor= "gold";
        foodGroup.add(food38);
    }
    for(var i=500; i<570 ; i+=20){
        var food39= createSprite(650,i,5,5);
        food39.shapeColor= "gold";
        foodGroup.add(food39);
    }

    for(var i=330; i<430 ; i+=20){
        var food40= createSprite(450,i,5,5);
        food40.shapeColor= "gold";
        foodGroup.add(food40);
        foodGroup.add(food40);
    }
    

}


function borders(){
    b1=createSprite(600,738,1000,27);;
    b2=createSprite(600,77,1000,10);
    b3=createSprite(120,180,10,200);
    b4=createSprite(1090,180,15,200)
    b5=createSprite(600,100,35,115)
    b6=createSprite(120,600,17,250);
    b7=createSprite(1090,600,20,250)
    b8=createSprite(600,640,35,85)
    b9=createSprite(600,250,30,80)
    b10=createSprite(600,510,35,80)
    b11=createSprite(600,600,250,15)
    b12=createSprite(600,220,250,20)
    b13=createSprite(600,478 ,240,15)
    b14=createSprite(600,420,250,20)
    b15=createSprite(480,380,20,95)
    b16=createSprite(720,380,20,95)
    b17=createSprite(100,410,400,18)
    b18=createSprite(200,280,200,10);
    b19=createSprite(100,345,400,20)
    b20=createSprite(200,479,200,18)
    b21=createSprite(1000,479,200,20)
    b22=createSprite(1100,350,390,15)
    b23=createSprite(1000,280,200,20)
    b24=createSprite(1100,410,390,15)
    b25=createSprite(355,670,310,20);
    b26=createSprite(850,670,310,20)
    b27=createSprite(390,640,35,75)
    b28=createSprite(815,640,35,75)
    b29=createSprite(450,280,125,20)
    b30=createSprite(765,280,145,20)
    b31=createSprite(250,215,105,20)
    b32=createSprite(960,215,105,20)
    b33=createSprite(960,145,100,35)
    b34=createSprite(760,140,125,35)
    b35=createSprite(440,140,135,35)
    b36=createSprite(250,145,100,35)
    b37=createSprite(950,540,95,20)
    b38=createSprite(759,540,140,20)
    b39=createSprite(250,540,100,20)
    b40=createSprite(445,540,140,20)
    b41=createSprite(1050,610,100,20)
    b42=createSprite(150,610,100,20)
    b43=createSprite(920,590,25,60)
    b44=createSprite(285,590,25,60)

    //seee
    b45=createSprite(285,300,25,55)
    b46=createSprite(285,450,15,60)
    b47=createSprite(820,445,35,80)
    b48=createSprite(385,280,40,150)
    b49=createSprite(810,280,40,150)
    b50=createSprite(910,450,15,60)
    b51=createSprite(910,310,15,60)
    b52=createSprite(520,340,70,15)
    
    b53=createSprite(690,340,70,15)
    b54=createSprite(385,445,36,80)
}
    
   