<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class AuthController extends Controller
{
    /**
     * Register user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register()
    {
        $data = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
//            'id_no' => 'required',
            'password' => 'required'
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        $user->roles()->attach(2);

        return response()->json(['data' => new UserResource($user)]);
    }

    /**
     * Login user
     *
     * @return ResponseFactory|Response
     */
    public function login()
    {
        $login = request()->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($login)) {
            throw new UnprocessableEntityHttpException('Invalid Login Credentials');
        }

//        dd('login',$login);

        $accessToken = Auth::user()->createToken('authToken')->accessToken;

        return response(['user' => new UserResource(Auth::User()), 'access_token' => $accessToken]);
    }

    public function userDetails()
    {
        $user = request()->user();

        return response()->json(['data' => new UserResource($user)]);
    }
}
