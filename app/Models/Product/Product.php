<?php

namespace App\Product;

use App\Order\Order;
use App\Supplier\Supplier;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'quantity'
    ];

    public function orders () {
        return $this->belongsToMany(Order::class,'order_details','product_id','order_id');
    }


    public function suppliers () {
        return $this->belongsToMany(Supplier::class, 'product_supplier', 'product_id', 'supplier_id');
    }

}
