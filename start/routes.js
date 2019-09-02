'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('posts', 'PostController.index');
  Route.post('posts', 'PostController.store');
  Route.put('posts/upvote/:id', 'PostController.upvote');
}).prefix('api');
