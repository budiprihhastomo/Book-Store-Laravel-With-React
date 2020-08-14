<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Password;
use App\User;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'reset', 'forgot']]);
    }

    public function login()
    {
        $credential = request(['email', 'password']);
        $token = auth()->attempt($credential);
        return !$token ? response()->json(['error' => "Unauthorized"], 403) : $this->createNewToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function register()
    {
        $input = request()->all();
        $data = array_merge($input, ['password' => bcrypt($input['password'])]);
        User::create($data);
        unset($data['password']);
        return response()->json([
            'message' => "Data Berhasil Dimasukan Database",
            'user' => $data
        ], 201);
    }

    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function forgot()
    {
        $credential = request()->validate(['email' => 'required|email']);
        Password::sendResetLink($credential);

        return response()->json(['message' => "Link Reset Password telah dikirim Ke email " . $credential['email']]);
    }

    public function reset()
    {
        $credential = request()->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $resetPasswordStatus = Password::reset($credential, function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        });

        return $resetPasswordStatus == Password::INVALID_TOKEN ? response()->json(["message" => 'Token tidak valid.'], 400) : response()->json(['message' => "Berhasil mengubah kata sandi."], 200);
    }
}
