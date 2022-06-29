function averageInUnit8Array(
  array: Uint8Array,
  startIdx: number,
  endIdx: number
) {
  let sum = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    sum += array[i];
  }

  return sum / (endIdx - startIdx + 1);
}

export function drawSimpleBar(
  canvasCtx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  bufferLength: number,
  dataArray: Uint8Array,
  width: number,
  height: number,
  barColor: string
) {
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = "rgb(0, 0, 0)";
  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
  canvasCtx.fillRect(0, 0, width, height);

  // 高周波は全く動かないため、除く
  const barWidth = (width / bufferLength) * 1.1;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 128) * height * 0.9;

    canvasCtx.fillStyle = barColor; //"rgb(" + (barHeight + 100) + ",50,50)";
    canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight);

    x += barWidth;
  }
}

export function drawBoldBar(
  canvasCtx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  bufferLength: number,
  dataArray: Uint8Array,
  width: number,
  height: number,
  barColor: string
) {
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = "rgb(0, 0, 0)";
  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
  canvasCtx.fillRect(0, 0, width, height);

  const barLength = 32;
  const barWidth = (width / barLength) * 0.9;
  const elementsCountPerBar = bufferLength / barLength;
  let x = 0;

  for (let i = 0; i < barLength; i++) {
    const baseHeight = averageInUnit8Array(
      dataArray,
      i * elementsCountPerBar,
      (i + 1) * elementsCountPerBar
    );

    const barHeight = (baseHeight / 128) * height * 0.9;

    canvasCtx.fillStyle = barColor; //"rgb(" + (barHeight + 100) + ",50,50)";
    canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }
}

export function drawLineBar(
  canvasCtx: CanvasRenderingContext2D,
  analyser: AnalyserNode,
  bufferLength: number,
  dataArray: Uint8Array,
  width: number,
  height: number,
  barColor: string
) {
  analyser.getByteFrequencyData(dataArray);
  canvasCtx.fillStyle = "rgb(0, 0, 0)";
  canvasCtx.clearRect(0, 0, width, height);
  canvasCtx.fillStyle = "rgb(0, 0, 0, 0)";
  canvasCtx.fillRect(0, 0, width, height);

  const barLength = 16;
  const barWidth = (width / barLength) * 0.9;
  const elementsCountPerBar = bufferLength / barLength;
  let x = 0;

  for (let i = 0; i < barLength; i++) {
    const baseHeight = averageInUnit8Array(
      dataArray,
      i * elementsCountPerBar,
      (i + 1) * elementsCountPerBar
    );

    // 横に並ぶ線は12個
    const barLineCount = Math.floor(baseHeight / 10);

    for (let j = 0; j < barLineCount; j++) {
      const barLineY = height - j * 20 + 10;
      canvasCtx.beginPath();
      canvasCtx.moveTo(x, barLineY);
      canvasCtx.lineTo(x + barWidth, barLineY);
      canvasCtx.strokeStyle = barColor;
      canvasCtx.lineWidth = 10;
      canvasCtx.stroke();
    }

    //canvasCtx.fillStyle = barColor; //"rgb(" + (barHeight + 100) + ",50,50)";
    //canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight);

    x += barWidth + 10;
  }
}
