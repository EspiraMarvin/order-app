<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UniversalResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserController extends Controller
{
    public function getAll()
    {
        return UserResource::collection(User::paginate(10));
    }

    public function editUser($id)
    {
        $data = \request()->validate([
            'name' => 'required',
            'email' => 'required',
        ]);
        $user = User::findorFail($id);
        if ($user){
            throw new UnprocessableEntityHttpException('User Not Found');
        }
        $user->update($data);

        return response()->json(['data' => new UserResource($user)]);
    }

    public function deleteUser($id)
    {
        $user = User::findorFail($id);
        $user->delete();
    }

    public function rolesIndex()
    {
        return UniversalResource::collection(Role::query()->where('name', '!=', 'admin')->paginate(15));
    }


}
