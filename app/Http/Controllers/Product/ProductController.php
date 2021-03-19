<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Product\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ProductController extends Controller
{
    public function getAll()
    {
        return ProductResource::collection(Product::paginate(10));
    }

    public function addProduct()
    {
        $data = request()->validate([
            'name' => 'required',
            'description' => 'required',
            'quantity' => 'required',
        ]);

        $product = Product::create($data);
        // trying to attach all
        $product->products()->attach();
        // attaching two to see the difference
//        $product->products()->attach(2);

        // attaching suppliers
        $product->suppliers()->attach();

        return response()->json(['data' => new ProductResource($product)]);
    }


    public function editProduct($id)
    {
        $data = \request()->validate([
            'name' => 'required',
            'description' => 'required',
            'quantity' => 'required'
        ]);
        $product = Product::findOrFail($id);
        if ($product) {
            throw new UnprocessableEntityHttpException('Product Not Found');
        }
        $product->update($data);

        return response()->json(['data', new ProductResource($product)]);
    }

    public function deleteProduct($id)
    {
        $product = Product:: findOrFail($id);
        $product->delete();
    }
}
