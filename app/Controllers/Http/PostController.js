'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('../../Models/Post')} Post */
const Post = use('App/Models/Post');

/** @typedef {import('@adonisjs/lucid/src/Database')} Database */
const Database = use('Database');

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   */
  async index({ request }) {
    const { sort, sortDirection } = request.get();

    const posts = await Database.table('posts').orderBy(
      `${sort ? sort : 'id'}`,
      `${sortDirection ? sortDirection : 'asc'}`
    );

    return posts;
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const data = request.only(['description']);

    const post = await Post.create({ ...data, upvote: 0 });

    return post;
  }

  /**
   * Do upvote in the post.
   * PUT post
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Params} ctx.params
   */
  async upvote({ params, request }) {
    const post = await Post.findOrFail(params.id);

    const data = { upvote: post.upvote + 1 };

    post.merge(data);

    await post.save();

    return post;
  }
}

module.exports = PostController;
