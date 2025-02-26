
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const links = [];
    
    $('a').each((i, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith('http')) {
        links.push(href);
      }
    });
    
    res.json({ links: [...new Set(links)] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch links' });
  }
});

module.exports = router;
