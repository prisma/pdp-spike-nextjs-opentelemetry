import '../../demos/basic-service-1'

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
