function trappedWater(height) {
  const n = height.length;
  if (n === 0) return 0;

  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);
  let waterTrapped = 0;

  // Calculate left max and right max
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(height[i], rightMax[i + 1]);
  }

  // Calculate water trapped between blocks
  for (let i = 0; i < n; i++) {
    waterTrapped += Math.max(Math.min(leftMax[i], rightMax[i]) - height[i], 0);
  }

  return { waterTrapped, leftMax, rightMax };
}

function calculateHeight() {
  const input = document.getElementById("input").value;
  const heights = input.split(",").map(Number);
  const { waterTrapped, leftMax, rightMax } = trappedWater(heights);

  const graphRepresentation = document.getElementById("graph-representation");
  graphRepresentation.innerHTML = "";

  const maxHeight = Math.max(...heights);

  for (let i = 0; i < heights.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${maxHeight * 20}px`;

    // Create block height
    const blockHeight = document.createElement("div");
    blockHeight.classList.add("height");
    blockHeight.style.height = `${heights[i] * 20}px`;
    block.appendChild(blockHeight);

    // Create water height
    const waterHeight = Math.max(
      Math.min(leftMax[i], rightMax[i]) - heights[i],
      0
    );
    if (waterHeight > 0) {
      const waterDiv = document.createElement("div");
      waterDiv.classList.add("water");
      waterDiv.style.height = `${waterHeight * 20}px`;
      block.appendChild(waterDiv);
    }

    graphRepresentation.appendChild(block);
  }

  document.getElementById(
    "result"
  ).innerText = `Total Water Trapped: ${waterTrapped} Units`;
}
