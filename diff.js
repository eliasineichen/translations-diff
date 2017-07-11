// Importe
var fs = require('fs');

// Definition (Deklaration, Initialisierung) der globalen Variablen
var masterTranslationFile;
var translationFiles = [];
var generateCSVFiles = false;

// CMD-Befehl nach ungueltigen Parametern ueberpruefen
process.argv.forEach(function (value, index, array) {

    // Erst ab drittem Argument ueberpruefen, da erste zwei Argumente 'node.js' und 'diff.js' sind
    if (index > 1) {

        // Wenn Argument NICHT '.json' oder '--save'
        if (!(value.match(/\.json/) || value === '--save')) {
            // Konsolenausgabe der Fehlermeldung
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
                // Konsolenausgabe der Fehlermeldung
                console.log("Fehler: JSON '" + value + "' konnte nicht geladen werden." + "\n" + "Original error: " + error);
                process.exit();
            }

        }

        // Wenn Argument '--save'
        if (value === '--save') {
            generateCSVFiles = true;
        }

    }

});

// Konsolenausgabe um Zeilenumbruch zu erzwingen
console.log();

// Für jedes translationFile
for (var i = 0; i < translationFiles.length; i++) {

    // Setze Werte
    var translationFile = translationFiles[i].content;
    var fileName = translationFiles[i].name;
    var missingKeys = '';
    var missingCSV = '';

    // Konsolenausgabe des filesName
    console.log('Missing in ' + fileName + ':\n');

    // Für jedes Attribut des masterTranslationFile
    // for (var key in masterTranslationFile) {

    //     // Verschachtelte Objekte vorerst ignorieren
    //     if (typeof (key) !== 'object') {

    //         // Wenn key fehlt
    //         if (!translationFile.hasOwnProperty(key)) {

    //             // Update missingKeys und missingCSV
    //             missingKeys += '- ' + key + '\n';
    //             missingCSV += '"' + key + '","' + masterTranslationFile[key] + '"\n';
    //         }

    //     }

    // }
    parent = '';
    compareJSON(masterTranslationFile, translationFile, '');

    // Konsolenausgabe der fehlenden Werte
    console.log(missingKeys);

    // Wenn CSVFiles generiert werden sollen
    if (generateCSVFiles) {

        // Setze Sprache
        var language = fileName.replace('.json', '');

        // Erstelle CSV-Files
        fs.writeFile(language + '.missing.csv', missingCSV, 'utf-8', function (error) {
            // Konsolenausgabe der Fehlermeldung
            console.log('Fehler: CSV-File konnte nicht erstellt werden.' + '\n' + 'Original error: ' + error);
        })
    }
}

function compareJSON (majorJSON, minorJSON, parent) {
    
    // Setzte Werte
    if (parent) {
        parent += '.' + parent;
    }

    // Für jedes Attribut des majorJSON
    for (var key in majorJSON) {
        if (typeof (majorJSON[key]) === 'object') {
            console.log(parent + '.' + key);
            compareJSON(majorJSON[key], minorJSON[key], key);
        }
    }
}
