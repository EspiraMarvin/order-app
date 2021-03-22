<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
        'type' => 'Supplier Object',
        'id' => $this->id,
        'name' => $this->name,
        'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
        'updated_at' => Carbon::parse($this->updated_at)->toDateTimeString(),
        'relationships' => [
            'products' => $this->whenLoaded('products'),
        ]
    ];

    }
}
