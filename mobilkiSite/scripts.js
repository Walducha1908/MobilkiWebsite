"use strict"

/* ===================== our variables ===================== */
let scoreJson;
let scoreList = [];
let downloadCounter;
let downloadCounterJSON = window.localStorage.getItem("downloads");
    if (downloadCounter == null)
        downloadCounter = JSON.parse(downloadCounterJSON);
    else
        downloadCounter = 0;

let getJsonData = function () {
    $.ajax({
        url: 'https://api.myjson.com/bins/137f1w',
        type: 'GET',
        success: (data) => {
            scoreJson = data;
            scoreList = data.scoreEntries;
            updateScoreLine();
            console.log("jest git");
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

let updateScoreLine = function () {
    let bestScoreDiv = document.getElementById("bestScoreDiv");

    //remove all elements
    while (bestScoreDiv.firstChild) {
        bestScoreDiv.removeChild(bestScoreDiv.firstChild);
    }

    //create table
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered");
    table.classList.add("table", "table-striped");
    table.classList.add("text", "text-center");

    //set first row of a column
    let firstRow = document.createElement("tr");

    let firstRowName = document.createElement("td");
    let firstRowNameText = document.createTextNode("Miejsce");
    firstRowName.appendChild(firstRowNameText);
    firstRow.appendChild(firstRowName);

    let firstRowDesc = document.createElement("td");
    let firstRowDescText = document.createTextNode("Wynik");
    firstRowDesc.appendChild(firstRowDescText);
    firstRow.appendChild(firstRowDesc);

    let firstRowPlace = document.createElement("td");
    let firstRowPlaceText = document.createTextNode("Nazwa użytkownika");
    firstRowPlace.appendChild(firstRowPlaceText);
    firstRow.appendChild(firstRowPlace);

    table.appendChild(firstRow);

    let place = 1;

    //displaying download counter
    let downloadDisplay = document.getElementById("DC");
    let newContentName = document.createTextNode("Ilość pobrań gierki: " + downloadCounter);
    downloadDisplay.appendChild(newContentName);

    const sortedScore = Array.from(scoreList).sort(compare);

    for (let scoreEntries in sortedScore) {
        if (place < 11) {
            let newElement = document.createElement("tr");

            //add place table cell
            let newTableCellName = document.createElement("td");
            let newContentName = document.createTextNode(place);
            newTableCellName.appendChild(newContentName);
            newElement.appendChild(newTableCellName);

            //add score table cell
            let newTableCellDesc = document.createElement("td");
            let newContentDesc = document.createTextNode(Math.round(sortedScore[scoreEntries].score*10)/10);
            newTableCellDesc.appendChild(newContentDesc);
            newElement.appendChild(newTableCellDesc);

            //add nickname table cell
            let newTableCellPlace = document.createElement("td");
            let newContentPlace = document.createTextNode(sortedScore[scoreEntries].playerName);
            newTableCellPlace.appendChild(newContentPlace);
            newElement.appendChild(newTableCellPlace);

            table.appendChild(newElement);
            place++;
        }
    }

    bestScoreDiv.appendChild(table);
}

function compare (a, b) {
    return b.score - a.score; 
 }

let countDownload = function() {
    downloadCounter++;
    window.localStorage.setItem("downloads", JSON.stringify(downloadCounter));
}

getJsonData();
