<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Order\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(Order::with('products')->paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'order_no' => 'required|unique:orders',
            'products' => 'required'
        ]);

        $product = json_decode($data['products']);
        $data = Arr::except($data, ['products']);

        $order = Order::create($data);
        $order->products()->attach($product);

        return response()->json(['data' => new OrderResource($order)]);
    }


    public function update($id)
    {
        $order = Order::find($id);

        if (!$order) {
            throw new UnprocessableEntityHttpException('Order Not Found');
        }


        $data = request()->validate([
            'order_no' => 'required|unique:orders',
            'products' => 'required'
        ]);

        $order->order_no = request()->input('order_no');

        $product = json_decode($data['products']);
        $data = Arr::except($data, ['products']);


        $order->products()->attach($product);

        $order->save();

        return response()->json(['data', new OrderResource($order)]);
    }

    public function destroy($id)
    {
        $order = Order:: find($id);

        if (!$order) {
            throw new UnprocessableEntityHttpException('Order Not Found');
        }

        $order->delete();
    }
}
