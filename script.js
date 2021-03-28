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

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        let linn = document.getElementById("linn");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;
        } else {
            e.innerHTML = "x,xx &euro;";
        }
        console.log("Tarne hind on arvutatud");
    }
})();

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
    let lat1 = deltaPoint.latitude;
    let lat2 = raivoPoint.latitude;
    let long1 = deltaPoint.longitude;
    let long2 = raivoPoint.longitude;
    let centerlat = (lat1 + lat2) / 2;
    let centerlong = (long1 + long2) / 2;

    let centerPoint = new Microsoft.Maps.Location(
        centerlat, centerlong
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(deltaPoint, {
        title: 'Delta maja',

    });


    let pushpin2 = new Microsoft.Maps.Pushpin(raivoPoint, {
        title: 'Minu kodu',

    });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

