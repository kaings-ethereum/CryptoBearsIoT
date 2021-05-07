
var colors = Object.values(allColors())

var defaultDNA = {
    "headColor" : 11,
    "mouthColor" : 13,
    "eyesColor" : 11,
    "earsColor" : 18,
    //Cattributes
    "eyesShape" : 7,
    "decorationPattern" : 4,
    "decorationMidcolor" : 18,
    "decorationSidescolor" : 18,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyescolor').val(dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    
    $('#decorationstyle').val(dna.decorationPattern)
    decorationMidColorVar([dna.decorationMidcolor],dna.decorationMidcolor)
    $('#decMidColor').val(dna.decorationMidcolor)
    decorationSidesColorVar([dna.decorationSidescolor],dna.decorationSidescolor)
    $('#decSideColor').val(dna.decorationSidescolor)
    animationsPlayer(dna.animation)
    $('#animation').val(dna.animation)  

    $("#eyeShapeGroup").hide();
    $("#decoGroup").hide();
    $('#midDecoGroup').hide();
    $('#sideDecoGroup').hide();
    $("#animGroup").hide();
  
}

//Listeners for Buttons and Sliders!
// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earscolor').change(()=>{
  var colorVal = $('#earscolor').val()
  earsColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

$('#decorationstyle').change(()=>{
  var decostyle = parseInt($('#decorationstyle').val())
  decorationVariation(decostyle)
})

$('#decMidColor').change(()=>{
  var colorVal = $('#decMidColor').val()
  decorationMidColorVar(colors[colorVal],colorVal)
})

$('#decSideColor').change(()=>{
  var colorVal = $('#decSideColor').val()
  decorationSidesColorVar(colors[colorVal],colorVal)
})

$('#animation').change(()=>{
  var anim = parseInt($('#animation').val())
  animationsPlayer(anim)
})

$('#btnColorsTab').click(()=>{
  $("#headGroup").show()
  $("#mouthGroup").show()
  $("#eyesGroup").show()
  $("#earsGroup").show()

  $("#eyeShapeGroup").hide();
  $("#decoGroup").hide();
  $('#midDecoGroup').hide();
  $('#sideDecoGroup').hide();
  $("#animGroup").hide();
})


$('#btnAttributesTab').click(()=>{
  $('#headGroup').hide();
  $('#mouthgroup').hide();
  $('#eyesGroup').hide();
  $('#earsGroup').hide();

  $('#eyeShapeGroup').show();
  $('#decoGroup').show();
  $('#midDecoGroup').show();
  $('#sideDecoGroup').show();
  $("#animGroup").show();
})




//Randomize Function
$('#random').click(()=>{
  var bodycolor = Math.floor(Math.random() * 89) + 10;
  headColor(colors[bodycolor],bodycolor)
  $("#bodycolor").val(bodycolor)
  var mouthcolor = Math.floor(Math.random() * 89) + 10;
  mouthColor(colors[mouthcolor],mouthcolor)
  $("#mouthcolor").val(mouthcolor)
  var eyescolor = Math.floor(Math.random() * 89) + 10;
  eyesColor(colors[eyescolor],eyescolor)
  $("#eyescolor").val(eyescolor)
  var earscolor = Math.floor(Math.random() * 89) + 10;
  earsColor(colors[earscolor],earscolor)
  $("#earscolor").val(earscolor)
  var eyevar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  eyeVariation(eyevar)
  $("#eyeshape").val(eyevar)
  var decovar = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  decorationVariation(decovar)
  $("#decorationstyle").val(decovar)
  var decMidVar = Math.floor(Math.random() * 89) + 10;
  decorationMidColorVar(colors[decMidVar],decMidVar)
  $("#decMidColor").val(decMidVar)
  var decSideVar = Math.floor(Math.random() * 89) + 10;
  decorationSidesColorVar(colors[decSideVar],decSideVar)
  $("#decSideColor").val(decSideVar)
  var anim = Math.floor(Math.random() * (7 - 1 + 1) + 1);
  animationsPlayer(anim)
  $("#animation").val(anim)
})

$('#reset').click(()=>{

  headColor(colors[defaultDNA.headColor],defaultDNA.headColor)
  $("#bodycolor").val(defaultDNA.headColor)
 
  mouthColor(colors[defaultDNA.mouthColor],defaultDNA.mouthColor)
  $("#mouthcolor").val(defaultDNA.mouthColor)
 
  eyesColor(colors[defaultDNA.eyesColor],defaultDNA.eyesColor)
  $("#eyescolor").val(defaultDNA.eyesColor)
  
  earsColor(colors[defaultDNA.earsColor],defaultDNA.earsColor)
  $("#earscolor").val(defaultDNA.earsColor)

  eyeVariation(defaultDNA.eyesShape)
  $("#eyeshape").val(defaultDNA.eyesShape)
  
  decorationVariation(defaultDNA.decorationPattern)
  $("#decorationstyle").val(defaultDNA.decorationPattern)

  decorationMidColorVar(colors[defaultDNA.decorationMidcolor],defaultDNA.decorationMidcolor)
  $("#decMidColor").val(defaultDNA.decorationMidcolor)
  
  decorationSidesColorVar(colors[defaultDNA.decorationSidescolor],defaultDNA.decorationSidescolor)
  $("#decSideColor").val(defaultDNA.decorationSidescolor)

  animationsPlayer(defaultDNA.animation)
  $("#animation").val(defaultDNA.animation)

  
})


