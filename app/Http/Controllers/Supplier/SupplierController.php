<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierResource;
use App\Supplier\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class SupplierController extends Controller
{
    public function index()
    {
        return SupplierResource::collection(Supplier::with('products')->paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required',
            'products' => 'required'
        ]);

        $product = json_decode($data['products']);
        $data = Arr::except($data, ['products']);

        $supplier = Supplier::create($data);
        $supplier->products()->attach($product);

        return response()->json(['data' => new SupplierResource($data)]);
    }


    public function update($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            throw new UnprocessableEntityHttpException('Supplier Not Found');
        }

        $supplier->name = request()->input('name');

        $supplier->save();

        return response()->json(['data', new SupplierResource($supplier)]);

    }

    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            throw new UnprocessableEntityHttpException('Supplier Not Found');
        }
        $supplier->delete();
    }
}
