// Run tests
countJSON();

async function countJSON() {
  let shows = await $.getJSON('../json/shows.json')
  console.log('Length of shows is', shows.length)
  console.assert(shows.length === 84, 'Length is not 84')
}
