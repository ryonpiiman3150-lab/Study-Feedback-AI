const form = document.querySelector("#feedbackForm");
const formError = document.querySelector("#formError");
const problemInput = document.querySelector("#problem");
const explanationInput = document.querySelector("#explanation");
const problemCount = document.querySelector("#problemCount");
const explanationCount = document.querySelector("#explanationCount");
const templateButton = document.querySelector("#templateButton");
const sampleButton = document.querySelector("#sampleButton");
const editButton = document.querySelector("#editButton");
const scoreValue = document.querySelector("#scoreValue");
const scoreFill = document.querySelector("#scoreFill");
const strengthList = document.querySelector("#strengthList");
const gapList = document.querySelector("#gapList");
const nextList = document.querySelector("#nextList");
const studyPlanList = document.querySelector("#studyPlanList");
const usedTermsBox = document.querySelector("#usedTerms");
const missingTermsBox = document.querySelector("#missingTerms");
const premiseNode = document.querySelector("#premiseNode");
const reasonNode = document.querySelector("#reasonNode");
const answerNode = document.querySelector("#answerNode");
const todayLabel = document.querySelector("#todayLabel");
const subjectInputs = document.querySelectorAll('input[name="subject"]');
const problemChip = document.querySelector("#problemChip");
const premiseChip = document.querySelector("#premiseChip");
const reasonChip = document.querySelector("#reasonChip");
const answerChip = document.querySelector("#answerChip");

const subjectData = {
  math: {
    label: "数学",
    premise: ["条件", "定義", "範囲", "式", "単位", "問題文"],
    reason: ["公式", "変形", "代入", "場合", "証明", "性質", "因数分解"],
    next: "使った公式や定義が、どの条件で成り立つかを言葉で確認する",
    problemPlaceholder: "問題文、式、図形の条件、求めるものを貼り付け",
    explanationPlaceholder: "使った条件、式変形の理由、最後の答えを自分の言葉で説明",
    sampleProblem: "2次方程式 x^2 - 5x + 6 = 0 を解きなさい。なぜその解き方で答えが求められるのかも説明しなさい。",
    sampleExplanation: "x^2 - 5x + 6 = 0 は因数分解で考える。かけて6、足して-5になる2つの数は-2と-3なので、(x - 2)(x - 3) = 0 になる。積が0ならどちらかの因数が0になるから、x = 2 または x = 3 が答えになる。"
  },
  science: {
    label: "理科",
    premise: ["条件", "実験", "観察", "変化", "単位", "物質"],
    reason: ["原因", "結果", "法則", "比較", "根拠", "性質"],
    next: "現象を原因、条件、結果に分けて説明する",
    problemPlaceholder: "実験条件、観察結果、グラフや表、問われていることを貼り付け",
    explanationPlaceholder: "何が原因で、どの条件のときに、どんな結果になるのかを説明",
    sampleProblem: "水を加熱すると温度が上がり、100℃付近で沸騰した。沸騰中に温度がほぼ一定になる理由を説明しなさい。",
    sampleExplanation: "沸騰中は加えた熱が水の温度を上げることより、水を水蒸気に変えることに使われる。だから熱を加えていても、沸騰している間は温度がほぼ一定になる。"
  },
  language: {
    label: "国語",
    premise: ["本文", "筆者", "根拠", "指示語", "接続語", "主張"],
    reason: ["理由", "対比", "言い換え", "心情", "根拠", "つまり"],
    next: "本文中の根拠と自分の解釈を分けて書く",
    problemPlaceholder: "本文、設問、選択肢、傍線部の前後を貼り付け",
    explanationPlaceholder: "本文のどこを根拠にしたのか、自分の解釈と分けて説明",
    sampleProblem: "傍線部のときの登場人物の気持ちを、本文中の表現を根拠に説明しなさい。",
    sampleExplanation: "直前に『黙ってうつむいた』とあるので、登場人物は言い返したい気持ちはあるが、相手に強く言えず迷っていると考えられる。だから傍線部では、不安とためらいが混ざった気持ちだと思う。"
  },
  social: {
    label: "社会",
    premise: ["時代", "地域", "背景", "原因", "結果", "制度"],
    reason: ["影響", "関係", "比較", "変化", "理由", "つながり"],
    next: "出来事の背景、原因、結果を一本の流れにする",
    problemPlaceholder: "出来事、時代、地域、資料、問われていることを貼り付け",
    explanationPlaceholder: "背景、原因、結果、ほかの出来事とのつながりを説明",
    sampleProblem: "明治政府が地租改正を行った目的を説明しなさい。",
    sampleExplanation: "政府は安定した財源を必要としていた。地租改正では土地の価格をもとに税を現金で納めさせたので、米の収穫量に左右されにくくなった。だから目的は、国の収入を安定させることだといえる。"
  },
  english: {
    label: "英語",
    premise: ["主語", "動詞", "時制", "目的語", "修飾", "文型"],
    reason: ["文型", "接続詞", "関係詞", "根拠", "訳", "構造"],
    next: "文の骨格と修飾部分を分けて説明する",
    problemPlaceholder: "英文、設問、選択肢、訳したい文を貼り付け",
    explanationPlaceholder: "主語・動詞・修飾語を分けて、なぜその訳になるか説明",
    sampleProblem: "次の英文を訳し、文の構造を説明しなさい。The book that I bought yesterday was interesting.",
    sampleExplanation: "主語はThe bookで、動詞はwas。that I bought yesterdayはbookを説明している関係代名詞の部分。だから全体は『私が昨日買った本はおもしろかった』という意味になる。"
  }
};

const stopWords = new Set([
  "これ", "それ", "ため", "こと", "もの", "よう", "とき", "どれ", "ここ",
  "する", "ある", "いる", "なる", "から", "まで", "です", "ます", "この",
  "その", "問題", "次", "答え", "解説", "説明", "自分", "言葉"
]);

function getSelectedSubject() {
  return new FormData(form).get("subject") || "math";
}

function updateSubjectTheme() {
  const subject = getSelectedSubject();
  const config = subjectData[subject];
  document.body.dataset.subject = subject;
  problemInput.placeholder = config.problemPlaceholder;
  explanationInput.placeholder = config.explanationPlaceholder;
  updateChecklist();
}

function updateCounts() {
  problemCount.textContent = `${problemInput.value.length}文字`;
  explanationCount.textContent = `${explanationInput.value.length}文字`;
  clearInputError();
  updateChecklist();
}

function clearInputError() {
  formError.textContent = "";
  problemInput.classList.remove("input-error");
  explanationInput.classList.remove("input-error");
}

function setTodayLabel() {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric",
    weekday: "short"
  });
  todayLabel.textContent = formatter.format(new Date());
}

function unique(items) {
  return [...new Set(items)];
}

function getTerms(text) {
  const normalized = text
    .replace(/[。、，．！？\n\r\t()[\]{}「」『』:：;；]/g, " ")
    .replace(/\s+/g, " ");

  const latin = normalized.match(/[A-Za-z][A-Za-z0-9_^+\-*/=]{1,}/g) || [];
  const formulas = normalized.match(/[0-9]+(?:\.[0-9]+)?|[A-Za-z0-9_^]+\s*[=+\-*/]\s*[A-Za-z0-9_^+\-*/]+/g) || [];
  const japanese = normalized.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]{2,}/gu) || [];

  return unique([...latin, ...formulas, ...japanese])
    .map((term) => term.trim())
    .filter((term) => term.length >= 2 && !stopWords.has(term))
    .slice(0, 18);
}

function termAppearsInText(term, text, textTerms = getTerms(text)) {
  if (text.includes(term)) return true;
  return textTerms.some((candidate) => {
    if (candidate.length < 2) return false;
    return term.includes(candidate) || candidate.includes(term);
  });
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function getSignals(explanation, subject) {
  const config = subjectData[subject];
  const hasPremise = containsAny(explanation, config.premise) || /与えられ|条件|前提|本文|式|主語|実験|資料/.test(explanation);
  const hasReason = containsAny(explanation, config.reason) || /なぜ|理由|だから|なので|から|ので|よって|根拠|つまり|性質|公式/.test(explanation);
  const hasAnswer = /答え|結論|求める|したがって|つまり|になる|いえる|わかる|意味/.test(explanation);
  const hasUncertainty = /たぶん|なんとなく|わからない|不明|多分|気がする/.test(explanation);
  return { hasPremise, hasReason, hasAnswer, hasUncertainty };
}

function updateChecklist() {
  const subject = getSelectedSubject();
  const explanation = explanationInput.value.trim();
  const signals = getSignals(explanation, subject);

  problemChip.classList.toggle("done", problemInput.value.trim().length >= 20);
  premiseChip.classList.toggle("done", signals.hasPremise);
  reasonChip.classList.toggle("done", signals.hasReason);
  answerChip.classList.toggle("done", signals.hasAnswer);
}

function renderList(target, items) {
  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

function renderTerms(target, terms) {
  target.innerHTML = "";
  if (!terms.length) {
    target.textContent = "まだありません";
    return;
  }
  terms.slice(0, 6).forEach((term) => {
    const span = document.createElement("span");
    span.textContent = term;
    target.appendChild(span);
  });
}

function setNodeState(node, state) {
  node.classList.remove("active", "warn", "missing");
  node.classList.add(state);
}

function analyze({ problem, explanation, subject, tone }) {
  const config = subjectData[subject];
  const problemTerms = getTerms(problem);
  const explanationTerms = getTerms(explanation);
  const usedTerms = problemTerms.filter((term) => termAppearsInText(term, explanation, explanationTerms));
  const missingTerms = problemTerms.filter((term) => !termAppearsInText(term, explanation, explanationTerms)).slice(0, 5);
  const { hasPremise, hasReason, hasAnswer, hasUncertainty } = getSignals(explanation, subject);
  const enoughLength = explanation.length >= 80;
  const referencesProblem = usedTerms.length >= Math.min(3, Math.max(1, problemTerms.length));

  let score = 22;
  if (problem.length >= 30) score += 8;
  if (enoughLength) score += 18;
  if (referencesProblem) score += 18;
  if (hasPremise) score += 12;
  if (hasReason) score += 14;
  if (hasAnswer) score += 10;
  if (hasUncertainty) score -= 8;
  if (tone === "strict") score -= 6;
  if (tone === "gentle") score += 4;
  score = Math.max(0, Math.min(100, score));

  const strengths = [];
  if (referencesProblem) strengths.push("問題文に出てくる重要語を、自分の解説の中で扱えています。");
  if (hasPremise) strengths.push("条件や前提に触れているため、解き始めの土台は作れています。");
  if (hasReason) strengths.push("理由や根拠を説明しようとしているので、丸暗記から一歩進めています。");
  if (hasAnswer) strengths.push("結論までつなげようとしているため、解答の流れが見えます。");
  if (strengths.length === 0) strengths.push("まず自分の言葉で説明を書き始められている点が大事です。");

  const gaps = [];
  if (!enoughLength) gaps.push("説明が短く、考えた手順や理由がまだ外から見えにくいです。");
  if (!referencesProblem && missingTerms.length) gaps.push(`問題文の重要語「${missingTerms.slice(0, 3).join("・")}」が解説に出ていません。ここを使って説明できるか確認してください。`);
  if (!hasPremise) gaps.push("どの条件や前提を使ったのかが薄いため、別の問題で同じ考え方を使いにくい状態です。");
  if (!hasReason) gaps.push("式や結論に進む理由が不足しています。なぜその操作や判断をしたのかを一文足してください。");
  if (!hasAnswer) gaps.push("最後に何を求めたのか、結論が読み取りにくいです。答えまでの着地を明確にしましょう。");
  if (hasUncertainty) gaps.push("「なんとなく」に近い表現があります。そこが理解の穴である可能性が高いです。");
  if (gaps.length === 0) gaps.push("大きな抜けは少なめです。次は説明をより短く、正確に言い直せるか試しましょう。");

  const next = [];
  next.push(config.next);
  if (missingTerms.length) next.push(`「${missingTerms[0]}」を使って、解き方を一文で説明する`);
  if (!hasReason) next.push("手順ごとに「なぜそうするのか」を書き足す");
  if (!hasPremise) next.push("問題文から使った条件を先に箇条書きにする");
  if (!hasAnswer) next.push("最後に「だから答えは何か」を一文で閉じる");
  next.push("似た問題を1問選び、同じ説明で解けるか確認する");

  const nextItems = unique(next).slice(0, 5);
  const studyPlan = buildStudyPlan({
    nextItems,
    missingTerms,
    hasPremise,
    hasReason,
    hasAnswer,
    subject
  });

  return {
    score,
    strengths,
    gaps,
    next: nextItems,
    studyPlan,
    usedTerms: usedTerms.length ? usedTerms : explanationTerms.slice(0, 5),
    missingTerms,
    states: {
      premise: hasPremise ? "active" : "missing",
      reason: hasReason ? "active" : "warn",
      answer: hasAnswer ? "active" : "warn"
    }
  };
}

function buildStudyPlan({ nextItems, missingTerms, hasPremise, hasReason, hasAnswer, subject }) {
  const plan = [];

  if (!hasPremise) {
    plan.push("最初に、問題文から使う条件だけを3つ抜き出す練習をする。解き始める前に条件メモを作ると、前提の抜けを減らせます。");
  }

  if (!hasReason) {
    plan.push("解いた手順の横に「なぜそうするか」を一文ずつ書く。公式名だけでなく、その公式を使える条件まで確認します。");
  }

  if (!hasAnswer) {
    plan.push("最後の一行だけを練習する。途中式や根拠から「だから答えは何か」まで、毎回同じ型で閉じます。");
  }

  if (missingTerms.length) {
    plan.push(`問題文の重要語「${missingTerms[0]}」を説明カードにする。意味、使う場面、今回の問題での役割を1枚にまとめます。`);
  }

  if (subject === "english") {
    plan.push("英文は主語と動詞を先に囲み、修飾語を外して骨格だけで意味を取る練習をします。");
  } else if (subject === "language") {
    plan.push("本文の根拠に線を引き、自分の解釈と本文に書いてあることを分けて説明する練習をします。");
  } else if (subject === "science") {
    plan.push("原因、条件、結果の3列で整理してから、同じ法則が使える別の現象を1つ探します。");
  } else if (subject === "social") {
    plan.push("背景、原因、結果を時系列に並べ、出来事同士のつながりを矢印で説明します。");
  } else {
    plan.push("同じ単元の基本問題を2問解き、使った定義や公式が同じかを比べます。");
  }

  plan.push(`仕上げに、次の目標を声に出して説明します。「${nextItems[0]}」。説明が止まった場所をもう一度復習してください。`);

  return unique(plan).slice(0, 5);
}

function showEmptyState() {
  renderList(strengthList, ["問題とあなたの解説の両方を入力してください。"]);
  renderList(gapList, ["片方だけでは、理解のズレを見つけにくいです。"]);
  renderList(nextList, ["まず問題文を貼り、次に自分の言葉で解説を書きます。"]);
  renderList(studyPlanList, ["入力後、理解の穴に合わせた勉強メニューを表示します。"]);
  renderTerms(usedTermsBox, []);
  renderTerms(missingTermsBox, []);
  scoreValue.textContent = "--";
  scoreFill.style.width = "0%";
  setNodeState(premiseNode, "missing");
  setNodeState(reasonNode, "warn");
  setNodeState(answerNode, "warn");
}

function showFeedback(event) {
  event.preventDefault();
  const problem = problemInput.value.trim();
  const explanation = explanationInput.value.trim();

  if (!problem || !explanation) {
    const missingFields = [];
    if (!problem) {
      missingFields.push("問題");
      problemInput.classList.add("input-error");
    }
    if (!explanation) {
      missingFields.push("あなたの解説");
      explanationInput.classList.add("input-error");
    }
    formError.textContent = `${missingFields.join("と")}を入力してください。`;
    (problem ? explanationInput : problemInput).focus();
    return;
  }

  clearInputError();
  const data = new FormData(form);
  const result = analyze({
    problem,
    explanation,
    subject: data.get("subject"),
    tone: data.get("tone")
  });

  scoreValue.textContent = `${result.score}`;
  scoreFill.style.width = `${result.score}%`;
  renderList(strengthList, result.strengths);
  renderList(gapList, result.gaps);
  renderList(nextList, result.next);
  renderList(studyPlanList, result.studyPlan);
  renderTerms(usedTermsBox, result.usedTerms);
  renderTerms(missingTermsBox, result.missingTerms);
  setNodeState(premiseNode, result.states.premise);
  setNodeState(reasonNode, result.states.reason);
  setNodeState(answerNode, result.states.answer);
  document.body.classList.add("feedback-mode");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function returnToInput() {
  document.body.classList.remove("feedback-mode");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function fillTemplate() {
  const subject = getSelectedSubject();
  const prefix = subject === "english"
    ? "まず文の中心は、【主語】が【動詞】する形です。"
    : "まずこの問題で使う条件は、【条件】です。";
  const template = `${prefix}
次に、【理由・公式・本文の根拠】から、【途中の考え方】がいえます。
だから、結論は【答え・主張】になります。`;

  explanationInput.value = explanationInput.value.trim()
    ? `${explanationInput.value.trim()}\n\n${template}`
    : template;
  updateCounts();
  explanationInput.focus();
}

function fillSample() {
  const subject = getSelectedSubject();
  const config = subjectData[subject];
  problemInput.value = config.sampleProblem;
  explanationInput.value = config.sampleExplanation;
  updateCounts();
}

problemInput.addEventListener("input", updateCounts);
explanationInput.addEventListener("input", updateCounts);
subjectInputs.forEach((input) => {
  input.addEventListener("change", updateSubjectTheme);
});
templateButton.addEventListener("click", fillTemplate);
sampleButton.addEventListener("click", fillSample);
editButton.addEventListener("click", returnToInput);
form.addEventListener("submit", showFeedback);

setTodayLabel();
updateSubjectTheme();
updateCounts();
