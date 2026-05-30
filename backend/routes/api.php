<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/articles', [ArticleController::class, 'index']);

Route::get('/articles/{article}', [ArticleController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/articles', [ArticleController::class, 'store']);

    Route::put('/articles/{article}', [ArticleController::class, 'update']);

    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);

});



