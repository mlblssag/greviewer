// netlify/functions/reviews.js
export async function handler(event, context) {
  const placeId = process.env.PLACE_ID || 'ChIJr1jyc0DrzRIRwsYruaHDbxk';
  const apiKey = process.env.Greview;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Greview environment variable.' }),
      headers: { "Content-Type": "application/json" },
    };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data?.result?.reviews) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No reviews found.' }),
        headers: { "Content-Type": "application/json" },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.result.reviews),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { "Content-Type": "application/json" },
    };
  }
}
