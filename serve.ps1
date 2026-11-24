# SOULPRINT local preview server.
# No Node.js or Python required. Double-click start-soulprint.bat.
$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath($PSScriptRoot)
if (-not $root.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
  $root += [System.IO.Path]::DirectorySeparatorChar
}
$port = 5173
if ($args.Count -gt 0) { $port = [int]$args[0] }

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'text/javascript; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
}

function Read-HttpLine([System.Net.Sockets.NetworkStream]$stream) {
  $bytes = New-Object System.Collections.Generic.List[byte]
  while ($true) {
    $b = $stream.ReadByte()
    if ($b -lt 0) { break }
    if ($b -eq 10) { break }
    if ($b -ne 13) { [void]$bytes.Add([byte]$b) }
  }
  return [System.Text.Encoding]::ASCII.GetString($bytes.ToArray())
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()
Write-Host "SOULPRINT is running at http://127.0.0.1:$port/"
Write-Host "Keep this window open. Press Ctrl+C to stop."

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $stream.ReadTimeout = 8000
    $requestLine = Read-HttpLine $stream
    while ($true) {
      $headerLine = Read-HttpLine $stream
      if ([string]::IsNullOrEmpty($headerLine)) { break }
    }

    $urlPath = '/'
    if ($requestLine -match '^(GET|HEAD)\s+(\S+)') {
      $urlPath = $Matches[2]
    }
    $urlPath = [System.Uri]::UnescapeDataString(($urlPath -split '\?')[0])
    if ($urlPath -eq '/' -or $urlPath -eq '') { $urlPath = '/index.html' }

    $relative = $urlPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
    $full = [System.IO.Path]::GetFullPath((Join-Path $root $relative))
    $status = 200
    $type = 'text/plain; charset=utf-8'
    $body = [byte[]]@()

    if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
      $status = 403
      $body = [System.Text.Encoding]::UTF8.GetBytes('Forbidden')
    } elseif (Test-Path -LiteralPath $full -PathType Leaf) {
      $body = [System.IO.File]::ReadAllBytes($full)
      $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
      if ($mime.ContainsKey($ext)) { $type = $mime[$ext] } else { $type = 'application/octet-stream' }
    } else {
      $status = 404
      $body = [System.Text.Encoding]::UTF8.GetBytes('Not found')
    }

    $reason = switch ($status) { 200 { 'OK' } 403 { 'Forbidden' } default { 'Not Found' } }
    $head = "HTTP/1.1 $status $reason`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nConnection: close`r`nCache-Control: no-cache`r`n`r`n"
    $headBytes = [System.Text.Encoding]::ASCII.GetBytes($head)
    $stream.Write($headBytes, 0, $headBytes.Length)
    if ($body.Length -gt 0 -and $requestLine -notmatch '^HEAD') {
      $stream.Write($body, 0, $body.Length)
    }
  } catch {
    # A closed browser tab can interrupt a read. Keep serving.
  } finally {
    $client.Close()
  }
}
