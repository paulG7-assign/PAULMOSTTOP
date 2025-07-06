// api/vote.js
// Simple in-memory vote storage for pages most1–most4
const votesDB = {
  most1: [0,0,0,0],
  most2: [0,0,0,0],
  most3: [0,0,0,0],
  most4: [0,0,0,0]
};

// Rate-limit tracking per IP or headers not required; cooldown enforced client-side

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const page = req.method === 'GET' ? req.query.page : req.body.page;
  if (!['most1','most2','most3','most4'].includes(page)) {
    return res.status(400).json({ error: 'Invalid page' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ votes: votesDB[page] });
  } 
  else if (req.method === 'POST') {
    const { index } = req.body;
    if (typeof index !== 'number' || index < 0 || index > 3) {
      return res.status(400).json({ error: 'Invalid index' });
    }
    votesDB[page][index]++;
    return res.status(200).json({ votes: votesDB[page] });
  } 
  else {
    return res.status(405).end();
  }
}
