let votes = {
  most1: [0, 0, 0, 0],
  most2: [0, 0, 0, 0],
  most3: [0, 0, 0, 0],
  most4: [0, 0, 0, 0],
  most5: [0, 0, 0, 0],
  most6: [0, 0, 0, 0],
  most7: [0, 0, 0, 0],
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { page, index } = req.method === 'POST' ? req.body : req.query;

  if (!votes[page]) {
    return res.status(400).json({ error: "Invalid page" });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ votes: votes[page] });
  }

  if (req.method === 'POST') {
    if (typeof index !== 'number' || index < 0 || index >= votes[page].length) {
      return res.status(400).json({ error: 'Invalid vote index' });
    }

    votes[page][index]++;
    return res.status(200).json({ votes: votes[page] });
  }

  res.status(405).end();
}
