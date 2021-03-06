export function drawCurve(
  ctx: CanvasRenderingContext2D,
  ptsa: number[],
  tension: number,
  isClosed = false,
  numOfSegments?: number,
  showPoints?: boolean
) {
  ctx.beginPath();

  drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));

  if (showPoints) {
    ctx.beginPath();
    for (let i = 0; i < ptsa.length - 1; i += 2)
      ctx.rect(ptsa[i] - 2, ptsa[i + 1] - 2, 4, 4);
  }

  ctx.stroke();
}

function drawLines(ctx: CanvasRenderingContext2D, pts: number[]) {
  ctx.moveTo(pts[0], pts[1]);
  ctx.strokeStyle = "#00000000";
  for (let i = 2; i < pts.length - 1; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
}

function getCurvePoints(
  pts: number[],
  tension: number,
  isClosed: boolean,
  numOfSegments?: number
) {
  // use input value if provided, or use a default value
  tension = tension ? tension : 0.5;
  isClosed = isClosed ? isClosed : false;
  numOfSegments = numOfSegments ? numOfSegments : 16;

  let _pts: number[] = []; // clone array
  const res: number[] = [];
  let x, y; // our x,y coords
  let t1x, t2x, t1y, t2y; // tension vectors
  let c1, c2, c3, c4; // cardinal points
  let st, t, i; // steps based on num. of segments

  // clone array so we don't change the original
  //
  _pts = pts.slice(0);

  // The algorithm require a previous and next point to the actual point array.
  // Check if we will draw closed or open curve.
  // If closed, copy end points to beginning and first points to end
  // If open, duplicate first points to befinning, end points to end
  if (isClosed) {
    _pts.unshift(pts[pts.length - 1]);
    _pts.unshift(pts[pts.length - 2]);
    _pts.unshift(pts[pts.length - 1]);
    _pts.unshift(pts[pts.length - 2]);
    _pts.push(pts[0]);
    _pts.push(pts[1]);
  } else {
    _pts.unshift(pts[1]); //copy 1. point and insert at beginning
    _pts.unshift(pts[0]);
    _pts.push(pts[pts.length - 2]); //copy last point and append
    _pts.push(pts[pts.length - 1]);
  }

  // ok, lets start..

  // 1. loop goes through point array
  // 2. loop goes through each segment between the 2 pts + 1e point before and after
  for (i = 2; i < _pts.length - 4; i += 2) {
    for (t = 0; t <= numOfSegments; t++) {
      // calc tension vectors
      t1x = (_pts[i + 2] - _pts[i - 2]) * tension;
      t2x = (_pts[i + 4] - _pts[i]) * tension;

      t1y = (_pts[i + 3] - _pts[i - 1]) * tension;
      t2y = (_pts[i + 5] - _pts[i + 1]) * tension;

      // calc step
      st = t / numOfSegments;

      // calc cardinals
      c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
      c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
      c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
      c4 = Math.pow(st, 3) - Math.pow(st, 2);

      // calc x and y cords with common control vectors
      x = c1 * _pts[i] + c2 * _pts[i + 2] + c3 * t1x + c4 * t2x;
      y = c1 * _pts[i + 1] + c2 * _pts[i + 3] + c3 * t1y + c4 * t2y;

      //store points in array
      res.push(x);
      res.push(y);
    }
  }

  return res;
}
