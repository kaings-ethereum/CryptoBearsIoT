
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to be modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of head and body
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__tail, .cat__chest_inner').css('background', '#' + color)  //This changes the color of mouth
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor(color,code) {
    $('.cat__eye--left, .cat__eye--right').css('background', '#' + color)  //This changes the color of eyes
    $('#eyescode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
    $('.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-right, .cat__paw-leftLower, .cat__paw-rightLower').css('background', '#' + color)  //This changes the color of eyes
    $('#earscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationMidColorVar(color,code) {
    $('.cat__head-dots').css('background', '#' + color)  //This changes the color of Mid head decoration
    $('#decorationMidCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationSidesColorVar(color,code) {
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)  //This changes the color of Sides head decoration
    $('#decorationSidesCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}






//###################################################
//Functions below will be used later on in the project
//###################################################
//Variation functions
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {

        case 1:
            normalEyes()
            $('#eyename').html('Straight')
            break
        case 2:
            normalEyes()
            $('#eyename').html('Chill')
            eyesType1()
            break
        case 3:
            normalEyes()
            $('#eyename').html('Happy')
            eyesType2()
            break
        case 4:
            normalEyes()
            $('#eyename').html('Right')
            eyesType3()
            break
        case 5:
            normalEyes()
            $('#eyename').html('Left')
            eyesType4()
            break
        case 6:
            normalEyes()
            $('#eyename').html('Sad')
            eyesType5()
            break
        case 7:
            normalEyes()
            $('#eyename').html('Huge')
            setTimeout(eyesType6, 10);
            break


    }

}

function decorationVariation(decostyle) {
    $('#dnadecoration').html(decostyle)
    switch (decostyle) {
        case 1:
            $('#decorationname').html('Deco1')
            normaldecoration()
            break
        case 2:
            normaldecoration()
            $('#decorationname').html('Deco2')
            decostyle1()
            break
        case 3:
            normaldecoration()
            $('#decorationname').html('Deco3')
            decostyle2()
            break
        case 4:
            normaldecoration()
            $('#decorationname').html('Deco4')
            decostyle3()
            break
        case 5:
            normaldecoration()
            $('#decorationname').html('Deco5')
            setTimeout(decostyle4, 10)
            break
        case 6:
            normaldecoration()
            $('#decorationname').html('Deco6')
            setTimeout(decostyle5, 10)
            break
      
        case 7:
            normaldecoration()
            $('#decorationname').html('Deco7')
            setTimeout(decostyle6, 10)
            break
        }

        
}

//AnimationSwitcher
function animationsPlayer(anim) {
    $('#dnaanimation').html(anim)
    switch (anim) {
        case 1:
            $('#animationName').html('Wobbely Head')
            animationType1();
            break
        case 2:
            $('#animationName').html('Side Looking')
            animationType2();
            break
        case 3:
            
            $('#animationName').html('Deco Twist')
            animationType3();
            break
        case 4:
            
            $('#animationName').html('Big Ears')
            animationType4();
            break
        case 5:
            
            $('#animationName').html('Wiggley Tail')
            animationType5();
            break
        case 6:
            
            $('#animationName').html('Whiskers Shake')
            animationType6();
            break
      
        case 7:
            
            $('#animationName').html('Winking')
            animationType7();
            break
        }
}


function animationType1() {
    resetAnimation();
    $("#head").addClass("movingHead");
}

function animationType2() {
   resetAnimation();
   $("#catEyes").addClass("movingEyes");
}

function animationType3() {
    resetAnimation();
    $("#midDot").addClass("midDotSpin");
 }

 function animationType4() {
    resetAnimation();
    $("#catEars").addClass("earScale");
 }

 function animationType5() {
    resetAnimation();
    $("#tail").addClass("tailWig");
 }

 function animationType6() {
    resetAnimation();
    $("#whiskLeft, #whiskRight").addClass("whiskShake");
 }

 function animationType7() {
    resetAnimation();
    $("#pawRIGHT, #pawRIGHTINNER").addClass("sayHello");
 }

function resetAnimation(){
    $("#head").removeClass("movingHead");
    $("#catEyes").removeClass("movingEyes");
    $("#midDot").removeClass("midDotSpin");
    $("#catEars").removeClass("earScale");
    $("#tail").removeClass("tailWig");
    $("#whiskLeft, #whiskRight").removeClass("whiskShake");
    $("#pawRIGHT, #pawRIGHTINNER").removeClass("sayHello");
    
}

//EyeShape functions
async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
    await $('.cat__eye').find('span').css('transform', 'scale(1)')
}

async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '10px solid')
}

async function eyesType2() {
    await $('.cat__eye').find('span').css('border-bottom', '10px solid')
}

async function eyesType3() {
    await $('.cat__eye').find('span').css('border-left', '10px solid')
}

async function eyesType4() {
    await $('.cat__eye').find('span').css('border-right', '10px solid')
}

async function eyesType5() {
    await $('.cat__eye').find('span').css('border-top', '20px solid')
}

async function eyesType6() {
    await $('.cat__eye').find('span').css('transform', 'scale(1.3)')
}

//Deco Style functions
async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
   await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "15% 15% 50% 50%" })
   await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
   await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decostyle1() {
    await $('.cat__head-dots').css({ "top": "6px", "border-radius": "30% 30% 50% 50%"})
    await $('.cat__head-dots_first').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
}

async function decostyle2() {
    await $('.cat__head-dots').css({ "top": "6px", "border-radius": "30% 30% 50% 50%"})
    await $('.cat__head-dots_first').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })

    await $('.cat__head-dots').css({ "transform": "scale(0.3)"})
    await $('.cat__head-dots').css({ "top": "-5"})
  }

  async function decostyle3() {
    await $('.cat__head-dots').css({ "top": "6px", "border-radius": "30% 30% 50% 50%"})
    await $('.cat__head-dots_first').css({ "transform": "rotate(30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(-30deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots').css({ "transform": "rotate(180deg)"})
    await $('.cat__head-dots').css({ "top": "-5"})   
  }

  async function decostyle4() {   
    await $('.cat__head-dots_first').css({"height": "60px", "width": "15px"})
    await $('.cat__head-dots_second').css({"height": "60px", "width": "15px"})   
  }

  async function decostyle5() {   
    await $('.cat__head-dots').css({ "height": "10px", "width": "5px"})
    await $('.cat__head-dots_first').css({"height": "10px", "width": "5px"})
    await $('.cat__head-dots_second').css({"height": "10px", "width": "5px"})   
  }

  async function decostyle6() {   
    await $('.cat__head-dots').css({ "transform": "rotate(33deg)"})
    await $('.cat__head-dots_first').css({"transform": "rotate(33deg)"})
    await $('.cat__head-dots_second').css({"transform": "rotate(33deg)"})   
  }




