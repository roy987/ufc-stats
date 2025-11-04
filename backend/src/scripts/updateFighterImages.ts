import { fighters } from '../data/fighters';

interface TheSportsDBPlayer {
  strPlayer: string;
  strCutout: string | null;
  strThumb: string | null;
}

interface TheSportsDBResponse {
  player: TheSportsDBPlayer[] | null;
}

async function fetchFighterImage(fighterName: string): Promise<string | null> {
  try {
    const encodedName = encodeURIComponent(fighterName);
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodedName}`
    );
    const data = await response.json() as TheSportsDBResponse;

    if (data.player && data.player.length > 0) {
      // Prefer cutout images (transparent background) over thumbnails
      const player = data.player[0];
      return player.strCutout || player.strThumb || null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching image for ${fighterName}:`, error);
    return null;
  }
}

async function updateAllFighterImages() {
  console.log('Fetching real fighter images from TheSportsDB...\n');

  for (const fighter of fighters) {
    console.log(`Searching for ${fighter.name}...`);
    const imageUrl = await fetchFighterImage(fighter.name);

    if (imageUrl) {
      console.log(`✓ Found image: ${imageUrl}`);
      console.log(`  Update fighter.image to: "${imageUrl}"\n`);
    } else {
      console.log(`✗ No image found\n`);
    }

    // Add a small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n=== Image URLs Ready ===');
  console.log('Copy these URLs to update fighters.ts manually\n');
}

updateAllFighterImages();
