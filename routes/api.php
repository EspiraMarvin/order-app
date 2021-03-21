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

/*Route::get('/user', function (Request $request) {
    return $request->user();
});*/

// add/register user
Route::post('auth/login','Api\AuthController@login');


Route::group(['middleware' => ['auth:api']], function () {
    // users
    Route::post('auth/register','Api\AuthController@createUser');
    Route::get('/user_details','Api\AuthController@userDetails');
    Route::get('/users/index','User\UserController@index')->name('users.index');
    Route::put('/users/{id}/update','User\UserController@update')->name('user.update');
    Route::delete('/users/{id}/delete', 'User\UserController@destroy')->name('users.destroy');
    // roles
    Route::get('/users/roles/get', 'User\UserController@rolesIndex')->name('user.roles.get');

// supplier
    Route::get('/suppliers/index', 'Supplier\SupplierController@index')->name('suppliers.index');
    Route::post('/suppliers/add', 'Supplier\SupplierController@store')->name('suppliers.store');
    Route::put('/suppliers/{id}/update', 'Supplier\SupplierController@update')->name('suppliers.update.');
    Route::delete('/suppliers/{id}/delete', 'Supplier\SupplierController@destroy')->name('suppliers.destroy');

// product
    Route::get('/products/index', 'Product\ProductController@index')->name('products.index');
    Route::post('/products/add', 'Product\ProductController@store')->name('products.store');
    Route::put('/products/{id}/update', 'Product\ProductController@update')->name('products.update');
    Route::delete('/products/{id}/delete', 'Product\ProductController@destroy')->name('products.destroy');

// order
    Route::get('/orders/index', 'Order\OrderController@index')->name('orders.index');
    Route::post('/orders/add', 'Order\OrderController@store')->name('orders.store');
    Route::put('/orders/{id}/update', 'Order\OrderController@update')->name('orders.update');
    Route::delete('/orders/{id}/delete', 'Order\OrderController@destroy')->name('orders.destroy');

});
