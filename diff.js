// Definition (Deklaration, Initialisierung) der globalen Variablen
var masterTranslationFile;
var translationFiles = [];

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

// Argumente auslesen
process.argv.forEach(function (value, index, array) {
    
    // Erst ab drittem Argument ueberpruefen, da erste zwei Argumente 'node.js' und 'diff.js' sind
    if (index > 1) {

        // Wenn Argument '.json'
        if (value.match(/\.json/)) {

            try {
                // Setzt erstes JSON-File als masterTranslationFile, pusht die anderen zu den translationFiles
                if (!masterTranslationFile) {
                    masterTranslationFile = require('./' + value);
                } else {
                    // Erstellt ein neues translationFileObject
                    var tempTranslationFileObject = {
                        "name": value,
                        "content": require('./' + value)
                    }

                    // Pusht es zu den anderen translationFiles
                    translationFiles.push(tempTranslationFileObject);
                }
            } catch (error) {
                console.log("Fehler: JSON '" + value + "' konnte nicht geladen werden." + "\n" + "Original error: " + error);
                process.exit();
            }

        }
            
        // Wenn Argument '--save'
        if(value === '--save') {

        }

    }

});

console.log('master: ', masterTranslationFile);
console.log('others: ', translationFiles);
