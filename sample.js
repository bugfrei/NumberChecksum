function CalcChecksum(number, inclChecksum)
{
    var numberString = number.toString();

    var checksum = 0;
    var minus = inclChecksum ? 1 : 1;
    var mal2 = inclChecksum ? false : true;
    for (var i = numberString.length - minus; i >= 0; i--)
    {
        // console.log("Index: " + i.toString() + " = " + numberString[i]);
        var ziffer = numberString[i];
        checksum += parseInt(Quersumme(mal2 ? ziffer * 2 : ziffer));
        mal2 = !mal2;
    }

    // Modulo 10 verwenden, nicht so nachvollziebar
    checksum = 10 - (checksum % 10);

    /* Quersummen verwenden: nachvollziebarere Prüfziffer :-()
    checksum = checksum.toString();
    while (checksum.length > 1)
    {
        checksum = Quersumme(checksum).toString();
    }
    */

    return checksum % 10;
}


function NumberToID(number)
{
    var numberString = number.toString();
    if (numberString.length < 4)
    {
        // numberString = "5401" + numberString;
    }
    return parseInt(number.toString() + (CalcChecksum(numberString, false)).toString());
}

function VerifyID(id)
{
    var idString = id.toString();
    return CalcChecksum(idString, true) % 10 == 0;
}

function IDToNumber(id)
{
    var idString = id.toString();
    return parseInt(idString.substring(0, idString.length - 1));
}


function Quersumme(zahl)
{
    var asString = zahl.toString();
    return [...asString].reduce((a, b) => Number(a) + Number(b));
}

// Beispiel: node sample.js 55
var nr = 1;
if (process.argv[2] && !isNaN(process.argv[2]))
{
    nr = Number(process.argv[2]);
    //console.log(`Die Nummer: ${nr} entspricht der ID: ${NumberToID(nr)}`);
    console.log(NumberToID(nr));

}
else
{
    // Aus einer Zahl eine prüfbare Zahl zu machen:
    var number = 1505;
    var verifyableNumber = NumberToID(number);
    console.log("Zahl            : " + number.toString());
    console.log("Prüfbare Zahl   : " + verifyableNumber.toString());
    console.log();

    // Diese prüfbare Zahl prüfen:
    console.log("Zahl prüfen     : " + verifyableNumber.toString());
    if (VerifyID(verifyableNumber))
    {
        console.log("Eingegebe Zahl ist gültig.");
    }
    else
    {
        console.error("Eingegebe Zahl ist ungültig.");
    }
    console.log();

    var wrongID = 15507;
    console.log("Zahl prüfen     : " + wrongID.toString());
    if (VerifyID(verifyableNumber))
        if (VerifyID(wrongID))
        {
            console.log("Eingegebe Zahl ist gültig.");
        }
        else
        {
            console.error("Eingegebe Zahl ist ungültig.");
        }
    console.log();

    // und aus der prüfbaren Zahl wieder die eigentliche Zahl zu machen
    var number2 = IDToNumber(verifyableNumber);
    console.log("Eigentliche Zahl: " + number2.toString());
}

