// Definition (Deklaration, Initialisierung) der globalen Variablen
// ...

// CMD-Befehl nach ungueltigen Parametern ueberpruefen
process.argv.forEach(function (value, index, array) {
    
    // Erst ab drittem Argument ueberpruefen, da erste zwei Argumente 'node.js' und 'diff.js' sind
    if (index > 1) {

        // Wenn Argument NICHT '.json' oder '--save'
        if (!(value.match(/\.json/) || value === '--save')){
            console.log("Argument '" + value + "' ungueltig!");
            process.exit();
        }

    }

});

