<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UniversalResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserController extends Controller
{
    public function index()
    {
//        return UserResource::collection(User::whereDoesntHave('roles', function ($q) {
//            $q->whereKey(1);
//        })->orderBy('created_at', 'desc')->paginate(10));
        return UserResource::collection(User::paginate(10));
//        return UserResource::collection(User::paginate(10)->orderBy('created_at', 'desc'));
    }

    public function update($id)
    {
        $user = User::find($id);

        if (!$user) {
            throw new UnprocessableEntityHttpException('User Not Found');
        }

        $user->name = request()->input('name');
        $user->email = request()->input('email');

        if (request()->input('password')){
            $user->password = Hash::make(request()->input('password'));
        }

        $user->save();

        return response()->json(['data' => new UserResource($user)]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            throw new UnprocessableEntityHttpException('User Not Found');
        }

        $user->delete();
    }

    public function rolesIndex()
    {
        return UniversalResource::collection(Role::paginate(15));
//        return UniversalResource::collection(Role::query()->where('name', '!=', 'admin')->paginate(15));
    }


}
