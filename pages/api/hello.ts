require('../../trace')

export default (req, res) => {
  console.log({ hit: true })
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
