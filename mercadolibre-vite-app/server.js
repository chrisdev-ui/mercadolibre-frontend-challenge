/* eslint-env node */
import axios from 'axios';
import express from 'express';
import fs from 'fs';
import { listen } from 'listhen';
import path from 'path';
import sirv from 'sirv';
import { createServer as createViteServer } from 'vite';

// This should be as env variable but I don't want to add more complexity to exercise
const MERCADOLIBRE_API = 'https://api.mercadolibre.com/';
const CATEGORY_TYPE = 'category';
const AUTHOR_NAME = 'Christian';
const AUTHOR_LASTNAME = 'Torres ®';
const DEV_ENV = 'development';

const bootstrap = async () => {
  const app = express();
  let vite;

  if (process.env.NODE_ENV === DEV_ENV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      sirv('dist/client', {
        gzip: true,
      }),
    );
  }

  app.get('/api/items', async (req, res, next) => {
    try {
      const { q } = req.query;
      const url = MERCADOLIBRE_API.concat('sites/MLA/', `search?q=${q}`, '&limit=4');
      const categoriesUrl = MERCADOLIBRE_API.concat('categories/');
      const { data } = await axios.get(url);
      const responseData = {};
      responseData.items = data?.results.map((result) => ({
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: Math.floor(result.price),
          decimals: result.price % 1 ? 2 : 0,
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
      }));
      if (data?.results[0].category_id) {
        const url = categoriesUrl.concat(data?.results[0].category_id);
        const { data: categoriesData } = await axios.get(url);
        responseData.categories = categoriesData.path_from_root?.map((category) => category.name);
      } else {
        const categoryId = data?.available_filters.find((filter) => filter.id === CATEGORY_TYPE)
          ?.values[0].id;
        const url = categoriesUrl.concat(categoryId);
        const { data: categoriesData } = await axios.get(url);
        responseData.categories = categoriesData.path_from_root?.map((category) => category.name);
      }
      responseData.author = {
        name: AUTHOR_NAME,
        lastname: AUTHOR_LASTNAME,
      };
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/items/:id', async (req, res, next) => {
    try {
      const { id: itemId } = req.params;
      const url = MERCADOLIBRE_API.concat('items/', itemId);
      const descriptionUrl = url.concat('/description');
      const categoriesUrl = MERCADOLIBRE_API.concat('categories/');
      const { data: itemData } = await axios.get(url);
      const { data: descriptionData } = await axios.get(descriptionUrl);
      const { data: categoriesData } = await axios.get(categoriesUrl.concat(itemData?.category_id));
      const author = {
        name: AUTHOR_NAME,
        lastname: AUTHOR_LASTNAME,
      };
      const item = {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.floor(itemData.price),
          decimals: 2,
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: descriptionData.plain_text,
        categories: categoriesData.path_from_root?.map((category) => category.name),
      };
      res.status(200).json({ author, item });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    let template, render;

    try {
      if (process.env.NODE_ENV === DEV_ENV) {
        template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');

        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(path.resolve('dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const appHtml = await render({ path: url });

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html').end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });

  return { app };
};

bootstrap()
  .then(async ({ app }) => {
    await listen(app, { port: 3333 });
  })
  .catch(console.error);
