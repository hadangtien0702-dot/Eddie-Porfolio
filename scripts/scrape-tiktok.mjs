import { chromium } from "@playwright/test";

const urls = [
  // Creative Edit (no stats)
  "https://www.tiktok.com/@thinksmartnews/video/7367202055791938832",
  "https://www.tiktok.com/@thinksmartnews/video/7387701528980720903",
  "https://www.tiktok.com/@thinksmartnews/video/7397244836404808976",
  "https://www.tiktok.com/@thinksmartnews/video/7364192390191516944",
  "https://www.tiktok.com/@thinksmartnews/video/7417639368162036999",
  "https://www.tiktok.com/@thinksmartnews/video/7422830191086505223",
  "https://www.tiktok.com/@thinksmartnews/video/7491163055879900433",
  // View Edit (no stats)
  "https://www.tiktok.com/@thinksmartnews/video/7586504763848609045",
  "https://www.tiktok.com/@thinksmartnews/video/7600579541222149587",
  "https://www.tiktok.com/@thinksmartnews/video/7386501994254470408",
  "https://www.tiktok.com/@thinksmartnews/video/7369413141928660225",
  "https://www.tiktok.com/@thinksmartnews/video/7413933726838639880",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  locale: "en-US",
});

for (const url of urls) {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(3000);

    const stats = await page.evaluate(() => {
      const getText = (selector) =>
        document.querySelector(selector)?.textContent?.trim() || null;

      const likes =
        getText('[data-e2e="like-count"]') ||
        getText("strong[data-e2e='like-count']") ||
        null;

      const comments =
        getText('[data-e2e="comment-count"]') ||
        getText("strong[data-e2e='comment-count']") ||
        null;

      const shares =
        getText('[data-e2e="share-count"]') ||
        getText("strong[data-e2e='share-count']") ||
        null;

      const saves =
        getText('[data-e2e="collect-count"]') ||
        getText('[data-e2e="undefined-count"]') ||
        null;

      // Views from meta tags
      const metaDesc =
        document.querySelector('meta[name="description"]')?.content || "";
      const ogDesc =
        document.querySelector('meta[property="og:description"]')?.content || "";
      const title = document.title || "";

      // fallback: grab all strong tags
      const strongs = [...document.querySelectorAll("strong")].map((el) =>
        el.textContent.trim()
      );

      // Try to extract views from TikTok's embedded JSON data
      let views = null;
      try {
        const scripts = [...document.querySelectorAll('script[id="__UNIVERSAL_DATA_FOR_REHYDRATION__"]')];
        if (scripts.length) {
          const json = JSON.parse(scripts[0].textContent);
          const itemModule = json?.__DEFAULT_SCOPE__?.["webapp.video-detail"]?.itemInfo?.itemStruct;
          views = itemModule?.stats?.playCount ?? itemModule?.statsV2?.playCount ?? null;
          if (views) views = Number(views).toLocaleString();
        }
      } catch {}

      return { likes, comments, shares, saves, strongs, metaDesc, ogDesc, title, views };
    });

    // Parse saves from strongs: order is Likes | Comments | Saves | Shares
    const nums = stats.strongs.filter(s => /^\d+$/.test(s));
    const saves = stats.saves || (nums[2] ?? null);

    const videoId = url.split("/").pop();
    console.log(`\n--- ${videoId} ---`);
    console.log(`Views:    ${stats.views || "N/A"}`);
    console.log(`Likes:    ${stats.likes || nums[0] || null}`);
    console.log(`Comments: ${stats.comments || nums[1] || null}`);
    console.log(`Saves:    ${saves}`);
    console.log(`Shares:   ${stats.shares || nums[3] || null}`);
    console.log(`Title: ${stats.title}`);
  } catch (e) {
    console.log(`\n--- ${url.split("/").pop()} --- ERROR: ${e.message}`);
  }
  await page.close();
}

await browser.close();
