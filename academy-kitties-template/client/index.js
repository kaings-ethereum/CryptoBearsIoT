var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var contractAddress = "0x3F0431B4D908339285A421FEEcEBbeA8601bB022";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        user = accounts[0];

        console.log(instance);

        
    })
})

async function createNewBear(){
    var dnaString = getDna();
    console.log(dnaString);
    await instance.methods.createBearGen0(dnaString).send({}, function(error, txHash){
        if (error){
            console.log(error);
        }
        else{
            console.log(txHash);
            instance.events.Birth().on('data', function(event){
                    console.log(event);
                    let owner = event.returnValues.owner;
                    console.log(owner);
                    let bearId = event.returnValues.bearId;
                    console.log(bearId);
                    let mumId = event.returnValues.mumId;
                    console.log(mumId);
                    let dadId = event.returnValues.dadId;
                    console.log(dadId);
                    let genes = event.returnValues.genes;
                    console.log(genes);

                    $("#bearCreated").css("display", "block");
                    $("#bearCreated").text("Bear Id: " + bearId +
                                           " Owner: " + owner + 
                                           " MumId: " + mumId + 
                                           " DadId: " + dadId +
                                           " Genes: " + genes );
            }).on('error', console.error);
        }
    })


}

