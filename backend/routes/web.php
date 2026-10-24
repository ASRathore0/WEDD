<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

// Fallback direct storage file server for shared hosting environments where symlink execution is restricted
Route::get('/storage/{path}', function (string $path) {
    $fullPath = storage_path('app/public/' . $path);
    if (!file_exists($fullPath) || is_dir($fullPath)) {
        abort(404);
    }
    return response()->file($fullPath);
})->where('path', '.*');

Route::get('/{any?}', function () {
    $spaIndex = public_path('index.html');
    if (file_exists($spaIndex)) {
        return response()->file($spaIndex);
    }
    return view('welcome');
})->where('any', '^(?!api|storage).*$');
