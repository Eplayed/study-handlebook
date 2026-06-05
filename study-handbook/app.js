(function () {
  const state = {
    gradeId: "",
    subjectId: "",
    query: "",
    mode: "review"
  };

  const els = {
    gradeSelect: document.querySelector("#gradeSelect"),
    subjectSelect: document.querySelector("#subjectSelect"),
    searchInput: document.querySelector("#searchInput"),
    modeSelect: document.querySelector("#modeSelect"),
    sectionNav: document.querySelector("#sectionNav"),
    overview: document.querySelector("#overview"),
    modePanel: document.querySelector("#modePanel"),
    plan: document.querySelector("#plan"),
    sourceSummary: document.querySelector("#sourceSummary"),
    cards: document.querySelector("#cards"),
    practice: document.querySelector("#practice"),
    unitMap: document.querySelector("#unitMap"),
    checklist: document.querySelector("#checklist"),
    maintenance: document.querySelector("#maintenance"),
    printBtn: document.querySelector("#printBtn"),
    resetChecksBtn: document.querySelector("#resetChecksBtn")
  };

  const content = window.HANDBOOK_CONTENT;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getGrade() {
    return content.grades.find((grade) => grade.id === state.gradeId) || content.grades[0];
  }

  function getSubject() {
    const grade = getGrade();
    return grade.subjects.find((subject) => subject.id === state.subjectId) || grade.subjects[0];
  }

  function fillSelect(select, items, selectedId) {
    select.innerHTML = items.map((item) => {
      const selected = item.id === selectedId ? " selected" : "";
      return `<option value="${escapeHtml(item.id)}"${selected}>${escapeHtml(item.label)}</option>`;
    }).join("");
  }

  function tableHtml(headers, rows) {
    if (!rows || rows.length === 0) {
      return `<div class="empty">这里还没有内容。以后把资料加到 <strong>content.js</strong>，页面会自动显示。</div>`;
    }
    return `
      <table>
        <thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    `;
  }

  function subjectKey(name) {
    return `handbook:${state.gradeId}:${state.subjectId}:${name}`;
  }

  function checklistKey(item) {
    return `handbook:${state.gradeId}:${state.subjectId}:${item}`;
  }

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  function addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function cardId(card) {
    return `${card.title}:${card.example}`;
  }

  function renderOverview(subject) {
    els.overview.innerHTML = `
      <h2>${escapeHtml(subject.title)}</h2>
      <p>${escapeHtml(subject.summary)}</p>
      <div class="meta-row">
        ${subject.tags.map((tag) => `<span class="tag important">${escapeHtml(tag)}</span>`).join("")}
        <span class="tag">更新：${escapeHtml(content.updatedAt)}</span>
      </div>
    `;
  }

  function renderModePanel(subject) {
    els.modePanel.id = "mode";
    if (state.mode === "wrongbook") {
      renderWrongBook(subject);
      return;
    }
    if (state.mode === "quiz") {
      renderQuiz(subject);
      return;
    }
    if (state.mode === "spaced") {
      renderSpaced(subject);
      return;
    }
    els.modePanel.innerHTML = `
      <h2>复习卡模式</h2>
      <div class="tool-grid">
        <div class="study-card ${escapeHtml(subject.theme)}">
          <h3>孩子怎么用</h3>
          <ol>
            <li>先读“给孩子的话”。</li>
            <li>照着“怎么做”说一遍步骤。</li>
            <li>遮住答案做例题。</li>
            <li>看“易错提醒”，再做同类题。</li>
          </ol>
        </div>
        <div class="study-card">
          <h3>家长怎么维护</h3>
          <p>每张卡只讲一个考点。新增错题时，也按“考什么、怎么做、例题、答案、易错提醒”写，孩子才看得懂。</p>
        </div>
      </div>
    `;
  }

  function renderWrongBook(subject) {
    const key = subjectKey("wrongbook");
    const entries = readJson(key, []);
    els.modePanel.innerHTML = `
      <h2>错题本模式</h2>
      <div class="tool-grid">
        <form id="wrongForm" class="study-card wrong">
          <h3>新增一道错题</h3>
          <div class="form-row">
            <label for="wrongTitle">错题标题</label>
            <input id="wrongTitle" type="text" placeholder="例如：周长和面积混了">
          </div>
          <div class="form-row">
            <label for="wrongQuestion">题目</label>
            <textarea id="wrongQuestion" rows="3" placeholder="把题目关键条件写下来"></textarea>
          </div>
          <div class="form-row">
            <label for="wrongAnswer">正确答案</label>
            <textarea id="wrongAnswer" rows="2" placeholder="写完整答案和单位"></textarea>
          </div>
          <div class="form-row">
            <label for="wrongReason">我为什么错</label>
            <textarea id="wrongReason" rows="2" placeholder="例如：把面积单位写成了厘米"></textarea>
          </div>
          <div class="form-row">
            <label for="wrongDue">几天后再做</label>
            <input id="wrongDue" type="number" min="1" max="30" value="2">
          </div>
          <button class="small-button primary" type="submit">保存错题</button>
        </form>
        <div class="study-card">
          <h3>错题复习规则</h3>
          <p>不要只抄答案。每道错题都要写清楚：我错在哪里、正确步骤是什么、几天后再做。</p>
          <p class="empty">错题保存在当前浏览器里，不会上传到网络。</p>
        </div>
      </div>
      <h3>已保存错题</h3>
      <div id="wrongList">
        ${entries.length === 0 ? `<div class="empty">还没有错题。做卷子时错一道，就加一道。</div>` : entries.map((entry, index) => wrongEntryHtml(entry, index)).join("")}
      </div>
    `;

    els.modePanel.querySelector("#wrongForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const title = els.modePanel.querySelector("#wrongTitle").value.trim();
      const question = els.modePanel.querySelector("#wrongQuestion").value.trim();
      const answer = els.modePanel.querySelector("#wrongAnswer").value.trim();
      const reason = els.modePanel.querySelector("#wrongReason").value.trim();
      const dueDays = Number(els.modePanel.querySelector("#wrongDue").value || 2);
      if (!title || !question || !answer) return;
      entries.unshift({ title, question, answer, reason, createdAt: todayIso(), dueAt: addDays(dueDays) });
      writeJson(key, entries);
      renderWrongBook(subject);
    });

    els.modePanel.querySelectorAll("[data-delete-wrong]").forEach((button) => {
      button.addEventListener("click", () => {
        entries.splice(Number(button.dataset.deleteWrong), 1);
        writeJson(key, entries);
        renderWrongBook(subject);
      });
    });
  }

  function wrongEntryHtml(entry, index) {
    const due = entry.dueAt <= todayIso() ? `<span class="due">今天该重做</span>` : `下次：${escapeHtml(entry.dueAt)}`;
    return `
      <article class="wrong-entry">
        <h3>${escapeHtml(entry.title)}</h3>
        <p><strong>题目：</strong>${escapeHtml(entry.question)}</p>
        <p><strong>答案：</strong>${escapeHtml(entry.answer)}</p>
        <p><strong>错因：</strong>${escapeHtml(entry.reason || "还没写错因")}</p>
        <p><strong>保存：</strong>${escapeHtml(entry.createdAt)}；${due}</p>
        <button class="small-button" type="button" data-delete-wrong="${index}">删除</button>
      </article>
    `;
  }

  function renderQuiz(subject) {
    const rows = subject.practice || [];
    els.modePanel.innerHTML = `
      <h2>每日小测模式</h2>
      <p>先遮住答案做题，再点“显示答案”。每天做5-10题就够，关键是订正。</p>
      ${rows.length === 0 ? `<div class="empty">这个学科还没有小测题。可以在 content.js 的 practice 里添加。</div>` : rows.map((row, index) => `
        <article class="quiz-entry">
          <h3>第${index + 1}题</h3>
          <p>${escapeHtml(row[0])}</p>
          <button class="small-button answer-toggle" type="button" data-answer="${index}">显示答案</button>
          <div class="answer hidden" id="quizAnswer${index}">
            <p><strong>答案：</strong>${escapeHtml(row[1])}</p>
            <p><strong>检查点：</strong>${escapeHtml(row[2] || "")}</p>
          </div>
        </article>
      `).join("")}
    `;
    els.modePanel.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => {
        const answer = els.modePanel.querySelector(`#quizAnswer${button.dataset.answer}`);
        answer.classList.toggle("hidden");
        button.textContent = answer.classList.contains("hidden") ? "显示答案" : "隐藏答案";
      });
    });
  }

  function renderSpaced(subject) {
    const key = subjectKey("spaced");
    const reviews = readJson(key, {});
    const dueCards = subject.cards.filter((card) => {
      const dueAt = reviews[cardId(card)] || todayIso();
      return dueAt <= todayIso();
    });
    els.modePanel.innerHTML = `
      <h2>间隔复习模式</h2>
      <p>会的卡片隔2天再看，不会的明天再看。这样错题和易错点不会只看一遍就忘。</p>
      ${dueCards.length === 0 ? `<div class="empty">今天没有到期卡片。可以切到“复习卡”自由查看。</div>` : dueCards.map((card, index) => `
        <article class="spaced-entry">
          <span class="tag important">${escapeHtml(card.level)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.childText)}</p>
          <p><strong>例题：</strong>${escapeHtml(card.example)}</p>
          <div class="answer"><strong>答案：</strong>${escapeHtml(card.answer)}</div>
          <div class="button-row">
            <button class="small-button primary" type="button" data-review="${index}" data-days="2">会了，2天后再看</button>
            <button class="small-button" type="button" data-review="${index}" data-days="1">还不会，明天再看</button>
          </div>
        </article>
      `).join("")}
    `;
    els.modePanel.querySelectorAll("[data-review]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = dueCards[Number(button.dataset.review)];
        reviews[cardId(card)] = addDays(Number(button.dataset.days));
        writeJson(key, reviews);
        renderSpaced(subject);
      });
    });
  }

  function renderPlan(subject) {
    els.plan.id = "plan";
    els.plan.innerHTML = `
      <h2>两周复习安排</h2>
      ${tableHtml(["时间", "怎么复习"], subject.plan)}
    `;
  }

  function renderSources(subject) {
    els.sourceSummary.id = "sources";
    els.sourceSummary.innerHTML = `
      <h2>资料来源</h2>
      <ul>
        ${subject.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}
      </ul>
      <p class="empty">说明：公开网络上能直接核验的杨浦区三年级完整历年真卷不齐全。本页面把本地校内错题、上海同教材常见卷面题型和教材重点分开处理，不把非杨浦卷冒充为杨浦真卷。</p>
    `;
  }

  function cardMatches(card) {
    if (!state.query) return true;
    const blob = [card.title, card.level, card.source, card.childText, card.example, card.answer, card.mistake, ...(card.how || [])].join(" ").toLowerCase();
    return blob.includes(state.query.toLowerCase());
  }

  function renderCards(subject) {
    els.cards.id = "cards";
    const cards = subject.cards.filter(cardMatches);
    if (subject.cards.length === 0) {
      els.cards.innerHTML = `
        <section class="panel">
          <h2>复习卡</h2>
          <div class="empty">这个年级/学科还没有复习卡。可以在 <strong>content.js</strong> 里按三年级格式添加。</div>
        </section>
      `;
      return;
    }
    els.cards.innerHTML = `
      <section class="panel">
        <h2>复习卡</h2>
        <div class="card-grid">
          ${cards.map((card) => `
            <article class="study-card ${escapeHtml(subject.theme)} ${card.source.includes("错题") ? "wrong" : ""}">
              <div class="meta-row">
                <span class="tag important">${escapeHtml(card.level)}</span>
                <span class="tag source">${escapeHtml(card.source)}</span>
              </div>
              <h3>${escapeHtml(card.title)}</h3>
              <div class="field"><span class="field-title">给孩子的话</span><p>${escapeHtml(card.childText)}</p></div>
              <div class="field"><span class="field-title">怎么做</span><ol>${(card.how || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></div>
              <div class="field"><span class="field-title">例题</span><p>${escapeHtml(card.example)}</p></div>
              <div class="field answer"><span class="field-title">答案</span><p>${escapeHtml(card.answer)}</p></div>
              <div class="field mistake"><span class="field-title">易错提醒</span><p>${escapeHtml(card.mistake)}</p></div>
            </article>
          `).join("")}
        </div>
        ${cards.length === 0 ? `<div class="empty">没有找到包含“${escapeHtml(state.query)}”的复习卡。</div>` : ""}
      </section>
    `;
  }

  function renderPractice(subject) {
    els.practice.id = "practice";
    els.practice.innerHTML = `
      <h2>同类再练</h2>
      ${tableHtml(["题目", "答案", "检查点"], subject.practice)}
    `;
  }

  function renderUnitMap(subject) {
    els.unitMap.id = "unit-map";
    els.unitMap.innerHTML = `
      <h2>单元清单</h2>
      ${tableHtml(["单元", "要会什么", "最容易错什么"], subject.unitMap)}
    `;
  }

  function renderChecklist(subject) {
    els.checklist.id = "checklist";
    els.checklist.innerHTML = `
      <h2>每日打卡</h2>
      <div class="checklist">
        ${subject.checklist.map((item) => {
          const key = checklistKey(item);
          const checked = localStorage.getItem(key) === "1" ? " checked" : "";
          return `<label class="check-item"><input type="checkbox" data-check-key="${escapeHtml(key)}"${checked}><span>${escapeHtml(item)}</span></label>`;
        }).join("")}
      </div>
    `;
    els.checklist.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.addEventListener("change", () => {
        localStorage.setItem(input.dataset.checkKey, input.checked ? "1" : "0");
      });
    });
  }

  function renderMaintenance() {
    els.maintenance.id = "maintenance";
    els.maintenance.innerHTML = `
      <h2>怎么持续维护</h2>
      <ul>
        <li>新增四年级内容：打开 <strong>content.js</strong>，在 <strong>grade4</strong> 对应学科的 <strong>cards</strong>、<strong>practice</strong>、<strong>unitMap</strong> 里添加。</li>
        <li>新增错题：优先写成“孩子能懂”的卡片：考什么、怎么做、例题、答案、易错提醒。</li>
        <li>保留来源：如果来自校内卷或照片，在 <strong>source</strong> 写清楚，方便以后判断真实性。</li>
      </ul>
    `;
  }

  function renderNav() {
    els.sectionNav.innerHTML = [
      ["#mode", "学习模式"],
      ["#plan", "两周安排"],
      ["#sources", "资料来源"],
      ["#cards", "复习卡"],
      ["#practice", "同类再练"],
      ["#unit-map", "单元清单"],
      ["#checklist", "每日打卡"],
      ["#maintenance", "持续维护"]
    ].map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  }

  function render() {
    const grade = getGrade();
    if (!grade.subjects.some((subject) => subject.id === state.subjectId)) {
      state.subjectId = grade.defaultSubject || grade.subjects[0].id;
    }
    const subject = getSubject();
    fillSelect(els.gradeSelect, content.grades, state.gradeId);
    fillSelect(els.subjectSelect, grade.subjects, state.subjectId);
    els.modeSelect.value = state.mode;
    renderOverview(subject);
    renderModePanel(subject);
    renderPlan(subject);
    renderSources(subject);
    renderCards(subject);
    renderPractice(subject);
    renderUnitMap(subject);
    renderChecklist(subject);
    renderMaintenance();
    renderNav();
  }

  function init() {
    state.gradeId = content.grades[0].id;
    state.subjectId = content.grades[0].defaultSubject;

    els.gradeSelect.addEventListener("change", () => {
      state.gradeId = els.gradeSelect.value;
      const grade = getGrade();
      state.subjectId = grade.defaultSubject || grade.subjects[0].id;
      render();
    });

    els.subjectSelect.addEventListener("change", () => {
      state.subjectId = els.subjectSelect.value;
      render();
    });

    els.searchInput.addEventListener("input", () => {
      state.query = els.searchInput.value.trim();
      renderCards(getSubject());
    });

    els.modeSelect.addEventListener("change", () => {
      state.mode = els.modeSelect.value;
      renderModePanel(getSubject());
    });

    els.printBtn.addEventListener("click", () => window.print());
    els.resetChecksBtn.addEventListener("click", () => {
      getSubject().checklist.forEach((item) => localStorage.removeItem(checklistKey(item)));
      renderChecklist(getSubject());
    });

    render();
  }

  init();
})();
