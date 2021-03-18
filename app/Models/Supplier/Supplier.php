<?php

namespace App\Supplier;

use App\Product\Product;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'name'
    ];

    public function products () {
        return $this->belongsToMany(Product::class,'product_supplier','supplier_id', 'product_id');
    }
}
