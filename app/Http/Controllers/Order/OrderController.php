<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Order\Order;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class OrderController extends Controller
{
    public function index()
    {
        return OrderResource::collection(Order::paginate(10));
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
        ]);

        $order = Order::create($data);
        $order->products()->attach(2);

        return response()->json(['data' => new OrderResource($order)]);
    }


    public function update($id)
    {
        $data = request()->validate([
            'name' => 'required',
            'description' => 'required',
            'quantity' => 'required'
        ]);
        $order = Order::find($id);
        if ($order) {
            throw new UnprocessableEntityHttpException('Order Not Found');
        }
        $order->update($data);

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
