param(
    $nr
)
$all = ""
foreach ($n in $nr)
{
    $o = node sample.js $n
    if ($all -eq "")
    {
        $all = $o;
    }
    else
    {
        $all += ", " + $o;
    }
}
Write-Host $all
Set-Clipboard $all
