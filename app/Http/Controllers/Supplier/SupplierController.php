<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierResource;
use App\Supplier\Supplier;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class SupplierController extends Controller
{
    public function index()
    {
        return SupplierResource::collection(Supplier::paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required'
        ]);

//        $role = $data['role_id'];
//        $data = Arr::except($data, ['role_id']);
//        $user = Supplier::create($data);
//        $user->roles()->attach($role);

        $supplier = Supplier::create($data);
        $supplier->products()->attach(2);

        return response()->json(['data' => new SupplierResource($supplier)]);
    }


    public function update($id)
    {
        $data = request()->validate([
            'name' => 'required'
        ]);

        $supplier = Supplier::find($id);

        if ($supplier) {
            throw new UnprocessableEntityHttpException('Supplier Not Found');
        }
        $supplier->update($data);

        return response()->json(['data', new SupplierResource($supplier)]);
    }

    public function destroy($id)
    {
        $supplier = Supplier:: find($id);


        if (!$supplier) {
            throw new UnprocessableEntityHttpException('Supplier Not Found');
        }
        $supplier->delete();
    }
}
