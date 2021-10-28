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
    if (bestOf % 2 != 0) return true;  //Skilar true ef tala er oddatala
    else                 return false; //False ef tala er slétt
}


/**
 * Skilar texta frá gildum (1-3), t.d. 1 er skæri
 * @return {string} skæri ef 1, blað ef 2, steinn ef 3 og óþekkt ef annað
 */
function playAsText(play) {
    if      (play == 1) return "skæri";
    else if (play == 2) return "blað";
    else if (play == 3) return "steinn";
    else                return "óþekkt";
}


/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
    if (player == computer) return 0;  //Jafntefli

    else if (player == 1) {
        if (computer == 2) return 1;   //Notandi vinnur (skæri og blað)
        else               return -1;  //Notandi tapar  (skæri og steinn)
    }

    else if (player == 2) {
        if (computer == 3) return 1;   //Notandi vinnur (blað og steinn)
        else               return -1;  //Notandi tapar  (blað og skæri)
    }

    else if (player == 3) {
        if (computer == 1) return 1;   //Notandi vinnur (steinn og skæri)
        else               return -1;  //Notandi tapar  (steinn og blað)
    }

    else return -1;                    //Ef notandinn slær inn ógilda tölu þá vinnur talvan
}


/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {
    let status;

    //Talva og notandi velja skæri, blað eða stein
    let playerInput   = prompt("Skæri (1), blað (2) eða steinn (3)? (Veldu 1, 2 eða 3)");
    let computerInput = Math.floor(Math.random() * 3) + 1;

    //Ef notandinn hættir að spila
    if (playerInput == "cancel" || playerInput == null) {
        console.log("Þú hefur hætt leikinum");
        return -2;
    }

    //Ef notandinn slær inn ógilt gildi þá vinnur talvan
    if(playerInput < 1 || playerInput > 3)
        status = checkGame(0, 1);
    //Annars er kannað hver vann
    else 
        status = checkGame(playerInput, computerInput);
    
    //Prentar út hver vann þessa umferð
    if      (status == -1) console.log("Talva vann!");
    else if (status == 1)  console.log("Þú vannst!");
    else if (status == 0)  console.log("Jafntefli! (Umferð endurtekin)");

    //Prentar út hvað notandinn og talvan spilaði sem (skæri, blað, steinn)
    console.log("Þú: " + playAsText(playerInput) + ", talva: " + playAsText(computerInput) + ".\n---");

    return status;
}


/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
*/
function play() {
    let currentwins = 0, currentlosses = 0;

    //Fjöldi umferða
    let fjoldi = prompt("Hversu marga leiki af \"best-of\" viltu spila?\n(Oddatala á milli 1 og " + MAX_BEST_OF + ")");

    //Ef fjöldinn er ekki innan við 1 og MAX
    if (fjoldi > MAX_BEST_OF || fjoldi < 1){
        console.error("Villa: Tala er ekki á bili");
        return;
    }
    //Ef fjöldinn er ekki oddatala
    if (!isValidBestOf(fjoldi)){
        console.error("Villa: Tala er ekki oddatala");
        return;
    }

    //Fer í gegnum allar umferðinar
    for (let i = 0; i < fjoldi; i++) {
        let status = 0;
        plays++;

        //Endurtekur umferð ef það er jafntefli
        if (status == 0) {
            while (status == 0)
                status = round();
        }

        //Ef notandinn vinnur þá er aukið stig þeirra
        if (status === 1) {
            currentwins++;
            wins++;
        }
        //Ef talvan vinnur þá er aukið stig hennar
        else if (status === -1) {
            currentlosses++;
            losses ++;
        }
        //Ef notandinn hættir leiknum þá hættir forritið
        else if (status === -2) 
            break;

        //Ef fjöldi stiga notandans er meira en talvan getur fengið þá vinnur notandinn (best of)
        if (currentwins >= Math.round(fjoldi / 2)) {
            console.log("Leik lokið! Þú vinnur!\nÞú vannst " + currentwins + " af " + fjoldi + " leikjum.");
            break;
        }
        //Ef fjöldi stiga tölvunar er meira en notandinn getur fengið þá vinnur notandinn (best of)
        else if (currentlosses >= Math.round(fjoldi / 2)) {
            console.log("Leik lokið! Talvan vinnur!\nTalvan vann " + currentlosses + " af " + fjoldi + " leikjum.");
            break;
        }
    }
}


/**
 * Birtir stöðu spilara.
 */
function games() {
    //Prentar út fjölda leikja spilaða
    console.log("Þú hefur spilað " + plays + " leiki.");

    //Prentar út niðurstöður af sigrum og töpum
    if (plays > 0) {
        console.log("Þú hefur unnið " + wins   + ", eða " + ((wins/plays) * 100).toFixed(2)   + "% af heild.");
        console.log("Þú hefur tapað " + losses + ", eða " + ((losses/plays) * 100).toFixed(2) + "% af heild.");
    }
}