export default function Home() {
  fetch('http://localhost:3000/api/hello')
  return 'did fetch, see network requests'
}
