# Minimal static file server for the site QA run (PowerShell HttpListener)
$prefix = 'http://127.0.0.1:8710/'
$root = 'C:\Users\Admin\Documents\Codex\cookiecrumbs\site'
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8';
  '.js'='text/javascript; charset=utf-8'; '.png'='image/png'; '.txt'='text/plain; charset=utf-8';
  '.ico'='image/x-icon' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
} catch [System.Net.HttpListenerException] {
  # Port already in use — another instance is serving; exit quietly.
  exit 0
}
while ($listener.IsListening) {
  try {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.AbsolutePath.TrimStart('/')
    if ($path -eq '') { $path = 'index.html' }
    $file = Join-Path $root $path
    if (Test-Path $file) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
      $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $body = [System.Text.Encoding]::UTF8.GetBytes('Not found')
      $ctx.Response.OutputStream.Write($body, 0, $body.Length)
    }
    $ctx.Response.OutputStream.Close()
  } catch { }
}
