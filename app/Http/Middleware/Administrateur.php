<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class Administrateur
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        //utilisateur non authetifié
        if(!$user){   
            return redirect() ->route ('home');
        }

        // utilisateur authentifié mais pas comme administrateur
        if ($user->role !== User::admin_role){
            return redirect() ->route ('home');
        }   
        //dd($user->role);
        return $next($request);
    }
}
