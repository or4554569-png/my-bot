const TOKEN = "9053814969:AAF-6n3XnwFgQdiDX4RPG-ae9_Y28pctNdU";
const MY_ID = "7469070313";
let prices = [];
async function getUSDJPY(){
  try{
    let r = await fetch(`https://open.er-api.com/v6/latest/USD`);
    let d = await r.json();
    return d.rates.JPY;
  }catch(e){ return null; }
}

async function send(text){
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({chat_id: MY_ID, text})
  });
}

async function check(){
  let p = await getUSDJPY();
  if(!p) return;
  prices.push(p);
  if(prices.length > 20) prices.shift();
  if(prices.length < 10) return;
  let last = prices[prices.length-1];
  let prev = prices[prices.length-2];
  let signal = last > prev ? "UP 🟢" : "DOWN 🔴";
  await send(`SURE SHOT\nUSD/JPY: ${p}\nSignal: ${signal}\nTime: ${new Date().toLocaleString("en-GB",{timeZone:"Asia/Dhaka"})}`);
}

check();
setInterval(check, 60000);
