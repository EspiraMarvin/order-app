<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Product extends Model
{
    use SoftDeletes;

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
