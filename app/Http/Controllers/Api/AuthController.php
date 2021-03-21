<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
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
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $data['password'] = Hash::make($data['password']);
        $role = $data['role_id'];
        $data = Arr::except($data, ['role_id']);

        $user = User::create($data);
        $user->roles()->attach($role);

        return response()->json(['data' => new UserResource($user)]);
    }

    /**
     * Login user
     *
     * @return ResponseFactory|Response
     */
    public function login()
    {
        $data = request()->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            throw new UnprocessableEntityHttpException('User with that email does not exist!');
        }

        if (Hash::check($data['password'], $user->password)) {
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;

            //return response with token and user object
            $response = ['token' => $token, 'user' => new UserResource($user), 'message' => 'Login success!'];
            return response()->json($response, 200);
        } else {
            throw new UnprocessableEntityHttpException('Password miss match, please try again!');
        }
    }

    public function createUser()
    {
        $data = request()->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users',
            'phone' =>  'required',
            'password' => 'required|string|min:6',
            'role_id' => 'required'
        ]);

        $data['password'] = Hash::make($data['password']);
        $role = $data['role_id'];
        $data = Arr::except($data, ['role_id']);

        $user = User::create($data);
        $user->roles()->attach($role);

        return response()->json(['data' => new UserResource($user)]);
    }


    public function userLogout()
    {
        request()->user()->token()->revoke();

        $response = ['status' =>true, 'message' => 'Logout success!'];

        return response()->json($response, 200);
    }

    public function getCurrentUser()
    {
        return response()->json(['data' => new UserResource(request()->user())]);
    }
}
