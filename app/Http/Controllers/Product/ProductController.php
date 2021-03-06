<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::with('orders','suppliers')->paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required',
            'description' => 'required',
            'quantity' => 'required',
        ]);

        $product = Product::create($data);
        // trying to attach all
//        $product->products()->attach(1);
        // attaching two to see the difference
//        $product->products()->attach(2);

        // attaching suppliers
//        $product->suppliers()->attach();

        return response()->json(['data' => new ProductResource($product)]);
    }


    public function update($id)
    {

        $product = Product::find($id);

        if (!$product) {
            throw new UnprocessableEntityHttpException('Product Not Found');
        }

        $product->name = request()->input('name');
        $product->description = request()->input('description');
        $product->quantity = request()->input('quantity');

        $product->save();

        return response()->json(['data', new ProductResource($product)]);
    }

    public function destroy($id)
    {
        $product = Product:: find($id);

        if (!$product) {
            throw new UnprocessableEntityHttpException('Product Not Found');
        }

        $product->delete();
    }
}
