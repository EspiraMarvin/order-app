<?php

namespace App\Http\Resources;

//use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'type' => 'Product Object',
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'quantity' => $this->quantity,
//            'created_at' => Carbon::parse($this->created_at)->toDateTimeString(),
            'created_at' => $this->created_at,
//            'updated_at' => Carbon::parse($this->updated_at)->toDateTimeString(),
            'updated_at' => $this->updated_at,
            'relationships' => [
                'orders' => $this->whenLoaded('orders'),
                'suppliers' => $this->whenLoaded('suppliers')
            ]
        ];
    }
}
