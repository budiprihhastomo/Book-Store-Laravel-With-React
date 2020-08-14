<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Auth;
use JWTAuth;

class Authenticate extends Middleware
{

    function handle($request, Closure $next, ...$guards)
    {
        try {
            $jwt = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            $jwt = false;
        }
        if (Auth::check() || $jwt) {
            return $next($request);
        } else {
            return response()->json(['message' => "Access Forbidden"], 403);
        }
    }
}
