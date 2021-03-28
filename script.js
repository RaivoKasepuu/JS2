(function () {
    "use strict";

    /*
    Ülesanne 6

Kasutage need samad index.html, style.css ja script.js failid, mida kasutasite tööjuhendi läbimisel.

Teie ülesandeks on täiendada neid järgnevalt:
hetkel loodud kell on 24 tunni kell. Muutke see 12 tunni kellaks (https://et.wikipedia.org/wiki/Kellaaeg);

lisage interaktiivsust Tarne hind nupule: nupul vajutamisel peaks kasutaja mugaval vormil teada saama, palju tal tuleb
tarne eest maksta (valikute hinnad on koodis kommentaaridena kirjas);

täiendage olemasolev vorm raadionuppudega (radiobutton), mille sisu valige ise (aga olgu ikkagi kuidagi seotud tarnega),
ja kujundage see style.css failis (css-faili uue osa juurde lisage kommentaar siin on minu looming);

lisage vormile sisendi kontroll: tekstiväljad ei tohi olla tühjad, ei tohi sisaldada numbreid, üks raadionuppudest peab
olema valitud (vastasel juhul visatakse ette alert aken) jne.;

lisage kaardile mõni teine aadress (mis EI asu Tartus; oluline on kasutada turvalist protokolli ehk https://..), lisage
sellele marker ja muutke kaardi keskpunkt ja suum nii, et mõlemad kohad oleksid kaardil vaikimisi nähtavad;

uurige API dokumentatsioon ja lisage kaardile infobox'id, mis ilmuvad markerile vajutades.

Lisaülesanne: võrreldes meie kella https://time.is/ kellaga näeme, et meie oma on tegelikult 1 sekund taga. Seda
põhjustab setInterval: meetodil kulub 1 sekund, et aega uuendada. Leidke viis õige aja näitamiseks. Andmaks märku, et
olete lisaülesandega hakkama saanud, muutke kella värv punaseks!

Laadige oma projekt GitHub Pages'i ja Moodle'sse Ülesande 6 kaudu esitage link tööle.
     */


    //clock


    /*

    hetkel loodud kell on 24 tunni kell. Muutke see 12 tunni kellaks (https://et.wikipedia.org/wiki/Kellaaeg);

    Lisaülesanne: võrreldes meie kella https://time.is/ kellaga näeme, et meie oma on tegelikult 1 sekund taga. Seda
põhjustab setInterval: meetodil kulub 1 sekund, et aega uuendada. Leidke viis õige aja näitamiseks. Andmaks märku, et
olete lisaülesandega hakkama saanud, muutke kella värv punaseks!
     */

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let dateold = new Date();

            let date = new Date(dateold.getFullYear(), dateold.getMonth(), dateold.getDay(), dateold.getHours(),
                dateold.getMinutes(), dateold.getSeconds() + 1);
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let h2;
            let noon;

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            if (h >= 12) {
                noon = "PL";
            } else {
                noon = "EL";
            }

            if (h < 13) {
                h2 = h;
            } else {
                h2 = h - 12;
            }

            c.innerHTML = h2 + ":" + m + ":" + s + " " + noon;

        };

    });

    // forms

    /*
lisage interaktiivsust Tarne hind nupule: nupul vajutamisel peaks kasutaja mugaval vormil teada saama, palju tal tuleb
tarne eest maksta (valikute hinnad on koodis kommentaaridena kirjas);

täiendage olemasolev vorm raadionuppudega (radiobutton), mille sisu valige ise (aga olgu ikkagi kuidagi seotud tarnega),
ja kujundage see style.css failis (css-faili uue osa juurde lisage kommentaar siin on minu looming);

lisage vormile sisendi kontroll: tekstiväljad ei tohi olla tühjad, ei tohi sisaldada numbreid, üks raadionuppudest peab
olema valitud (vastasel juhul visatakse ette alert aken) jne.;
     */

    function priceCalculation() {

        let linn = document.getElementById("linn").value;
        let v1 = document.getElementById("v1");
        let v2 = document.getElementById("v2");
        let hind = document.getElementById("delivery");
        let linnaSumma = 0;
        if (linn === "tln") {
            linnaSumma += 0;

        } else if (linn === "trt") {
            linnaSumma += 2.5;

        } else if (linn === "nrv") {
            linnaSumma += 2.5;

        } else if (linn === "prn") {
            linnaSumma += 3.0;

        }

        if (v1.checked == true) {
            linnaSumma += 5.0;

        } else {
            linnaSumma += 0.0;
        }

        if (v2.checked == true) {
            linnaSumma += 1.0;
        } else {
            linnaSumma += 0.0;
        }

        hind.innerText = linnaSumma + " €";
        return;


    }


    document.getElementById("linn").addEventListener("change", priceCalculation);
    document.getElementById("v1").addEventListener("change", priceCalculation);
    document.getElementById("v2").addEventListener("change", priceCalculation);

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {

        event.preventDefault();

        let linn = document.getElementById("linn");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
        }
        let perenimi = document.getElementById("lname");
        if (perenimi.value === "") {
            alert("Palun sisestage perekonnanimi");

        }
        let eesnimi = document.getElementById("fname");
        if (eesnimi.value === "") {
            alert("Palun vsisestage eesnimi");

        }



        console.log("Tarne hind on arvutatud");
    }
}());

// map


/*
lisage kaardile mõni teine aadress (mis EI asu Tartus; oluline on kasutada turvalist protokolli ehk https://..), lisage
sellele marker ja muutke kaardi keskpunkt ja suum nii, et mõlemad kohad oleksid kaardil vaikimisi nähtavad;

uurige API dokumentatsioon ja lisage kaardile infobox'id, mis ilmuvad markerile vajutades.

 */

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";
let raivoAPIkey = "AmGxyuksfuaJAf4zuJoGdKVrkwYXlpladqesGAl1K31_cAP3DA_k8uXJzS0UAHWh"

let map;

function GetMap() {

    "use strict";

    let deltaPoint = new Microsoft.Maps.Location(
        58.38526,
        26.72584
    );

    let raivoPoint = new Microsoft.Maps.Location(
        59.3658712,
        24.9175993
    );

    let centerPoint = new Microsoft.Maps.Location(
        (deltaPoint.latitude + raivoPoint.latitude) / 2, (deltaPoint.longitude + deltaPoint.longitude) / 2
    );


    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(deltaPoint, {
        title: "Delta maja",
        enableHoverStyle: true

    });


    let pushpin2 = new Microsoft.Maps.Pushpin(raivoPoint, {
        title: 'Minu kodu',
        enableHoverStyle: true,
        onclick: showDetails(raivoPoint)

    });


    var infobox = new Microsoft.Maps.Infobox(centerPoint, { title: 'Map Center', description: 'Kusagil Eestis' });
    infobox.setMap(map);
    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function (args) {
        myInfobox.setOptions({
            location: args.target.getLocation(),
            title: args.target.metadata.title,
            description: args.target.metadata.description,
            visible: true
        });
    });


    function showDetails(id) {
       alert("Raivo kodu on siin: " + id);
    }


}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

