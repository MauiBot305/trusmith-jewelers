const fs = require('fs');
const path = require('path');

const SOURCES = [
  {
    name: 'JM Bullion',
    url: 'https://www.jmbullion.com/charts/gold-price/',
    extract: (text) => {
      // data-metal="XAU" data-price="4910.44"
      const match = text.match(/data-metal="XAU" data-price="([\d\.]+)"/);
      return match ? parseFloat(match[1]) : null;
    }
  },
  {
    name: 'Business Insider',
    url: 'https://markets.businessinsider.com/commodities/gold-price',
    extract: (text) => {
      // "Gold 4,921.54"
      const match = text.match(/Gold\s+([\d,]+\.\d+)/) ||
                    text.match(/class="price-section__current-value">([\d,]+\.\d+)/);
      return match ? parseFloat(match[1].replace(/,/g, '')) : null;
    }
  },
  {
    name: 'Trading Economics',
    url: 'https://tradingeconomics.com/commodity/gold',
    extract: (text) => {
      const match = text.match(/Gold\s+.*?([\d,]+\.\d+)\s+USD\/t\.oz/) ||
                    text.match(/data-value="([\d\.]+)"/);
      return match ? parseFloat(match[1].replace(/,/g, '')) : null;
    }
  },
  {
    name: 'CoinCap (Gold)',
    url: 'https://api.coincap.io/v2/rates/gold',
    extract: (text) => {
      try {
        const data = JSON.parse(text);
        return parseFloat(data.data.rateUsd);
      } catch (e) {
        return null;
      }
    }
  },
  {
    name: 'Coinbase (PAXG)',
    url: 'https://api.coinbase.com/v2/prices/PAXG-USD/spot',
    extract: (text) => {
      try {
        const data = JSON.parse(text);
        return parseFloat(data.data.amount);
      } catch (e) {
        return null;
      }
    }
  },
  {
    name: 'CoinGecko (PAXG)',
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd',
    extract: (text) => {
      try {
        const data = JSON.parse(text);
        return data['pax-gold'].usd;
      } catch (e) {
        return null;
      }
    }
  }
];

const OUTPUT_FILE = path.join(__dirname, '../src/data/gold-price.json');

async function fetchPrice(source) {
  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    
    if (!response.ok) {
      console.error(`[${source.name}] Failed: ${response.status}`);
      return null;
    }

    const text = await response.text();
    let price = source.extract(text);
    
    if (price && !isNaN(price)) {
      console.log(`[${source.name}] Found: $${price.toFixed(2)}`);
      return price;
    } else {
      console.error(`[${source.name}] Parse error. Snippet: ${text.substring(0, 100)}...`);
      return null;
    }
  } catch (error) {
    console.error(`[${source.name}] Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Fetching gold prices...');
  
  const results = await Promise.all(SOURCES.map(source => fetchPrice(source)));
  const validPrices = results.filter(p => p !== null && p > 0);
  
  if (validPrices.length === 0) {
    console.error('No valid prices found!');
    process.exit(1);
  }

  const average = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
  
  const data = {
    price: parseFloat(average.toFixed(2)),
    updatedAt: new Date().toISOString(),
    sourceCount: validPrices.length,
    sources: SOURCES.map((s, i) => ({ name: s.name, price: results[i] })).filter(s => s.price)
  };

  // Ensure directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`\nUpdated gold price: $${data.price} (from ${data.sourceCount} sources)`);
}

main();
