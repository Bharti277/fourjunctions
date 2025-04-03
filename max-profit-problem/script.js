function calculateMaxProfit() {
  const theater = { time: 5, profit: 1500 };
  const pub = { time: 4, profit: 1000 };
  const commercial_park = { time: 10, profit: 3000 };
  let max_profit = 0;
  let result = "";

  let time_input = parseInt(document.getElementById("time").value);
  if (!time_input || time_input <= 0) {
    return alert("Please enter a valid time input.");
  }
  console.log(time_input);

  for (let t = 0; t <= Math.floor(time_input / theater.time); t++) {
    for (let p = 0; p <= Math.floor(time_input / pub.time); p++) {
      for (let c = 0; c <= Math.floor(time_input / commercial_park.time); c++) {
        const total_time =
          t * theater.time + p * pub.time + c * commercial_park.time;
        if (total_time <= time_input) {
          const total_profit =
            t * theater.profit + p * pub.profit + c * commercial_park.profit;
          if (total_profit > max_profit) {
            max_profit = total_profit;
            result = `T: ${t}, P: ${p}, C: ${c}`;
          }
        }
      }
    }
  }
  document.getElementById(
    "output"
  ).innerText = `Max Profit: $${max_profit} Result: ${result}`;
}
