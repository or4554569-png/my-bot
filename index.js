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
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({chat_id: MY_ID, text: text})
  });
}

setTimeout(async ()=>{
  let p = await getUSDJPY();
  send(`✅ SURE SHOT বট চালু ভাই!\nUSD/JPY: ${p}\nএখন থেকে প্রতি 5 মিনিটে খালি পাকা সিগন্যাল আইবো।`);
}, 5000);

setInterval(async ()=>{
  let price = await getUSDJPY();
  if(!price) return;
  prices.push(price);
  if(prices.length > 3) prices.shift();
  if(prices.length < 3) return;
  let avg = prices.reduce((a,b)=>a+b,0)/prices.length;
  let first = prices[0];
  let change = ((price - first)/first)*100;
  if(price > avg && change >= 0.08){
    send(`🟢 USD/JPY\n⬆️ UP\nSURE SHOT - 5 Min\nদাম: ${price}`);
  }
  else if(price < avg && change <= -0.08){
    send(`🔴 USD/JPY\n⬇️ DOWN\nSURE SHOT - 5 Min\nদাম: ${price}`);
  }
}, 5 * 60 * 1000);
