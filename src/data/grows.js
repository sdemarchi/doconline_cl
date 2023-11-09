export async function getGrowByRoute(growUrl) {
  const url = import.meta.env.VITE_API_URL + '/grow/' + growUrl;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowById(growId) {
  const url = import.meta.env.VITE_API_URL + '/grow.id/' + growId;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}

export async function getGrowByCod(growCod) {
  const url = import.meta.env.VITE_API_URL + '/grow/' + growCod;
  const response = await fetch(url)
  const result = await response.json()
  return result;
}