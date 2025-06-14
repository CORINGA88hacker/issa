const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

const BASE_URL = 'https://api.jikan.moe/v4/anime';

async function getAnimePage(page = 1) {
  const res = await axios.get(`${BASE_URL}?page=${page}`);
  return res.data.data.map(anime => ({
    id: anime.mal_id,
    title: anime.title,
    image: anime.images?.jpg?.image_url,
    score: anime.score,
    type: anime.type,
    year: anime.year,
    synopsis: anime.synopsis
  }));
}

app.get('/animes', async (req, res) => {
  try {
    const allAnimes = [];
    const totalPages = 40; // até 1000 animes (25 por página * 40 páginas)
    for (let i = 1; i <= totalPages; i++) {
      const pageData = await getAnimePage(i);
      allAnimes.push(...pageData);
    }

    res.json(allAnimes.slice(0, 1000));
  } catch (error) {
    console.error('Erro ao buscar animes:', error.message);
    res.status(500).json({ error: 'Erro ao buscar animes' });
  }
});

app.listen(PORT, () => {
  console.log(`Anime API rodando em http://localhost:${PORT}`);
});
