<?php

namespace App\Order;

use App\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'order_no'
    ];

    public function products () {
        return $this->belongsToMany(Product::class, 'order_details', 'order_id', 'product_id');
    }
}
