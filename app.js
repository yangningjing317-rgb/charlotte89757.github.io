const HOLLAND_LINK = "https://yangningjing317-rgb.github.io/1307.github.io/holland%20career%20interest%20(English%20version).html";
const CITY_LINK = "https://yangningjing317-rgb.github.io/89757.gitub.io/City%20explore%20English%20version.html";
const WAVE_LINK = "https://yangningjing317-rgb.github.io/0327.github.io/future%20wave%20(English%20version).html";

const storeKey = "pathwise-future-scan-en-v2";
const stage = Number(document.body.dataset.stage || 1);
const app = document.querySelector("#app");

if (!sessionStorage.getItem("pathwiseStarted")) {
  window.location.replace("./index.html");
  throw new Error("Pathwise must start from the opening screen.");
}

const stages = [
  ["Initial Sparks", "Start from the things that once made your attention glow."],
  ["Holland Code", "Enter your code, then choose the careers that still feel alive to you."],
  ["Core Values", "Use your inner compass to narrow the field."],
  ["Family Dynamics", "Turn family expectations into visible decision factors."],
  ["City Ecosystem", "Place ambition inside a real urban economy."],
  ["Future Wave", "Extract or enter six future cards, then build a STEM response."],
  ["Pivot or Persevere", "Decide whether the chosen direction still deserves your commitment."],
  ["Action List", "Translate the dream into tomorrow's first move."],
  ["Time Instance", "Send a message back from your future self."],
  ["Final Synthesis", "Receive your career-centered future scan report."],
];

const values = [
  ["Making money", "Income growth and financial mobility"], ["Becoming well known", "Recognition, visibility, and reputation"],
  ["Helping others", "Improving other people's lives"], ["Managing others", "Leadership, coordination, and responsibility"],
  ["Job security", "Stability, protection, and predictable life design"], ["Working with people", "Communication, collaboration, and human connection"],
  ["Inventing things", "Turning ideas into tools, products, or systems"], ["Developing new knowledge or skills", "Continuous learning and capability growth"],
  ["Family time", "Keeping meaningful space for family life"], ["Having friendship", "Belonging and trusted colleagues"],
  ["Making own decision", "Autonomy and control over work rhythm"], ["Easy job", "Lower pressure and sustainable workload"],
  ["Exciting job", "Challenge, change, and novelty"], ["Making use of my talents", "Using your strengths every day"],
  ["Job opportunities", "Openings, mobility, and market demand"], ["Creative job", "Expression, design, and originality"],
];

const familyFactors = [
  "My family supports exploration", "My family strongly values stability", "My family worries about distance from home",
  "My family can offer industry resources", "My family expects faster income", "My family discusses science or innovation",
  "My family is sensitive to career risk", "I want to protect family time",
];

const cityReasons = [
  "Strong industry opportunities", "Manageable living cost", "Closer to home", "Strong universities and learning resources",
  "Rich internship market", "Cultural atmosphere attracts me", "Good public services", "Housing pressure needs caution",
  "Friends or family are there", "Suitable for long-term settlement",
];

const careerName = {
  "CNC编程技师":"CNC Programming Technician","UI设计师":"UI Designer","UX设计师":"UX Designer","中学教师":"Secondary School Teacher","交互设计研究员":"Interaction Design Researcher","产品经理":"Product Manager","产品结构设计师":"Product Structure Designer","人事薪酬专员":"Compensation Specialist","人力资源专员":"Human Resources Specialist","人力资源经理":"Human Resources Manager","仓储管理员":"Warehouse Administrator","企业培训经理":"Corporate Training Manager","会计":"Accountant","会议会展经理":"Conference and Exhibition Manager","体育教师":"Physical Education Teacher","体育赛事运营":"Sports Event Operations Specialist","供应链经理":"Supply Chain Manager","供应链计划员":"Supply Chain Planner","保险理赔专员":"Insurance Claims Specialist","信息图表设计师":"Infographic Designer","健康教育专员":"Health Education Specialist","儿童发展指导员":"Child Development Advisor","公共关系专员":"Public Relations Specialist","公共卫生研究员":"Public Health Researcher","公关经理":"Public Relations Manager","公益项目官员":"Nonprofit Program Officer","农业技术员":"Agricultural Technician","出版编辑":"Publishing Editor","创业者":"Entrepreneur","制造工艺工程师":"Manufacturing Process Engineer","动画设计师":"Animation Designer","劳动教育教师":"Labor Education Teacher","包装设计师":"Packaging Designer","医务社工":"Medical Social Worker","医学数据分析员":"Medical Data Analyst","医学研究助理":"Medical Research Assistant","医疗编码员":"Medical Coding Specialist","博物馆研究助理":"Museum Research Assistant","博物馆讲解员":"Museum Educator","合同管理员":"Contract Administrator","合规专员":"Compliance Specialist","咨询顾问":"Consultant","品牌策划师":"Brand Strategist","品牌经理":"Brand Manager","商业分析师":"Business Analyst","商业策划专员":"Business Planning Specialist","商务拓展经理":"Business Development Manager","园艺师":"Horticulturist","图书馆活动专员":"Library Program Specialist","图书馆管理员":"Librarian","土木工程师":"Civil Engineer","地产项目营销":"Real Estate Project Marketer","城市规划研究助理":"Urban Planning Research Assistant","培训师":"Trainer","学习支持老师":"Learning Support Teacher","学校辅导员":"School Counselor","安全工程师":"Safety Engineer","实验室技术员":"Laboratory Technician","审计助理":"Audit Assistant","客户成功经理":"Customer Success Manager","客户经理":"Account Manager","客服质检专员":"Customer Service Quality Specialist","室内施工制图员":"Interior Construction Draftsperson","室内设计师":"Interior Designer","家庭教育指导师":"Family Education Advisor","小学教师":"Primary School Teacher","展览策展人":"Exhibition Curator","工业工程师":"Industrial Engineer","工业设计师":"Industrial Designer","工程项目经理":"Engineering Project Manager","市场研究员":"Market Researcher","市场经理":"Marketing Manager","平面设计师":"Graphic Designer","幼儿教师":"Early Childhood Teacher","广告创意策划":"Advertising Creative Planner","康复治疗师":"Rehabilitation Therapist","康复辅具技术员":"Assistive Rehabilitation Device Technician","建筑施工员":"Construction Site Coordinator","建筑模型师":"Architectural Model Maker","建筑设计助理":"Architectural Design Assistant","心理健康教育教师":"Mental Health Education Teacher","心理咨询助理":"Counseling Assistant","心理测评助理":"Psychological Assessment Assistant","志愿者项目主管":"Volunteer Program Supervisor","戏剧教师":"Drama Teacher","技术销售工程师":"Technical Sales Engineer","技术项目主管":"Technical Project Supervisor","技术顾问":"Technical Consultant","投资经理助理":"Investment Manager Assistant","护理人员":"Nursing Staff","招生顾问":"Admissions Counselor","插画师":"Illustrator","摄影师":"Photographer","播客节目策划":"Podcast Producer","政策倡导专员":"Policy Advocacy Specialist","政策研究助理":"Policy Research Assistant","教务管理员":"Academic Affairs Administrator","教育研究员":"Education Researcher","教育项目负责人":"Education Program Lead","数据分析师":"Data Analyst","数据录入员":"Data Entry Specialist","数据治理专员":"Data Governance Specialist","文创产品设计师":"Cultural Product Designer","文化活动策划":"Cultural Event Planner","文案策划":"Copywriter Planner","文献研究编辑":"Research Editor","文秘":"Secretary","新媒体内容创作者":"New Media Content Creator","新媒体运营经理":"New Media Operations Manager","旅游产品经理":"Tourism Product Manager","服装打版师":"Fashion Pattern Maker","服装设计师":"Fashion Designer","机器人技术员":"Robotics Technician","机械工程师":"Mechanical Engineer","材料研发助理":"Materials R&D Assistant","标准化专员":"Standardization Specialist","档案管理员":"Archivist","汽车维修技师":"Automotive Repair Technician","法务助理":"Legal Assistant","活动策划经理":"Event Planning Manager","测量员":"Surveyor","消防救援员":"Fire and Rescue Officer","渠道经理":"Channel Manager","游戏美术设计师":"Game Artist","物流现场主管":"Logistics Site Supervisor","特殊教育教师":"Special Education Teacher","环境监测员":"Environmental Monitoring Technician","环境科学研究员":"Environmental Science Researcher","生产计划员":"Production Planner","生涯规划师":"Career Planning Advisor","生物信息分析师":"Bioinformatics Analyst","用户研究员":"User Researcher","电商运营":"E-commerce Operations Specialist","电气工程师":"Electrical Engineer","知识产权分析师":"Intellectual Property Analyst","社会企业运营者":"Social Enterprise Operator","社会工作者":"Social Worker","社会调查员":"Social Researcher","社区服务专员":"Community Service Specialist","社区艺术指导员":"Community Arts Facilitator","科学插画师":"Scientific Illustrator","科普策划":"Science Communication Planner","科研助理":"Research Assistant","科研项目管理员":"Research Project Administrator","税务专员":"Tax Specialist","算法产品助理":"Algorithm Product Assistant","绘本创作者":"Picture Book Creator","统计分析员":"Statistical Analyst","统计文员":"Statistical Clerk","美术馆教育专员":"Art Museum Education Specialist","考试考务管理员":"Examination Administrator","职业治疗师":"Occupational Therapist","能源系统技术员":"Energy Systems Technician","舞台技术师":"Stage Technician","舞台美术设计师":"Stage Art Designer","航空维修技师":"Aircraft Maintenance Technician","艺术教育教师":"Arts Education Teacher","艺术治疗助理":"Art Therapy Assistant","行政专员":"Administrative Specialist","视觉营销专员":"Visual Merchandising Specialist","视频剪辑师":"Video Editor","设备维护工程师":"Equipment Maintenance Engineer","语言治疗师":"Speech Therapist","课程评估专员":"Curriculum Evaluation Specialist","财务运营专员":"Finance Operations Specialist","质检工程师":"Quality Inspection Engineer","质量体系专员":"Quality Systems Specialist","运营分析师":"Operations Analyst","运营经理":"Operations Manager","采购专员":"Procurement Specialist","金融分析师":"Financial Analyst","银行柜员":"Bank Teller","销售经理":"Sales Manager","门店经理":"Store Manager","音乐教育工作者":"Music Educator","项目文控专员":"Project Document Controller","项目经理":"Project Manager","预算分析员":"Budget Analyst","风控分析师":"Risk Control Analyst","食品工艺技术员":"Food Processing Technician",
  "医生":"Doctor","老师":"Teacher","工程师":"Engineer","律师":"Lawyer","警察":"Police Officer","设计师":"Designer","口腔科医生":"Dentist","社区全科医生":"Community General Practitioner","儿科医生":"Pediatrician","医学影像医生":"Medical Imaging Physician","急诊科医生":"Emergency Physician","中学语文教师":"Secondary Chinese Teacher","小学数学教师":"Primary Mathematics Teacher","科学课程教师":"Science Curriculum Teacher","职业教育教师":"Vocational Education Teacher","大学科研教师":"University Research Faculty","软件工程师":"Software Engineer","新能源工程师":"New Energy Engineer","质量工程师":"Quality Engineer","知识产权律师":"Intellectual Property Lawyer","民商事律师":"Civil and Commercial Lawyer","劳动法律师":"Labor Lawyer","刑事律师":"Criminal Lawyer","涉外律师":"International Lawyer","网络安全警察":"Cybersecurity Police Officer","刑侦警察":"Criminal Investigation Officer","社区民警":"Community Police Officer","交通警察":"Traffic Police Officer","出入境管理警察":"Immigration Administration Officer","视觉设计师":"Visual Designer","空间设计师":"Spatial Designer"
};

const broadMap = {
  Doctor: ["Dentist", "Community General Practitioner", "Pediatrician", "Medical Imaging Physician", "Emergency Physician"],
  Teacher: ["Secondary School Teacher", "Primary School Teacher", "Science Curriculum Teacher", "Vocational Education Teacher", "University Research Faculty"],
  Engineer: ["Software Engineer", "New Energy Engineer", "Mechanical Engineer", "Civil Engineer", "Quality Engineer"],
  Lawyer: ["Intellectual Property Lawyer", "Civil and Commercial Lawyer", "Labor Lawyer", "Criminal Lawyer", "International Lawyer"],
  "Police Officer": ["Cybersecurity Police Officer", "Criminal Investigation Officer", "Community Police Officer", "Traffic Police Officer", "Immigration Administration Officer"],
  Designer: ["Visual Designer", "Interaction Designer", "Industrial Designer", "Spatial Designer", "Graphic Designer"],
};

const futureDomains = [
  ["Economy and Business", "Computation and data become a new general currency for value creation.", [["Future Workplace","Driver","未来职场"],["Space Data Economy","Emerging","太空数据经济"],["He Economy","Driver","“他”经济"],["AI Agent Collaboration","Popular","AI 代理协作"],["Community Micro-manufacturing","Weak signal","社区微制造"],["Spatial Computing Marketing","Driver","空间计算营销"],["Emotion-aware Service","Popular","情绪感知服务"],["Reverse Logistics Network","Emerging","逆向物流网"],["Subscription Infrastructure","Popular","订阅制基建"],["DAO Collaboration","Visible","DAO 自治协作"]]],
  ["Environment and Sustainability", "Every system must account for planetary load.", [["Green Concrete","Weak signal","绿色混凝土"],["Plant-extracted Milk","Popular","植物提取奶"],["Deep Decarbonization","Driver","深度脱碳"],["Direct Air Capture","Weak signal","直接空气捕集"],["Orbital Debris Crisis","Popular","轨道碎片危机"],["Climate Earth Observation","Driver","气候地球观测"],["Smart Microgrid Balancing","Emerging","微电网智能调"],["Indoor Independent Ecosystem","Popular","室内独立生态"],["Farm Robot Swarms","Driver","农田机器人群"],["Visual Waste Sorting","Popular","视觉废品分拣"]]],
  ["Governance and Policy", "Regulation expands from human behavior to algorithmic power.", [["Neuropolitics","Visible","神经政治学"],["EU AI Act","Popular","欧盟 AI 法案"],["Reskilling Urgency","Emerging","再培训紧迫性"],["Right to Be Forgotten","Visible","被遗忘权"],["Public Health Responsibility","Popular","健康公共职责"],["Bird-safe Skyline","Visible","护鸟天际线"],["AI-assisted Democracy","Weak signal","AI 辅助民主"],["Space Militarization","Popular","太空军事化"],["Interplanetary Governance","Weak signal","跨星球治理"],["Smart Contract Taxation","Driver","智能合约征税"]]],
  ["Society and Culture", "Identity and cognition are reshaped by mixed reality and advanced AI.", [["Off-world Identity","Visible","地外身份认同"],["Intentional Tech Restraint","Weak signal","刻意技术节制"],["Mixed Reality Teaching","Emerging","混合现实教学"],["Neurodiversity Inclusion","Emerging","神经多样包容"],["AI Companion Ethics","Popular","AI 伴侣伦理"],["Memory Outsourcing","Emerging","记忆外包习惯"],["Personal Narrative Engine","Driver","个性叙事引擎"],["Open-source Maker Culture","Popular","全民开源创客"],["Brainwave Empathy","Weak signal","脑波直接共情"],["Authority Shift","Driver","权威中轴转移"]]],
  ["Technological Innovation", "Interfaces move toward intention, perception, and ambient intelligence.", [["Nano 3D Printing","Weak signal","纳米 3D 打印"],["Human-machine Collaboration","Emerging","人机协同协作"],["Technology-driven Education","Driver","技术驱动教育"],["Multi-omics Sequencing","Weak signal","多组学测序"],["Affordable Frontier AI","Visible","平价顶尖 AI"],["Urban Air Mobility","Emerging","城市空中交通"],["Quantum Computing","Emerging","量子计算"],["Bio-inspired Soft Robotics","Weak signal","仿生软体机器"],["P2P Open-source Model","Driver","P2P 开源模式"],["Ultra-efficient Solar","Emerging","超高效太阳能"]]],
  ["Body and Mental Health", "Healthcare becomes predictive maintenance for body and mind.", [["Space Pharmaceutical Engineering","Visible","太空制药工程"],["Social Prescription","Visible","社交干预处方"],["Quantified Patient Data","Popular","量化病人数据"],["Chronobiomedicine","Weak signal","时间生物医学"],["Human Hardware Implants","Popular","人体硬件植入"],["Transhumanism","Weak signal","超人类主义"],["Psychedelic-assisted Therapy","Weak signal","迷幻剂辅助疗法"],["Smart Gut Monitoring","Emerging","智能肠道监控"],["Trauma Memory Editing","Visible","创伤神经擦除"],["Vascular Nanobot Patrol","Visible","血管纳米巡逻"]]],
].map(([name, desc, cards]) => ({ name, desc, cards: cards.map(([title, tag, zh]) => ({ title, tag, zh, domain: name })) }));

function load() { try { return JSON.parse(localStorage.getItem(storeKey)) || {}; } catch { return {}; } }
function save(next) { localStorage.setItem(storeKey, JSON.stringify({ ...load(), ...next })); }
function esc(text) { return String(text || "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"); }
function go(n) { window.location.href = `./stage-${String(n).padStart(2, "0")}.html`; }
function fd(form, name) { return new FormData(form).get(name) || ""; }
function checks(form, name) { return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((el) => el.value); }
function currentCareers() { return load().remaining || load().careers || []; }

function translateCareer(item) {
  const raw = typeof item === "string" ? item : item.name;
  return { name: careerName[raw] || raw, desc: item?.desc || "A general option for continued exploration." };
}

function shell(content) {
  const [title, subtitle] = stages[stage - 1];
  app.innerHTML = `
    <section class="stage ${stage === 10 ? "stage--final" : ""}">
      <img class="stage__image" src="./assets/stage-${String(stage).padStart(2, "0")}.png" alt="${esc(title)} visual">
      <div class="stage__veil"></div>
      <nav class="nav">
        <a class="brand" href="./index.html"><span class="brand__mark">P</span><span class="brand__text"><strong>Pathwise</strong><span>Future Career Planning Advisor</span></span></a>
        <div class="stage-rail">${stages.map((s, i) => `<span class="${i + 1 === stage ? "active" : ""}">${i + 1}</span>`).join("")}</div>
      </nav>
      <div class="layout">
        <section class="hero-copy">
          <p class="eyebrow">FUTURE SCAN · SCENE ${stage}</p>
          <h1>${esc(title)}</h1>
          <p class="lead">${esc(subtitle)}</p>
          <p class="advisor-note">${intro(stage)}</p>
        </section>
        <section class="panel glass">${content}</section>
      </div>
    </section>`;
}

function intro(n) {
  return [
    "Before reality edits the dream, we collect the small sparks that once made your attention become unusually bright.",
    "The code is not a verdict. It is a lens for generating possible routes, and you remain the one who chooses what to keep.",
    "A value is a quiet compass. It shows what kind of life you are willing to pay for.",
    "Family is not simply support or resistance. It is a real field of resources, expectations, distance, and emotional cost.",
    "A city can lift a career, but it can also test it through rent, commute, competition, and industry density.",
    "These cards turn uncertainty into variables. Your task is to read the signals and design a STEM-informed response.",
    "After the simulation, commitment becomes clearer: continue because you understand the weight, or pivot because you are honest.",
    "A powerful future begins with a small action that can actually happen tomorrow.",
    "The future self should not send empty encouragement. It should send evidence that the journey became real.",
    "Your final report places the career at the center, then connects it to values, family, city, future waves, and action.",
  ][n - 1];
}

function checkboxGrid(name, items, picked = []) {
  return `<div class="choice-grid">${items.map((item) => {
    const label = typeof item === "string" ? item : item.name;
    const desc = typeof item === "string" ? "" : item.desc;
    return `<label class="choice"><input type="checkbox" name="${name}" value="${esc(label)}" ${picked.includes(label) ? "checked" : ""}><span><b>${esc(label)}</b>${desc ? `<small>${esc(desc)}</small>` : ""}</span></label>`;
  }).join("")}</div>`;
}

function radioGrid(name, items, picked = "") {
  return `<div class="choice-grid">${items.map((item, i) => `<label class="choice"><input type="radio" name="${name}" value="${esc(item)}" ${picked ? picked === item ? "checked" : "" : i === 0 ? "checked" : ""}><span><b>${esc(item)}</b></span></label>`).join("")}</div>`;
}

function careerItems(code) {
  const raw = window.HOLLAND_DATA?.[code]?.careers || [];
  return raw.length ? raw.map(translateCareer) : fallbackCareers();
}

function fallbackCareers() {
  return ["Data Analyst","School Counselor","Product Manager","Dentist","New Media Content Creator","New Energy Engineer","Career Planning Advisor","Financial Analyst","Social Worker","Video Editor","Robotics Technician","Brand Strategist","Marketing Manager","Environmental Monitoring Technician","Special Education Teacher","Doctor","Teacher","Engineer","Lawyer","Police Officer"].map((name) => ({ name, desc: "A general option for continued exploration." }));
}

function codeDesc(code) {
  if (!code || code.length !== 3) return "Waiting for a three-letter Holland code.";
  if (!window.HOLLAND_DATA?.[code]) return "This code was not found in the uploaded sheet, so the site will use a general career set.";
  const traits = { R:"Realistic", I:"Investigative", A:"Artistic", S:"Social", E:"Enterprising", C:"Conventional" };
  return `${code} combines ${code.split("").map((l) => traits[l] || l).join(", ")} tendencies. Please choose the careers you are genuinely interested in. You may select more than one.`;
}

function renderStage1() {
  const data = load();
  shell(`<h2>Capture Your Sparks</h2><form id="form" class="compact-form">
    <textarea name="interests" required placeholder="For example: psychology, writing, fixing things, observing cities, caring for people, making videos...">${esc(data.interests)}</textarea>
    <div class="button-row"><a class="button button--quiet" href="./index.html">Back to Opening</a><button class="button button--primary">Continue</button></div>
  </form>`);
  formSubmit((form) => { save({ interests: fd(form, "interests") }); go(2); });
}

function renderStage2() {
  const data = load();
  const code = (data.code || "").toUpperCase();
  const jobs = code.length === 3 ? careerItems(code) : [];
  shell(`<h2>Generate Career Routes</h2><form id="form" class="compact-form">
    <a class="external-link" href="${HOLLAND_LINK}" target="_blank" rel="noreferrer">Open Holland Interest Test</a>
    <div class="code-row"><input id="codeInput" name="code" maxlength="3" required placeholder="Enter code, e.g. RIA" value="${esc(code)}"><button class="button button--quiet" type="button" id="generate">Generate</button></div>
    <div id="codeDesc" class="mini-analysis ${jobs.length ? "career-prompt" : ""}">${codeDesc(code)}</div>
    <div id="careerBox">${jobs.length ? checkboxGrid("careers", jobs, data.careers || []) : `<p class="panel__hint">Enter your code first. Then select the careers that interest you. Multiple choices are allowed.</p>`}</div>
    <div class="button-row"><button class="button button--quiet" type="button" data-back="1">Back</button><button class="button button--primary">Save Routes</button></div>
  </form>`);
  document.querySelector("#generate").addEventListener("click", () => { save({ code: document.querySelector("#codeInput").value.trim().toUpperCase(), careers: [] }); location.reload(); });
  back(1);
  formSubmit((form) => {
    const picked = checks(form, "careers");
    if (!picked.length) return alert("Please select at least one career that interests you.");
    save({ code: fd(form, "code").toUpperCase(), careers: picked, remaining: picked });
    go(3);
  });
}

function renderStage3() {
  const data = load();
  const remain = currentCareers();
  shell(`<h2>Choose Three Values</h2><form id="form" class="compact-form">
    <p class="panel__hint">Select exactly three values, then keep the careers that still match your life priorities.</p>
    ${checkboxGrid("values", values.map(([name, desc]) => ({ name, desc })), data.values || [])}
    <div class="split-label">Careers to keep after value screening</div>
    ${checkboxGrid("remaining", remain, remain)}
    ${broadHints(remain) ? `<div class="mini-analysis">${broadHints(remain)}</div>` : ""}
    <div class="button-row"><button class="button button--quiet" type="button" data-back="2">Back</button><button class="button button--primary">Save</button></div>
  </form>`);
  back(2);
  formSubmit((form) => {
    const pickedValues = checks(form, "values");
    const pickedJobs = checks(form, "remaining");
    if (pickedValues.length !== 3) return alert("Please select exactly three core values.");
    if (!pickedJobs.length) return alert("Please keep at least one career.");
    save({ values: pickedValues, remaining: pickedJobs });
    go(4);
  });
}

function broadHints(list) {
  const hints = list.filter((c) => broadMap[c]).map((c) => `${c} can be specified as: ${broadMap[c].join(", ")}`);
  return hints.length ? hints.join("; ") : "";
}

function renderStage4() {
  const data = load();
  const remain = currentCareers();
  shell(`<h2>Family Factors</h2><form id="form" class="compact-form">
    ${checkboxGrid("familyFactors", familyFactors, data.familyFactors || [])}
    <textarea name="familyNote" placeholder="Add one sentence: what does your family support or worry about most?">${esc(data.familyNote)}</textarea>
    <div class="split-label">Careers to keep after considering family</div>
    ${checkboxGrid("remaining", remain, remain)}
    <div class="button-row"><button class="button button--quiet" type="button" data-back="3">Back</button><button class="button button--primary">Save Family Factors</button></div>
  </form>`);
  back(3);
  formSubmit((form) => {
    const picked = checks(form, "remaining");
    if (!picked.length) return alert("Please keep at least one career.");
    save({ familyFactors: checks(form, "familyFactors"), familyNote: fd(form, "familyNote"), remaining: picked });
    go(5);
  });
}

function renderStage5() {
  const data = load();
  const remain = currentCareers();
  shell(`<h2>City and Final Career</h2><form id="form" class="compact-form">
    <a class="external-link" href="${CITY_LINK}" target="_blank" rel="noreferrer">Open City Explorer</a>
    <input name="city" required placeholder="Target city, e.g. Shanghai, Chengdu, Hangzhou" value="${esc(data.city)}">
    <div class="split-label">Reasons for choosing this city</div>
    ${checkboxGrid("cityReasons", cityReasons, data.cityReasons || [])}
    <input name="cityOtherReason" placeholder="Other reason, in your own words" value="${esc(data.cityOtherReason)}">
    <div class="split-label">My final career choice</div>
    ${radioGrid("finalCareer", remain.length ? remain : ["Please complete previous stages first"], data.finalCareer)}
    <div class="button-row"><button class="button button--quiet" type="button" data-back="4">Back</button><button class="button button--primary">Confirm</button></div>
  </form>`);
  back(4);
  formSubmit((form) => {
    const reasons = checks(form, "cityReasons");
    save({ city: fd(form, "city"), cityReasons: reasons, cityOtherReason: fd(form, "cityOtherReason"), finalCareer: fd(form, "finalCareer") });
    go(6);
  });
}

function renderStage6() {
  const data = load();
  const extracted = data.waveCards || [];
  shell(`<h2>Future Wave Cards</h2><form id="form" class="compact-form wave-form">
    <div class="wave-instruction">The future is changing, and “${esc(data.finalCareer || "your chosen career")}” will not remain the same. Draw your Future Wave cards to explore the challenges, opportunities, and new possibilities this career may face in the next ten years.</div>
    <a class="external-link" href="${WAVE_LINK}" target="_blank" rel="noreferrer">Open Future Wave</a>
    <label class="paste-label" for="waveText">Paste the copied Future Wave text below, then extract six cards.</label>
    <textarea id="waveText" name="waveText" placeholder="Paste the copied text from Future Wave here. Pathwise will extract six cards from the text.">${esc(data.waveText)}</textarea>
    <div class="button-row tight"><button class="button button--quiet" type="button" id="extract">Extract Future Wave Cards</button></div>
    <div id="waveResult" class="chip-board">${waveChips(extracted)}</div>
    <div id="waveGuide" class="stem-box">${waveGuide(extracted, data.finalCareer)}</div>
    <textarea name="stemPlan" required placeholder="Write your STEM-informed response: data, tools, models, engineering thinking, or continuous learning.">${esc(data.stemPlan)}</textarea>
    <div class="button-row"><button class="button button--quiet" type="button" data-back="5">Back</button><button class="button button--primary">Save Future Response</button></div>
  </form>`);
  document.querySelector("#extract").addEventListener("click", () => {
    const text = document.querySelector("#waveText").value;
    const cards = extractCards(text);
    save({ waveText: text, waveCards: cards });
    document.querySelector("#waveResult").innerHTML = waveChips(cards);
    document.querySelector("#waveGuide").innerHTML = waveGuide(cards, load().finalCareer);
    if (cards.length < 6) alert("Pathwise could not detect six cards yet. Please paste the full copied Future Wave text and extract again.");
  });
  back(5);
  formSubmit((form) => {
    const cards = extractCards(fd(form, "waveText"));
    if (cards.length < 6) return alert("Please paste the full Future Wave text and extract six cards before continuing.");
    save({ waveText: fd(form, "waveText"), waveCards: cards.slice(0, 6), stemPlan: fd(form, "stemPlan") });
    go(7);
  });
}

function extractCards(text) {
  const blocks = [];
  const blockPattern = /\[([^\]]+)\]\s*Node:\s*([^(]+?)\s*\(([^)]+)\)\s*Insight:\s*([\s\S]*?)(?=\n\s*\[|$)/gi;
  let match;
  while ((match = blockPattern.exec(text || ""))) {
    blocks.push({
      domain: normalizeWaveDomain(match[1].trim()),
      title: normalizeWaveTitle(match[2].trim()),
      tag: normalizeWaveTag(match[3].trim()),
      insight: match[4].trim().replace(/\s+/g, " "),
    });
  }
  if (blocks.length) return blocks;

  const found = [];
  futureDomains.forEach((domain) => {
    const hit = domain.cards.find((card) => text.includes(card.title) || text.includes(card.zh));
    if (hit) found.push({ domain: domain.name, title: hit.title, tag: hit.tag });
  });
  return found;
}

function normalizeWaveDomain(domain) {
  const key = domain.toLowerCase().replace(/&/g, "and");
  if (key.includes("economy")) return "Economy and Business";
  if (key.includes("environment")) return "Environment and Sustainability";
  if (key.includes("governance")) return "Governance and Policy";
  if (key.includes("society")) return "Society and Culture";
  if (key.includes("technology")) return "Technological Innovation";
  if (key.includes("physical") || key.includes("mental") || key.includes("health")) return "Body and Mental Health";
  return domain;
}

function normalizeWaveTitle(title) {
  const aliases = {
    "Smart Microgrids": "Smart Microgrid Balancing",
    "Interplanetary Gov": "Interplanetary Governance",
    "P2P Open-Source": "P2P Open-source Model",
    "Psychedelic Therapy": "Psychedelic-assisted Therapy",
  };
  return aliases[title] || title;
}

function normalizeWaveTag(tag) {
  return tag === "Brewing" ? "Weak signal" : tag;
}
function waveChips(cards) {
  return cards?.length ? cards.map((c) => `<span class="wave-chip"><b>${esc(c.domain)}</b>${esc(c.title)} | ${esc(c.tag)}</span>`).join("") : `<span class="empty-chip">Waiting for six extracted Future Wave cards.</span>`;
}
function waveGuide(cards, career) {
  return `<b>Steering Through the Future Waves</b><span>The cards have shown the waves ahead, but the course is still yours to choose. How will you use your knowledge, courage, and inner light to respond to these changes and keep moving toward “${esc(career || "your chosen career") }”?</span>`;
}

function renderStage7() {
  const data = load();
  shell(`<h2>Stay or Pivot</h2><form id="form" class="compact-form">
    <div class="mini-analysis">After going through this challenging future simulation, do you feel that you can still be competent in this career and continue to love it? If you feel overwhelmed, would you like to adjust your course here and choose a different career?</div>
    ${radioGrid("decision", ["I will persevere with this career", "I want to pivot to another career"], data.decision)}
    <textarea name="decisionNote" placeholder="If you pivot, write the new career. If you stay, write why.">${esc(data.decisionNote)}</textarea>
    <div class="button-row"><button class="button button--quiet" type="button" data-back="6">Back</button><button class="button button--primary">Confirm Direction</button></div>
  </form>`);
  back(6);
  formSubmit((form) => {
    const decision = fd(form, "decision");
    const note = fd(form, "decisionNote");
    save({ decision, decisionNote: note, finalCareer: decision.includes("pivot") && note.trim() ? note.trim() : load().finalCareer });
    go(8);
  });
}

function renderStage8() {
  const data = load();
  shell(`<h2>Tomorrow's Action List</h2><form id="form" class="compact-form">
    <div class="action-guidance">True navigation never stays as a simulation on a star map; it begins with the first step off the deck. At the end of this journey, based on your final career choice, complete your Tomorrow’s Departure List: first, write three specific keywords you will search to understand this career more deeply; second, name one person related to this field whom you would like to consult or interview.</div>
    <div class="two-beams"><div><b>First Light: Search</b><span>Write three precise keywords that can help you understand ${esc(data.finalCareer || "this career")} more deeply.</span></div><div><b>Second Light: Interview</b><span>Name one real person connected to this field whom you could consult.</span></div></div>
    <input name="keywords" required placeholder="Three specific keywords you will search" value="${esc(data.keywords)}">
    <input name="interviewee" required placeholder="One person related to this field whom you would like to consult or interview" value="${esc(data.interviewee)}">
    <div class="button-row"><button class="button button--quiet" type="button" data-back="7">Back</button><button class="button button--primary">Activate</button></div>
  </form>`);
  back(7);
  formSubmit((form) => { save({ keywords: fd(form, "keywords"), interviewee: fd(form, "interviewee") }); go(9); });
}

function renderStage9() {
  const data = load();
  shell(`<h2>Echo from the Future</h2><form id="form" class="compact-form">
    <blockquote class="quote">“A turn of a page, as we write our stories anew. May each chapter be filled with grace, courage and dreams come true.”</blockquote>
    <div class="mini-analysis">Before the space-time rift closes, imagine your future self ten years from now sending one final message back to today’s you. This message should prove that the future is worth reaching: first, record a tiny miracle your future self has witnessed or created; then, leave one piece of advice that today’s self most needs to hear.</div>
    <label class="paste-label">Input 1: A Tiny Miracle from the Future</label>
    <textarea name="miracle" required placeholder="What incredible small miracle did your future self witness or create?">${esc(data.miracle)}</textarea>
    <label class="paste-label">Input 2: A Message to Today’s Self</label>
    <textarea name="futureAdvice" required placeholder="What advice would your future self give to today’s you?">${esc(data.futureAdvice)}</textarea>
    <div class="button-row"><button class="button button--quiet" type="button" data-back="8">Back</button><button class="button button--primary">Send Echo</button></div>
  </form>`);
  back(8);
  formSubmit((form) => { save({ miracle: fd(form, "miracle"), futureAdvice: fd(form, "futureAdvice") }); go(10); });
}

function renderStage10() {
  const data = load();
  const cityLine = [data.city, ...(data.cityReasons || []), data.cityOtherReason].filter(Boolean).join(" | ");
  shell(`<section class="final-wide">
    <div class="final-kicker">Pathwise Final Synthesis</div>
    <section class="career-hero-card">
      <span>Chosen Career</span>
      <strong>${esc(data.finalCareer || "Not recorded")}</strong>
      <p>${esc(data.decision || "Direction not confirmed yet.")}</p>
    </section>
    <div class="report-flow">
      ${summary("1. Identity Signal", `Interests: ${data.interests || "not recorded"} | Holland code: ${data.code || "not recorded"}`)}
      ${summary("2. Selection Logic", `Values: ${(data.values || []).join(", ")} | Family factors: ${(data.familyFactors || []).join(", ")} ${data.familyNote || ""}`)}
      ${summary("3. City Ecosystem", cityLine)}
      ${summary("4. Future Wave Response", data.stemPlan)}
      ${summary("5. Extracted Wave Cards", (data.waveCards || []).map((c) => `${c.domain}: ${c.title}`).join("; "))}
      ${summary("6. Tomorrow’s Departure List", `Keywords: ${data.keywords || "not recorded"} | Interview: ${data.interviewee || "not recorded"}`)}
      ${summary("7. Time Instance Echo", `Tiny miracle: ${data.miracle || "not recorded"} | Message: ${data.futureAdvice || "not recorded"}`)}
    </div>
    <div class="final-note">Industries will keep changing. Your strongest barrier against uncertainty is not one job title alone, but the combination of STEM literacy, resilience, communication, empathy, and lifelong learning. Future Scan is complete. May your voyage be bright, and may your way home stay lit.</div>
    <div class="button-row"><button class="button button--quiet" id="restart">Restart</button><button class="button button--primary" onclick="window.print()">Print Report</button></div>
  </section>`);
  document.querySelector("#restart").addEventListener("click", () => { localStorage.removeItem(storeKey); window.location.href = "./index.html"; });
}

function summary(label, value) { return `<article class="summary-item"><b>${esc(label)}</b><span>${esc(value || "Not recorded")}</span></article>`; }
function formSubmit(handler) { document.querySelector("#form").addEventListener("submit", (e) => { e.preventDefault(); handler(e.currentTarget); }); }
function back(n) { document.querySelector("[data-back]")?.addEventListener("click", () => go(n)); }

[renderStage1, renderStage2, renderStage3, renderStage4, renderStage5, renderStage6, renderStage7, renderStage8, renderStage9, renderStage10][stage - 1]();
