<?php

namespace App\Models;

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
