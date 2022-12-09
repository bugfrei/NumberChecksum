param(
    $nr
)
if (-not([bool] $nr)) {
    Write-Host "./nr.ps1 <nummer> eingeben"
    Write-Host "<nummer> kann eine Zahl sein: ./nr.ps1 123"
    Write-Host "Oder mehrere mit Komma getrennt: ./nr.ps1 1, 2, 3"
}
else
{
    $all = ""
    $allArray = @()
    foreach ($n in $nr)
    {
        $o = node umwandeln.js $n
        $allArray += $o;
        if ($all -eq "")
        {
            $all = $o;
        }
        else
        {
            $all += ", " + $o;
        }
    }
    Write-Host "Die Umgewandelte(n) Zahl(en) lauten:"
    $allArray
    Write-Host
    Write-Host "Dies wurde in die Zwischenablage kopiert" -ForegroundColor Red
    Set-Clipboard $all
}

