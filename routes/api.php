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

// roles
Route::get('/users/roles/get', 'User\UserController@rolesIndex')->name('user.roles.get');

// supplier
Route::middleware('auth:api')->get('suppliers', 'Supplier\SupplierController@getAll');
Route::middleware('auth:api')->post('add-supplier', 'Supplier\SupplierController@addSupplier');
Route::middleware('auth:api')->put('edit-supplier/{id}', 'Supplier\SupplierController@editSupplier');
Route::middleware('auth:api')->delete('delete-supplier/{id}', 'Supplier\SupplierController@deleteSupplier');

// product
Route::middleware('auth:api')->get('products', 'Product\ProductController@getAll');
Route::middleware('auth:api')->post('add-product', 'Product\ProductController@addProduct');
Route::middleware('auth:api')->put('edit-product/{id}', 'Product\ProductController@editProduct');
Route::middleware('auth:api')->delete('deleteProduct/{id}', 'Product\ProductController@deleteProduct');

// order
Route::middleware('auth:api')->get('orders', 'Order\OrderController@getAll');
Route::middleware('auth:api')->post('add-order', 'Order\OrderController@addOrder');
Route::middleware('auth:api')->put('edit-order/{id}', 'Order\OrderController@editOrder');
Route::middleware('auth:api')->delete('delete-order/{id}', 'Order\OrderController@deleteOrder');
