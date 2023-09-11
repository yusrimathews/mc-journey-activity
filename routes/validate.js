module.exports = (req, res) => {
  try {
    const body = req.body;
    const params = req.params;

    console.log(body, params);

    res.json({ success: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: true });
  }
}
