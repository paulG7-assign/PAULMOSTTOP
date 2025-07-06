// api/vote.js
let votes = [0, 0, 0, 0]; // in-memory votes (resets on server restart)

// CORS headers to allow your frontend to call this
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  if (req.method === 'GET') {
    // Return current votes
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ votes });
  }

  if (req.method === 'POST') {
    const { index } = req.body;

    if (typeof index !== 'number' || index < 0 || index >= votes.length) {
      return res.status(400).json({ error: 'Invalid index' });
    }

    votes[index]++;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ votes });
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
