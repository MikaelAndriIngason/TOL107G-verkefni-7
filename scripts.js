/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */
const MAX_BEST_OF = 10; //Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0
let wins   = 0;         //Global breyta sem heldur utan um heildar sigra
let losses = 0;         //Global breyta sem heldur utan um heildar töp
let plays  = 0;         //Global breyta sem heldur utan um leiki spilaða

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  // TODO útfæra
}
// console.assert(isValidBestOf(1) === true, '1 er valid best of');
// console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
// console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  // TODO útfæra
}
// console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
// console.assert(playAsText('2') === 'Blað', '2 táknar blað');
// console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
// console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
    if(player == computer)           //Jafntefli
        return 0;

    else if (player == 1){
        if(computer == 2) return 1;  //Notandi vinnur (skæri og blað)
        else              return -1; //Notandi tapar  (skæri og steinn)
    }

    else if (player == 2){
        if(computer == 3) return 1;  //Notandi vinnur (blað og steinn)
        else              return -1; //Notandi tapar  (blað og skæri)
    }

    else if (player == 3){
        if(computer == 1) return 1;  //Notandi vinnur (steinn og skæri)
        else              return -1; //Notandi tapar  (steinn og blað)
    }

    else return -1;
}

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
    let status;

    let playerInput = prompt("Skæri (1), blað (2) eða steinn (3)? (Velja 1, 2 eða 3)");

    if(playerInput == "cancel" || playerInput == null) { //Ef notandinn hættir að spila
        console.log("Þú hefur hætt leikinum");
        return -2;
    }
    if(playerInput < 1 || playerInput > 3)      //Ef tala ógilt þá vinnur talvan
        status = checkGame(0, 1);
    else
        status = checkGame(playerInput, (Math.floor(Math.random() * 3) + 1));
    
    if      (status == -1) console.log("Talva vann!");
    else if (status == 1)  console.log("Þú vannst!");

    return status;
}


/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
*/
function play() {
    let fjoldi = prompt("Hversu marga leiki viltu spila? (Milli 1 og " + MAX_BEST_OF + ")");

    if(fjoldi > MAX_BEST_OF || fjoldi < 1){
        console.error("Villa: Tala er ekki á bili");
        return;
    }

    for(let i = 0; i < fjoldi; i++) {
        let status = 0;
        plays++;

        //Endurtekur umferð ef það er jafntefli
        if (status == 0) {
            while (status == 0)
                status = round();
        }

        if      (status === 1)  wins++;
        else if (status === -1) losses ++;
        else if (status === -2) break;

        if(wins >= Math.round(fjoldi/2)) {
            console.log("Þú vinnur!");
            break;
        }
        else if(losses >= Math.round(fjoldi/2)) {
            console.log("Þú tapar!");
            break;
        }
    }
}


/**
 * Birtir stöðu spilara.
 */
function games() {
    console.log("Þú hefur spilað " + plays + " leiki.");
    if(plays > 0) {
        console.log("Þú hefur unnið " + wins + ", eða " + ((wins/plays) * 100).toFixed(2) + "% af heild.");
        console.log("Þú hefur tapað " + losses + ", eða " + ((losses/plays) * 100).toFixed(2) + "% af heild.");
    }
}