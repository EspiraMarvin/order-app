<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UniversalResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Role;
use App\Order\Order;
use App\Product\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::whereDoesntHave('roles', function ($q) {
            $q->whereKey(1);
        })->orderBy('created_at', 'desc')->paginate(10));
//        return UserResource::collection(User::orderBy('created_at', 'asc')->paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users',
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

    public function update($id)
    {
        $user = User::find($id);

        if (!$user) {
            throw new UnprocessableEntityHttpException('User Not Found');
        }

        $data = request()->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|min:6'
        ]);
        if (request()->input('password')){
            $user->password = Hash::make(request()->input('password'));
        }

        $user->save($data);

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
        return UniversalResource::collection(Role::query()->where('name', '!=', 'admin')->paginate(15));

//        return UniversalResource::collection(Role::paginate(15));
    }


    public function AdminProductIndex()
    {
        $products = Product::orderBy('created_at', 'desc')
            ->withCount('orders')
            ->withCount('suppliers')
            ->paginate(50);

        return UniversalResource::collection($products);
    }


    public function userSearch() {
        $data = request()->validate([
            'filters' => 'required'
        ]);

        $user = User::query()
            ->where('id', $data['filters'])
            ->orWhere('name', $data['filters'])
            ->orWhere('email', $data['filters'])
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'data' => [
                'user' => $user
            ]
        ]);

    }

}
