<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierResource;
use App\Supplier\Supplier;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class SupplierController extends Controller
{
    public function getAll()
    {
        return SupplierResource::collection(Supplier::paginate(10));
    }

    public function addSupplier()
    {
        $data = request()->validate([
            'name' => 'required'
        ]);

        $supplier = Supplier::create($data);
        $supplier->products()->attach(2);

        return response()->json(['data' => new SupplierResource($supplier)]);
    }


    public function editSupplier($id)
    {
        $data = \request()->validate([
            'name' => 'required',
            'description' => 'required',
            'quantity' => 'required'
        ]);
        $supplier = Supplier::findOrFail($id);
        if ($supplier) {
            throw new UnprocessableEntityHttpException('Supplier Not Found');
        }
        $supplier->update($data);

        return response()->json(['data', new SupplierResource($supplier)]);
    }

    public function deleteSupplier($id)
    {
        $supplier = Supplier:: findOrFail($id);
        $supplier->delete();
    }
}
