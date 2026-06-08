function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(items) {
  return items[randInt(0, items.length - 1)];
}

function formatRemainder(value) {
  return value === 0 ? "" : `……${value}`;
}

function generateDivisionPlace() {
  const divisor = randInt(31, 89);
  const quotient = Math.random() < 0.35 ? randInt(3, 9) : randInt(21, 78);
  const remainder = randInt(0, divisor - 1);
  const dividend = divisor * quotient + remainder;
  const head = Math.floor(dividend / 10);
  const place = head >= divisor ? "十位" : "个位";
  return {
    question: `${dividend}÷${divisor}，商的第一位应该写在哪一位？再算出结果。`,
    answer: `${place}；${dividend}÷${divisor}=${quotient}${formatRemainder(remainder)}。`,
    steps: [`先看 ${head} ${head >= divisor ? "够" : "不够"}除以 ${divisor}。`, `所以商的第一位写在${place}。`, `计算得到 ${divisor}×${quotient}+${remainder}=${dividend}。`]
  };
}

function generateTrialDivision() {
  if (Math.random() < 0.5) {
    const divisor = randInt(24, 48);
    const tens = randInt(1, 9);
    const minHundreds = Math.max(1, Math.ceil((divisor - tens) / 10));
    return {
      question: `□${tens}${randInt(0, 9)}${randInt(0, 9)}÷${divisor}，如果商是三位数，□里最小能填几？`,
      answer: `${minHundreds}。`,
      steps: [`商是三位数，前两位组成的数要够除 ${divisor}。`, `□${tens} 至少要大于或等于 ${divisor}。`, `所以□里最小填 ${minHundreds}。`]
    };
  }
  const divisor = randInt(18, 49);
  const quotient = randInt(8, 28);
  const remainder = divisor - 1;
  const dividend = divisor * quotient + remainder;
  return {
    question: `A÷${divisor}=${quotient}……B，B最大是多少？这时A是多少？`,
    answer: `B最大是${remainder}；A=${dividend}。`,
    steps: [`余数必须小于除数，所以B最大是 ${divisor}-1=${remainder}。`, `A=${divisor}×${quotient}+${remainder}。`, `算出A=${dividend}。`]
  };
}

function generateAverageSpeed() {
  const time = randInt(5, 12);
  const speed = randInt(45, 95);
  const first = randInt(2, time - 2) * speed;
  const total = time * speed;
  const second = total - first;
  const places = ["书店", "邮局", "少年宫", "体育馆", "图书馆"];
  const place = pick(places);
  return {
    question: `从家到${place}${first}米，从${place}到学校${second}米，一共走了${time}分钟，平均每分钟走多少米？`,
    answer: `${speed}米/分。`,
    steps: [`先求总路程：${first}+${second}=${total}米。`, `再求平均速度：${total}÷${time}=${speed}米/分。`]
  };
}

function generateTwoStepAverage() {
  const groups = randInt(6, 12);
  const each = randInt(24, 68);
  const left = groups * each;
  const done = randInt(220, 680);
  const total = done + left;
  const objects = ["纸鹤", "小红花", "练习本", "爱心卡片"];
  const object = pick(objects);
  return {
    question: `班级要准备${total}个${object}，已经完成${done}个，剩下由${groups}个小组平均完成，每组要做多少个？`,
    answer: `${each}个。`,
    steps: [`先求剩下：${total}-${done}=${left}。`, `再平均分：${left}÷${groups}=${each}。`]
  };
}

function generateAreaUnit() {
  if (Math.random() < 0.5) {
    const value = randInt(3, 48);
    return {
      question: `${value}平方米=多少平方分米？`,
      answer: `${value * 100}平方分米。`,
      steps: ["1平方米=100平方分米。", `${value}×100=${value * 100}。`]
    };
  }
  const value = randInt(2, 36);
  return {
    question: `${value * 100}平方厘米=多少平方分米？`,
    answer: `${value}平方分米。`,
    steps: ["1平方分米=100平方厘米。", `${value * 100}÷100=${value}。`]
  };
}

function generateShapeTable() {
  if (Math.random() < 0.5) {
    const length = randInt(12, 32);
    const width = randInt(4, 15);
    return {
      question: `长方形长${length}厘米，宽${width}厘米，周长是多少？面积是多少？`,
      answer: `周长${(length + width) * 2}厘米；面积${length * width}平方厘米。`,
      steps: [`周长=(${length}+${width})×2=${(length + width) * 2}厘米。`, `面积=${length}×${width}=${length * width}平方厘米。`]
    };
  }
  const side = randInt(6, 18);
  return {
    question: `正方形边长${side}分米，周长是多少？面积是多少？`,
    answer: `周长${side * 4}分米；面积${side * side}平方分米。`,
    steps: [`周长=${side}×4=${side * 4}分米。`, `面积=${side}×${side}=${side * side}平方分米。`]
  };
}

function generateMaxArea() {
  const side = randInt(4, 12);
  const perimeter = side * 4;
  return {
    question: `用${perimeter}厘米长的绳子围长方形，长和宽都是整厘米，怎样围面积最大？最大面积是多少？`,
    answer: `围成${side}厘米×${side}厘米的正方形，最大面积是${side * side}平方厘米。`,
    steps: [`周长${perimeter}厘米，所以长+宽=${perimeter / 2}厘米。`, "同样周长时，长和宽越接近面积越大。", `最接近的是${side}和${side}，面积=${side}×${side}=${side * side}平方厘米。`]
  };
}

function generateCompositeArea() {
  if (Math.random() < 0.5) {
    const first = randInt(18, 72);
    const second = randInt(12, 56);
    return {
      question: `一个组合图形可以拆成两个长方形，面积分别是${first}平方厘米和${second}平方厘米，总面积是多少？`,
      answer: `${first + second}平方厘米。`,
      steps: ["组合图形面积可以拆开相加。", `${first}+${second}=${first + second}平方厘米。`]
    };
  }
  const big = randInt(80, 180);
  const cut = randInt(12, 48);
  return {
    question: `大长方形面积${big}平方厘米，挖去一个${cut}平方厘米的小长方形，剩下面积是多少？`,
    answer: `${big - cut}平方厘米。`,
    steps: ["剩下面积=大图形面积-挖去面积。", `${big}-${cut}=${big - cut}平方厘米。`]
  };
}

function generateLargeMultiply() {
  const a = randInt(106, 408);
  const b = randInt(21, 49);
  const ones = b % 10;
  const tens = b - ones;
  return {
    question: `计算 ${a}×${b}。`,
    answer: `${a * b}。`,
    steps: [`${a}×${ones}=${a * ones}。`, `${a}×${tens}=${a * tens}。`, `${a * ones}+${a * tens}=${a * b}。`]
  };
}

function generateOrderOps() {
  if (Math.random() < 0.5) {
    const a = randInt(500, 980);
    const d = pick([4, 5, 6, 8]);
    const adjustedInside = d * randInt(30, 80);
    const c = randInt(40, Math.min(220, adjustedInside - 20));
    return {
      question: `计算 ${a}-(${adjustedInside - c}+${c})÷${d}。`,
      answer: `${a - adjustedInside / d}。`,
      steps: [`先算括号：${adjustedInside - c}+${c}=${adjustedInside}。`, `再算除法：${adjustedInside}÷${d}=${adjustedInside / d}。`, `最后算减法：${a}-${adjustedInside / d}=${a - adjustedInside / d}。`]
    };
  }
  const left = randInt(24, 68);
  const m = randInt(130, 260);
  const n = randInt(70, 120);
  const add = randInt(18, 90);
  return {
    question: `计算 ${left}×(${m}-${n})+${add}。`,
    answer: `${left * (m - n) + add}。`,
    steps: [`先算括号：${m}-${n}=${m - n}。`, `再算乘法：${left}×${m - n}=${left * (m - n)}。`, `最后加${add}，得${left * (m - n) + add}。`]
  };
}

function generatePlanCompare() {
  if (Math.random() < 0.5) {
    const people = pick([8, 10, 12, 15]);
    const price = randInt(22, 46);
    const group = people * price - randInt(18, 70);
    return {
      question: `每张票${price}元，${people}人团体票${group}元。${people}个人买哪种更省？省多少元？`,
      answer: `买团体票更省，省${people * price - group}元。`,
      steps: [`单买：${price}×${people}=${people * price}元。`, `团体票：${group}元。`, `${people * price}-${group}=${people * price - group}元。`]
    };
  }
  const price = randInt(58, 98);
  const count = randInt(4, 8);
  const threshold = pick([200, 300, 400]);
  const discount = pick([30, 50, 80]);
  const total = price * count;
  const pay = total >= threshold ? total - discount : total;
  return {
    question: `书包每个${price}元，满${threshold}减${discount}。买${count}个实际要付多少元？`,
    answer: `${pay}元。`,
    steps: [`原价：${price}×${count}=${total}元。`, total >= threshold ? `${total}元满${threshold}，减${discount}元。` : `${total}元不满${threshold}，不能优惠。`, `实际支付${pay}元。`]
  };
}

const generators = {
  divisionPlace: generateDivisionPlace,
  trialDivision: generateTrialDivision,
  averageSpeed: generateAverageSpeed,
  twoStepAverage: generateTwoStepAverage,
  areaUnit: generateAreaUnit,
  shapeTable: generateShapeTable,
  maxArea: generateMaxArea,
  compositeArea: generateCompositeArea,
  largeMultiply: generateLargeMultiply,
  orderOps: generateOrderOps,
  planCompare: generatePlanCompare
};

export function generatePracticeItem(practiceSet, fallbackIndex = 0) {
  const generator = practiceSet?.generator ? generators[practiceSet.generator] : null;
  if (generator) return generator();
  if (practiceSet?.items?.length) return practiceSet.items[fallbackIndex % practiceSet.items.length];
  return null;
}
