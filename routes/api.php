<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// add/register user
Route::post('auth/register','Api\AuthController@register');
Route::post('auth/login','Api\AuthController@login');

// user - get user details
Route::middleware('auth:api')->get('user_details','Api\AuthController@userDetails');
// user
Route::middleware('auth:api')->put('edit/{id}','User\UserController@editUser');
Route::middleware('auth:api')->delete('delete/{id}','User\UserController@deleteUser');
Route::middleware('auth:api')->get('users','User\UserController@getAll');

// supplier
Route::middleware('auth:api')->get('suppliers', 'Api\Supplier\SupplierController@getAll');
Route::middleware('auth:api')->post('addSupplier', 'Api\Supplier\SupplierController@addSupplier');
Route::middleware('auth:api')->put('editSupplier/{id}', 'Api\Supplier\SupplierController@editSupplier');
Route::middleware('auth:api')->delete('deleteSupplier/{id}', 'Api\Supplier\SupplierController@deleteSupplier');

// product
Route::middleware('auth:api')->get('products', 'Api\Product\ProductController@getAll');
Route::middleware('auth:api')->post('addProduct', 'Api\Product\ProductController@addProduct');
Route::middleware('auth:api')->put('editProduct/{id}', 'Api\Product\ProductController@editProduct');
Route::middleware('auth:api')->delete('deleteProduct/{id}', 'Api\Product\ProductController@deleteProduct');

// order
Route::middleware('auth:api')->get('orders', 'Api\Order\OrderController@getAll');
Route::middleware('auth:api')->post('addOrder', 'Api\Order\OrderController@addOrder');
Route::middleware('auth:api')->put('editOrder/{id}', 'Api\Order\OrderController@editOrder');
Route::middleware('auth:api')->delete('deleteOrder/{id}', 'Api\Order\OrderController@deleteOrder');
