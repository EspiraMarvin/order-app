<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Supplier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name'
    ];

    public function products () {
        return $this->belongsToMany(Product::class,'product_supplier','supplier_id', 'product_id');
    }
}
