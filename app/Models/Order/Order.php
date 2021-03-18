<?php

namespace App\Order;

use App\Product\Product;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_no'
    ];

    public function products () {
        return $this->belongsToMany(Product::class, 'order_details', 'order_id', 'product_id');
    }
}
