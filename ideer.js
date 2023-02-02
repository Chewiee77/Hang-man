// Globala variabler
var wordlist;//Array med ett antal ord där man sedan väljer ett slumpmässigt
var selectedWord;//De ord som valts slumpmässigt och som anändaren ska gissa på.
var letterBoxes;//Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet.
var hangmanImg;//Referens till img-elemtet med bilden för galgen och gubben.
var hangmanImgNr;//Nummer för aktuell bild (0-6), för den bildfil som visas (så man sedan kan veta vilken som blir nästa bild).
var msgElem;//Referens till div-elemntet för meddelanden.
var startGameBtn;//referens till startknappen
var letterButtons;//array med referenser till bokstavsknapparna

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	
var i;//variabel för en loop

startGameBtn = document.getElementById("startGameBtn");
document.getElementById("startGameBtn").onclick = startGame;

letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
for (i=0; i < letterButtons.length; i++) letterButtons[i].onclick = guessLetter;
	                                                               //
hangmanImg = document.getElementById("hangman");
msgElem = document.getElementById("message");
	
	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];

changeButtonActivation(true);
	
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad


//Initiera ett nytt spel. Välj ord, visa bokstavsrutor,
//visa första bilden (tom bild) och sätt bildnummer till 0
function startGame() {

randomWord();
showLetterBoxes();
hangmanImg = "pics/h0.png";
hangmanImgNr = 0;

changeButtonActivation(false);
msgEelem = "";
	
}//End startGame


//Tar fram ett slumptal medllan 0 och antal ord i en lista av ord.
//Indexerar listan med slumptalet och sparar valt ord i en global variabel
function randomWord() {
  
var wordIndex;

wordIndex = Math.floor(wordList.length*Math.random()); 

selectedWord = wordList[wordIndex];

	
}//End randomWord


//Går igenom valt ord och skapar en kod med ett span-elemnt för varje bokstav.
//Lägger in koden i elementet med id "letterBoxes".
function showLetterBoxes() {
	
var newCode;
var i;

newCode= "";

for (i = 0; i <selectedWord.length; i++) {
	
	newCode += "<span>&nbsp;</span>";
	}
 
 document.getElementById("letterBoxes").innerHTML = newCode;
 
 letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");
 


    
}//End showLetterBoxes


//Avläser vald bokstav ur button-elementets value attribut.
//Går igenom alla bosktäver och kontrollera om vald boskatv finns,
//utför sedan olika åtgärder beroende på om bokstaven finns eller ej.
function guessLetter() {
this.disabled = true;

var letter;//bokstaven för knappen
var i;//loopvariabel
var letterFound;//flagga (true/false) för att avgöra om man hittar bokstaven i ordet
var correctLettersCount;//räknare, för att se hur många korrekta bokstäver som hittats

letter = this.value;

letterFound = false;

correctLettersCount = 0;


for (i = 0; i <selectedWord.length; i++) {
	 
	 if (letter == selectedWord.charAt(i)) {
       letterFound= true;
	   
	   letterBoxes[i].innerHTML = letter;
     }
	 
	 
	 if (letterBoxes[i].innerHTML != "&nbsp;") {
       
	   correctLettersCount++;
     }
	 
}
	 if (letterFound == false) {
     
	 hangmanImgNr++;
	  
	 hangmanImg= "pics/h" + hangmanImgNr + ".png";
	    document.getElementById("hangman").src=hangmanImg;
     if (hangmanImgNr == 6) {
        endGame(true);
     }
	 
	 }
	 
	else if (correctLettersCount == selectedWord.length) {
        endGame(false);
    }

}//End guessLetter


//Avgör hur spelet slutar, skriver ut meddelande beroende på hur spelet slutar
function endGame(manHanged) {
	
	if (manHanged == true) {
      msgElem.innerHTML = "Gubben hängdes, rätt ord är: " + selectedWord;
		
    }else  { msgElem.innerHTML = "Grattis, du klarade hela ordet! ";
        
    }
	
	changeButtonActivation(true);
    
}//End endGame





//Funktion för att aktivera och avaktivera knappar

function changeButtonActivation(status) {
    
	
	if (status == true) {
       
	   startGameBtn.disabled= false;
	   
	   for (i = 0; i <letterButtons.length; i++) {
   	  letterButtons[i].disabled= true;
	
	}
	   
    } else {startGameBtn.disabled= true;}
	   for (i = 0; i <letterButtons.length; i++) {
   	  letterButtons[i].disabled= false;
	   }
}
