var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var mktPlaceAddress = "0x2F7e1754aB78B574cC1fAfb4c93556fa6e90F194";
var tokenAddress = "0x3F0431B4D908339285A421FEEcEBbeA8601bB022";

        
$(document).ready(function(){
    window.ethereum.enable().then(function(accounts) {
        mktplace = new web3.eth.Contract(abimkt, mktPlaceAddress, {from: accounts[0]});
        user = accounts[0];
       // console.log(mktplace);
        token = new web3.eth.Contract(abi, tokenAddress, {from: accounts[0]});
       // console.log(token);
        printOrders();
 
    })

}) //End document.ready

async function printOrders(){
  var offerId;
  var item;
  let items = [];
  let currentUser = ethereum.selectedAddress;
  var tokensOnSaleIds = [];
  var bearsCount = await token.methods.getBearsLength().call();
  var tokensOnSaleCount = await mktplace.methods.getAllTokenOnSale().call();
 console.log(tokensOnSaleCount.length);
  //console.log("BEARS COUNT: " + bearsCount);

  for(let i = 0; i <= tokensOnSaleCount.length; i++){
      offerId = await mktplace.methods.getOffer(i).call();
      console.log(offerId);
      let isOnSale = offerId.active;
      if(isOnSale){
          tokensOnSaleIds.push(offerId.tokenId);
      }   
      
  }

  for(let i = 0; i < tokensOnSaleIds.length; i++){
      let bearId = tokensOnSaleIds[i];
    //console.log("Current Bear Id: " + bearId);
     let object = await token.methods.getBear(tokensOnSaleIds[i]).call();
     let bearGenes = object.genes;
    //console.log("Current Genes: " + bearGenes);
     let bearBirthday = object.birthTime;
    // console.log("Current Birthday: " + new Date(bearBirthday * 1000));
     let bearMumId = object.mumId;
    // console.log("Current MumId: " + bearMumId);
     let bearDadId = object.dadId;
    // console.log("Current DadId: " + bearDadId);
     let bearGeneration = object.generation;
    // console.log("Current Generation: " + bearGeneration);
      
     createBearBox(bearId, bearGenes);

  }        

  function createBearBox(id, bearDetails){

      let bodyDna = bearDetails.substring(0, 2);
    //  console.log("BODYDNA" + bodyDna);
      let mouthDna = bearDetails.substring(2, 4);
    //  console.log("MOUTHDNA: " + mouthDna);
      let eyesDna = bearDetails.substring(4, 6);
    //  console.log("EYESDNA: " + eyesDna);
      let earsDna = bearDetails.substring(6, 8);
    //  console.log("EARSDNA: " + earsDna);
      let eyeShape = bearDetails.substring(8, 9);
    //  console.log("EYESHAPE: " + eyeShape);
      let decoShape = bearDetails.substring(9, 10);
    //  console.log("DECOSHAPE: " + decoShape);
      let decoMidColor = bearDetails.substring(10, 12);
    //  console.log("DECOMIDCOLOR: " + decoMidColor);
      let decoSideColor = bearDetails.substring(12, 14);
    //  console.log("DECOSIDECOLOR: " + decoSideColor);
      let animDna = bearDetails.substring(14, 15);
    //  console.log("ANIMDNA: " + animDna);
      let lastDna = bearDetails.substring(15, 16);
    //  console.log("LASTDNA: " + lastDna);
      
   // console.log("BODYCOLOR: " + colors[earsDna]);

      
     item = `<div class="col-lg-4 catBox m-3 light-b-shadow" id="box` + id + `">
                  <div class="cat" id="cat` + id + `"> 
                      <div id="catEars` + id + `" class="` + (animDna == 4 ? 'cat__ear earScale' : 'cat__ear') + `">
                          <div id="leftEar` + id + `" class="cat__ear--left" style="background:#` + colors[earsDna] + `">
                          <div class="cat__ear--left-inside"></div>
                          </div>
                          <div id="rightEar` + id + `" class="cat__ear--right" style="background:#` + colors[earsDna] + `">
                          <div class="cat__ear--right-inside"></div>
                          </div>
                      </div>
                      <div id="head` + id + `" class="` + (animDna == 1 ? 'cat__head movingHead' : 'cat__head') + `" style="background:#` + colors[bodyDna] + `">
                          <div id="midDot` + id + `" class="` + (animDna == 3 ? 'cat__head-dots midDotSpin' : 'cat__head-dots') + ` " style="background:#` + colors[decoMidColor] + `">
                          <div id="leftDot` + id + `" class="cat__head-dots_first" style="background:#` + colors[decoSideColor] + `">
                      </div>
                      <div id="rightDot` + id + `" class="cat__head-dots_second" style="background:#` + colors[decoSideColor] + `">
                      </div>
                      </div>
                      <div id="catEyes` + id + `" class="` + (animDna == 2 ? 'cat__eye movingEyes' : 'cat__eye') + `" >
                          <div class="cat__eye--left"><span class="pupil-left"></span></div>
                          <div class="cat__eye--right"><span class="pupil-right"></span></div>
                      </div>
                          <div class="cat__nose"></div>
                          <div class="cat__mouth-contour" style="background:#` + colors[mouthDna] + `"></div>
                          <div class="cat__mouth-left"></div>
                          <div class="cat__mouth-right"></div>
                          <div id="whiskLeft` + id + `" class="` + (animDna == 6 ? 'cat__whiskers-left whiskShake' : 'cat__whiskers-left') +`"></div>
                          <div id="whiskRight` + id + `" class="` + (animDna == 6 ? 'cat__whiskers-right whiskShake' : 'cat__whiskers-right') +`"></div>
                      </div>
                      <div class="cat__body">
                          <div class="cat__chest" style="background:#` + colors[bodyDna] + `"></div>
                              <div class="cat__chest_inner" style="background:#` + colors[mouthDna] + `"></div>
                          <div class="cat__paw-left" style="background:#` + colors[earsDna] + `"></div>
                              <div class="cat__paw-left_inner"></div>
                          <div id="pawRIGHT` + id + `" class="` + (animDna == 7 ? 'cat__paw-right sayHello' : 'cat__paw-right') + `" style="background:#` + colors[earsDna] + `"></div>
                              <div id="pawRIGHTINNER` + id + `" class="` + (animDna == 7 ? 'cat__paw-right_inner sayHello' : 'cat__paw-right_inner') + `"></div>
                          <div class="cat__paw-leftLower" style="background:#` + colors[earsDna] + `"></div>
                              <div class="cat__paw-leftLower_inner"></div> 
                          <div class="cat__paw-rightLower" style="background:#` + colors[earsDna] + `"></div>
                              <div class="cat__paw-rightLower_inner"></div>
                          <div id="tail` + id + `" class="` + (animDna == 5 ? 'cat__tail tailWig' : 'cat__tail') + `" style="background:#` + colors[mouthDna] + `"></div>
                          </div>
                          </div> 
                          <br>

                          <div class="dnaDiv" id="catDNA` + id + `">
                          <b>DNA:<!-- Colors -->
                          <span id="dnabody` + id + `">` + bearDetails + `</span>
                          <span id="dnamouth` + id + `"></span>
                          <span id="dnaeyes` + id + `"></span>
                          <span id="dnaears` + id + `"></span>
                          
                          <!-- Cattributes -->
                          <span id="dnashape` + id + `"></span>
                          <span id="dnadecoration` + id + `"></span>
                          <span id="dnadecorationMid` + id + `"></span>
                          <span id="dnadecorationSides` + id + `"></span>
                          <span id="dnaanimation` + id + `"></span>
                          <span id="dnaspecial` + id + `"></span>
                          </b>
                          <br>
                          <button class="btn btn-dark" id="sell ` + id +`" onclick="removeFromSale(`+ id +`)">Remove Bear from Sale</button>
                          <button class="btn btn-dark" id="sell ` + id +`" onclick="buyBear(`+ id +`)">Buy This Bear</button>
                          </div>
                          
                          </div>`;
                          

                          items.push(item);
  }
  $(".orderbook").append(items.join());

  }

async function buyBear(id){
  let user = web3.currentProvider.selectedAddress;
  let isApproved = await token.methods.isApprovedForAll(user, mktPlaceAddress).call();
  let offer = await mktplace.methods.getOffer(id).call();
  let price = offer.price;

  if (isApproved == false){
    alert("The CryptoBears DApp is not approved yet to handle your tokens! Please give approval!");
    await token.methods.setApprovalForAll(mktPlaceAddress, true).send().on('receipt', function(receipt){
      console.log("TXDONE");
    });
    alert("Approval Set!");
    isApproved = await token.methods.isApprovedForAll(user, mktPlaceAddress).call();
    console.log("is now approved: " + isApproved);   
  }else{
    await mktplace.methods.buyBear(id).send({value: price});
  }

}

// async function removeBearFromSale(id){
//   let user = web3.currentProvider.selectedAddress;
//   let isApproved = await token.methods.isApprovedForAll(user, mktPlaceAddress).call();
//   let offer = await mktplace.methods.getOffer(id).call();
//   let price = offer.price;

// }



