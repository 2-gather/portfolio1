import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, ArrowRight, FileText, Layers3, Workflow, BarChart3,
  Database, Sparkles, Menu, X, ChevronLeft, Download, ExternalLink, Mail,
  Code2, Target, CheckCircle2, CircleDot, GraduationCap, Search, ChartNoAxesCombined
} from 'lucide-react';
import './styles.css';

const docs = {
  analysis: {
    title: '产品分析报告',
    eyebrow: 'PRODUCT ANALYSIS',
    subtitle: '从业务问题出发，明确目标用户、核心痛点与产品机会。',
    sections: [
      ['01 项目背景与市场机会', '业务人员日常需要处理大量表格，但从数据整理到形成业务结论仍有较高的操作和认知成本。项目尝试通过自然语言交互降低基础数据分析门槛。'],
      ['02 目标用户与用户痛点', 'MVP 优先面向产品、运营、市场及电商运营等具备基础表格使用经验、但不熟悉 SQL 或 Python 的业务用户。主要痛点包括工具学习成本高、分析思路不清晰，以及数据结果难以转化为业务判断。'],
      ['03 产品定位', '面向非数据专业业务人员的轻量级 AI 数据分析助手。用户上传 CSV 或 Excel 文件，以自然语言提出问题，由系统调用数据分析工具完成基础计算并组织结果。'],
      ['04 核心使用场景', '快速了解数据结构；查看基础统计；按业务维度进行分组聚合；对类别进行排名；针对分析结果进行初步追问。'],
      ['05 竞品与差异化思考', '传统表格与 BI 工具能力成熟，但需要用户主动操作和理解分析方法；通用大模型交互门槛较低，但涉及具体数据计算时需要可靠的工具执行机制。本项目尝试结合自然语言交互与确定性数据计算。'],
      ['06 测试与评估', '当前已进行第一轮功能测试，重点关注文件读取、数据概览、基础统计、分组聚合、排名和异常输入。测试结果用于识别能力边界，不将未验证的效果包装为已实现成果。']
    ]
  },
  prd: {
    title: 'PRD 产品需求文档',
    eyebrow: 'PRODUCT REQUIREMENTS',
    subtitle: '定义 MVP 的用户流程、功能范围、业务规则与验收要求。',
    sections: [
      ['01 产品目标', '帮助非数据专业用户完成基础数据探索与常见分析任务，减少从提出问题到获取初步数据结论的操作步骤。'],
      ['02 MVP 范围', '支持 CSV / XLSX 文件上传、数据概览、自然语言分析、基础统计、分组聚合、类别排名及基本异常提示。复杂预测、自动建模、多表关联和生产级权限管理不属于当前 MVP 已承诺范围。'],
      ['03 核心用户流程', '上传文件 → 检查数据并查看概览 → 输入业务问题 → 规划分析任务 → 调用分析工具 → 展示分析结果。'],
      ['04 文件上传与数据概览', '用户选择支持的文件格式后，系统读取数据并展示行数、字段数量、字段类型、缺失值及重复数据等概览信息。对于空文件、读取失败或不支持的格式，应给出可理解的提示。'],
      ['05 自然语言分析', '系统应尽量使用真实字段名理解用户问题，并根据任务类型选择适当工具。结果应基于实际计算数据；当问题超出当前工具能力或无法匹配字段时，应说明限制，不应编造统计结果。'],
      ['06 验收与边界', '通过代表性用例检查文件读取、统计计算、分组和排名是否与数据一致；记录不匹配、结果不完整和异常输入等问题。复杂问题的完整性仍需后续迭代验证。']
    ]
  },
  architecture: {
    title: '方案设计与技术架构',
    eyebrow: 'SOLUTION & ARCHITECTURE',
    subtitle: '展示应用分层、Agent 工作流以及模型与数据工具的职责边界。',
    sections: [
      ['01 整体架构', 'Streamlit 负责用户交互与结果呈现；Agent / LangGraph 组织任务规划和执行流程；DeepSeek 提供自然语言理解与回答组织能力；数据分析工具调用 Pandas 完成确定性计算。'],
      ['02 Agent 工作流', '用户输入问题后，规划节点生成分析计划，执行节点调用可用的数据分析工具，再将工具结果整理为用户可读的回答。具体执行路径以当前代码实现为准。'],
      ['03 工具职责', '数据概览用于理解数据结构；数值统计用于计算总和、均值、最大值等指标；分组聚合用于按业务字段汇总；类别排名用于按指标排序。'],
      ['04 技术选型', 'Python 与 Pandas 负责数据处理；Streamlit 快速构建交互界面；LangGraph 组织工作流状态与节点；DeepSeek 提供模型能力。当前项目以验证核心产品链路为目标，不以复杂工程化为目标。'],
      ['05 能力边界与风险', '自然语言问题可能与实际分析维度不一致；复杂多步骤任务可能返回不完整结果；字段含义与统计口径需要明确。涉及数据结论时应优先依赖工具真实计算，并对不确定结果进行说明。'],
      ['06 后续方向', '优先提高问题与工具参数的匹配度、完善复杂任务的结果完整性、增强错误提示，并通过更系统的测试集持续评估。以上为规划方向，不代表当前已全部实现。']
    ]
  },
  testing: {
    title: '测试集与执行记录 V1.0',
    eyebrow: 'TESTING',
    subtitle: '记录测试范围、执行结果与问题发现。此页面为展示摘要，详细数据可后续接入真实 Excel。',
    sections: [
      ['01 测试范围', '覆盖文件上传、数据概览、基础统计、分组聚合、类别排名、异常输入与复杂问题等场景。'],
      ['02 执行原则', '按实际运行结果填写执行记录；区分通过、失败、部分通过和未执行。执行覆盖率不等于结果准确率。'],
      ['03 重点发现', '测试中发现，部分自然语言问题可能被映射到错误的分析维度；部分复杂任务未能完整返回所需结果。此类问题应作为当前版本局限如实记录。'],
      ['04 后续改进方向', '核对每条用例的问题、实际调用工具、参数和输出；统一通过标准；复核汇总数量；优先修复分析意图与工具参数不匹配的问题。'],
      ['05 附件说明', '请将已完成的真实测试 Excel 放在项目文件中，或在部署后配置下载链接。当前模板没有伪造测试通过率，也没有内置虚构的测试数据。']
    ]
  },
  volunteer: {
    title: 'AI 志愿规划助手',
    eyebrow: 'PROJECT 01',
    subtitle: '基于 Dify Workflow 与知识库的高考志愿规划辅助产品。',
    sections: [
      ['01 项目目标', '帮助考生结合分数、选科、意向城市和专业等条件，快速获得有依据的院校与专业参考信息。'],
      ['02 产品思路', '通过结构化条件输入与知识库检索，将用户需求转化为可理解的推荐结果，并尽量解释推荐依据。'],
      ['03 AI 方案', '使用 Dify Workflow 编排流程，结合知识库提供院校及专业相关信息。提示词强调用户条件优先、依据知识库回答，并在无匹配数据时明确说明，不强行生成推荐。'],
      ['04 项目复盘', '该项目用于实践 AI 产品从需求分析、流程设计、知识库组织到前端 Demo 展示的基本过程。推荐结果的可靠性依赖数据质量与覆盖范围，不能替代官方招生政策和院校信息核验。']
    ]
  }
};

function App() {
  const [page, setPage] = useState({ type: 'home' });
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (next) => {
    setPage(next);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDoc = (key) => go({ type: 'doc', key });
  const openProject = (key) => go({ type: 'project', key });

  const activeDoc = page.type === 'doc' ? docs[page.key] : null;
  const isHome = page.type === 'home';

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => go({ type: 'home'})} aria-label="返回首页">
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>AI PRODUCT <b>PORTFOLIO</b></span>
        </button>
        <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
          <button className={isHome ? 'nav-link active' : 'nav-link'} onClick={() => go({type:'home'})}>首页</button>
          <button className="nav-link" onClick={() => openProject('data')}>项目案例</button>
          <button className="nav-link" onClick={() => go({type:'about'})}>关于我</button>
          <a className="nav-cta" href="mailto:your-email@example.com">联系我 <ArrowUpRight size={15}/></a>
        </nav>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="打开菜单">
          {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </header>

      {page.type === 'home' && <Home openProject={openProject} openDoc={openDoc} go={go} />}
      {page.type === 'project' && <ProjectDetail projectKey={page.key} openDoc={openDoc} go={go} />}
      {page.type === 'doc' && <DocumentPage doc={activeDoc} go={go} />}
      {page.type === 'about' && <About go={go} />}

      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark small"><Sparkles size={14}/></span> AI PRODUCT PORTFOLIO</div>
        <span>用产品思维探索 AI 的实际价值。</span>
        <span>© 2026 · Portfolio</span>
      </footer>
    </div>
  );
}

function Home({ openProject, openDoc, go }) {
  return <main>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot"></span> PRODUCT THINKING × AI PRACTICE</div>
        <h1>把 AI 能力，<br/><span>转化为真实的产品价值。</span></h1>
        <p className="hero-lead">关注用户问题、产品方案与 AI 工作流。通过可运行的项目实践，探索如何让 AI 更好地服务真实需求。</p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => openProject('data')}>查看项目案例 <ArrowRight size={17}/></button>
          <button className="button button-quiet" onClick={() => go({type:'about'})}>了解我 <ArrowUpRight size={16}/></button>
        </div>
        <div className="hero-meta">
          <span><span className="status-dot"></span> AI 产品实践</span>
          <span>产品分析 · Agent · 数据应用</span>
        </div>
      </div>
      <div className="hero-visual" aria-label="AI 数据分析概念图">
        <div className="visual-orbit orbit-one"></div><div className="visual-orbit orbit-two"></div>
        <div className="visual-card card-top"><span className="mini-icon blue"><ChartNoAxesCombined size={17}/></span><div><b>Business Question</b><small>自然语言理解</small></div><span className="tiny-check"><CheckCircle2 size={16}/></span></div>
        <div className="visual-core"><div className="core-glow"></div><Sparkles size={34}/><span>AI</span></div>
        <div className="visual-card card-bottom"><span className="mini-icon purple"><Workflow size={17}/></span><div><b>Agent Workflow</b><small>规划 · 工具调用 · 结果</small></div><span className="tiny-check"><CheckCircle2 size={16}/></span></div>
        <div className="float-tag tag-one">LLM</div><div className="float-tag tag-two">Pandas</div><div className="float-tag tag-three">RAG</div>
      </div>
    </section>

    <section className="stats-strip">
      <div className="stats-inner">
        <div><strong>02</strong><span>AI 产品项目</span></div>
        <div><strong>01</strong><span>数据分析 Agent</span></div>
        <div><strong>01</strong><span>知识库应用</span></div>
        <div><strong>PM × AI</strong><span>关注方向</span></div>
      </div>
    </section>

    <section className="section-wrap section-block">
      <div className="section-heading">
        <div><div className="eyebrow">SELECTED WORK</div><h2>项目案例<span className="heading-period">.</span></h2></div>
        <p>从需求洞察到方案设计，展示 AI 产品实践中的关键决策与思考。</p>
      </div>
      <div className="project-grid">
        <article className="project-card featured">
          <div className="project-art data-art">
            <div className="art-label"><span className="art-dot"></span> FEATURED PROJECT</div>
            <div className="dashboard-preview">
              <div className="preview-top"><span></span><span></span><span></span><i>DATA OVERVIEW</i></div>
              <div className="preview-metrics"><div><small>Rows</small><b>1,248</b></div><div><small>Fields</small><b>07</b></div><div><small>Missing</small><b>02</b></div></div>
              <div className="preview-chart"><div className="chart-bars"><i/><i/><i/><i/><i/><i/><i/></div><div className="chart-line"></div></div>
            </div>
            <span className="art-orb orb-a"></span><span className="art-orb orb-b"></span>
          </div>
          <div className="project-content">
            <div className="project-meta"><span>PROJECT 02</span><span className="meta-divider">/</span><span>AI AGENT</span></div>
            <h3>AI 数据分析 Agent</h3>
            <p>让业务用户用自然语言完成基础数据探索、统计、分组聚合与类别排名。</p>
            <div className="tag-list"><span>Python</span><span>Streamlit</span><span>LangGraph</span><span>DeepSeek</span></div>
            <div className="project-card-footer"><button className="text-link" onClick={() => openProject('data')}>查看项目详情 <ArrowRight size={16}/></button><span className="project-status"><span className="status-dot"></span> MVP V1.0</span></div>
          </div>
        </article>
        <article className="project-card">
          <div className="project-art volunteer-art">
            <div className="art-label"><span className="art-dot"></span> WORKFLOW PROJECT</div>
            <div className="admission-sheet">
              <div className="sheet-head"><GraduationCap size={21}/><span>志愿规划助手</span></div>
              <div className="sheet-sub">根据个人条件，探索适合的选择</div>
              <div className="sheet-row"><span>院校匹配</span><div className="sheet-bar"><i style={{width:'84%'}}/></div><b>84</b></div>
              <div className="sheet-row"><span>专业方向</span><div className="sheet-bar"><i style={{width:'69%'}}/></div><b>69</b></div>
              <div className="sheet-row"><span>城市偏好</span><div className="sheet-bar"><i style={{width:'76%'}}/></div><b>76</b></div>
              <div className="sheet-foot"><Sparkles size={14}/> 基于条件与知识库提供参考</div>
            </div>
            <span className="vol-orb"></span>
          </div>
          <div className="project-content">
            <div className="project-meta"><span>PROJECT 01</span><span className="meta-divider">/</span><span>KNOWLEDGE WORKFLOW</span></div>
            <h3>AI 志愿规划助手</h3>
            <p>基于 Dify Workflow 与知识库，辅助考生整理志愿筛选条件与院校参考信息。</p>
            <div className="tag-list"><span>Dify</span><span>Workflow</span><span>RAG</span><span>产品设计</span></div>
            <div className="project-card-footer"><button className="text-link" onClick={() => openProject('volunteer')}>查看项目详情 <ArrowRight size={16}/></button><span className="project-status">PROJECT 01</span></div>
          </div>
        </article>
      </div>
    </section>

    <section className="process-section">
      <div className="section-wrap section-block">
        <div className="section-heading">
          <div><div className="eyebrow">HOW I THINK</div><h2>我的产品实践方式<span className="heading-period">.</span></h2></div>
          <p>不只关注模型能做什么，更关注用户为什么需要它</p>
        </div>
        <div className="process-grid">
          <div className="process-item"><span className="process-num">01</span><Target size={22}/><h3>理解问题</h3><p>识别目标用户、使用场景与关键痛点，明确产品要解决的核心问题。</p></div>
          <div className="process-item"><span className="process-num">02</span><Layers3 size={22}/><h3>设计方案</h3><p>梳理用户流程、功能边界与 AI 方案，明确模型和工具的职责。</p></div>
          <div className="process-item"><span className="process-num">03</span><Workflow size={22}/><h3>搭建验证</h3><p>通过可运行的 MVP、测试用例和失败案例检验方案是否成立。</p></div>
          <div className="process-item"><span className="process-num">04</span><ChartNoAxesCombined size={22}/><h3>复盘迭代</h3><p>如实记录能力边界，依据实际表现确定后续优化优先级。</p></div>
        </div>
      </div>
    </section>

    <section className="section-wrap docs-section">
      <div className="section-heading">
        <div><div className="eyebrow">PROJECT DOCUMENTS</div><h2>项目文档<span className="heading-period">.</span></h2></div>
        <p>核心内容直接在网站内阅读，无需跳转其他平台。</p>
      </div>
      <div className="doc-grid">
        <DocTile icon={<FileText/>} title="产品分析报告" description="背景、用户、竞品与产品定位" onClick={() => openDoc('analysis')}/>
        <DocTile icon={<Layers3/>} title="PRD 产品需求文档" description="MVP 范围、功能需求与验收标准" onClick={() => openDoc('prd')}/>
        <DocTile icon={<Workflow/>} title="方案设计与技术架构" description="技术分层、Agent 工作流与边界" onClick={() => openDoc('architecture')}/>
        <DocTile icon={<BarChart3/>} title="测试集与执行记录" description="测试范围、问题发现与评估方向" onClick={() => openDoc('testing')}/>
      </div>
    </section>

    <section className="section-wrap closing-section">
      <div><div className="eyebrow">LET'S CONNECT</div><h2>持续探索 AI 如何解决真实问题。</h2><p>欢迎交流 AI 产品、数据应用与产品实践。</p></div>
      <a className="button button-primary" href="mailto:your-email@example.com">联系我 <ArrowUpRight size={16}/></a>
    </section>
  </main>;
}

function DocTile({ icon, title, description, onClick }) {
  return <button className="doc-tile" onClick={onClick}><span className="doc-icon">{icon}</span><span className="doc-tile-copy"><b>{title}</b><small>{description}</small></span><ArrowUpRight size={17} className="doc-arrow"/></button>;
}

function ProjectDetail({ projectKey, openDoc, go }) {
  const data = projectKey === 'data' ? {
    num:'PROJECT 02', title:'AI 数据分析 Agent', subtitle:'让业务用户通过自然语言完成基础数据分析。', status:'MVP V1.0',
    intro:'面向产品、运营、市场及电商运营等业务用户，尝试降低基础数据分析的认知与操作门槛。用户上传 CSV / Excel 文件后，可以用自然语言提出问题，系统根据任务调用数据分析工具并返回结果。',
    problem:['分析工具学习成本较高','业务问题不容易转化为分析步骤','计算结果需要结合业务语境理解'],
    features:[['数据上传与概览','读取 CSV / XLSX，展示数据规模、字段信息与基础质量提示。'],['自然语言分析','用户通过日常语言提出问题，系统尝试规划任务并调用数据工具。'],['基础统计与排名','支持数值统计、分组聚合和类别排名等基础分析任务。']],
    stack:['Python','Streamlit','LangGraph','DeepSeek','Pandas'],
    docs:[['analysis','产品分析报告'],['prd','PRD 产品需求文档'],['architecture','方案设计与技术架构'],['testing','测试集与执行记录']]
  } : {
    num:'PROJECT 01', title:'AI 志愿规划助手', subtitle:'基于 Dify Workflow 与知识库的志愿规划辅助工具。', status:'WORKFLOW DEMO',
    intro:'围绕考生筛选院校时需要综合考虑分数、选科、意向城市与专业等条件的场景，设计一个基于知识库的志愿规划辅助流程，尝试把复杂条件转化为清晰的参考结果。',
    problem:['院校和专业信息分散，筛选成本较高','多条件组合筛选容易遗漏限制条件','推荐结果需要说明依据，避免无依据生成'],
    features:[['条件输入','围绕分数、选科、意向城市与专业组织输入条件。'],['知识库检索','从整理后的知识库中查找与条件相关的信息。'],['推荐结果组织','通过 Workflow 组织结果，强调条件优先与无匹配时如实说明。']],
    stack:['Dify','Workflow','RAG','Prompt Design'],
    docs:[['volunteer','项目方案与复盘']]
  };

  return <main className="inner-page">
    <div className="section-wrap">
      <button className="back-link" onClick={() => go({type:'home'})}><ChevronLeft size={16}/> 返回作品集首页</button>
      <div className="detail-hero">
        <div className="eyebrow">{data.num} <span className="meta-divider">/</span> CASE STUDY</div>
        <h1>{data.title}</h1><p>{data.subtitle}</p>
        <div className="tag-list">{data.stack.map(s => <span key={s}>{s}</span>)}</div>
        <span className="detail-status"><span className="status-dot"></span>{data.status}</span>
      </div>
      <div className="detail-layout">
        <article className="detail-main">
          <section className="content-section"><div className="eyebrow">OVERVIEW</div><h2>项目概述</h2><p>{data.intro}</p></section>
          <section className="content-section"><div className="eyebrow">USER PROBLEM</div><h2>核心问题</h2><div className="problem-list">{data.problem.map((p,i)=><div className="problem-row" key={p}><span>0{i+1}</span><p>{p}</p></div>)}</div></section>
          <section className="content-section"><div className="eyebrow">KEY FEATURES</div><h2>核心功能</h2><div className="feature-list">{data.features.map(([title,desc],i)=><div className="feature-row" key={title}><span className="feature-index">0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></section>
          <section className="content-section"><div className="eyebrow">LEARNINGS</div><h2>项目思考与边界</h2><p>本项目以 MVP 为基础，重点验证 AI 数据分析 Agent 在基础数据处理与自然语言交互场景中的可行性。通过实际功能测试，识别当前方案的能力边界与待优化问题，并据此明确后续迭代方向，持续提升分析结果的准确性、完整性与可用性。</p></section>
        </article>
        <aside className="detail-aside">
          <div className="aside-card"><h3>项目材料</h3><p>在当前网站中直接阅读</p>
{data.docs.map(([key, label]) => (
  <button
    className="aside-doc"
    key={key}
    onClick={() => {
      if (key === 'analysis') {
        window.open(
          `${import.meta.env.BASE_URL}product-analysis.html`,
          '_blank',
          'noopener,noreferrer'
        );
      } else {
        openDoc(key);
      }
    }}
  >
    <FileText size={16} />
    <span>{label}</span>
    <ArrowUpRight size={14} />
  </button>
))}
</div>
          <div className="aside-card aside-note"><Sparkles size={18}/><h3>产品原则</h3><p>以真实用户问题为起点，用可运行的 MVP 验证方案，并如实呈现能力边界。</p></div>
          <div className="aside-card"><h3>代码与 Demo</h3><p>部署前请在此处补充真实 GitHub 仓库、在线 Demo 或运行说明链接。</p><span className="placeholder-link"><Code2 size={15}/> GitHub 链接待补充</span></div>
        </aside>
      </div>
      <div className="next-project"><div><span className="eyebrow">EXPLORE MORE</span><h2>继续浏览其他项目</h2></div><button className="button button-primary" onClick={() => go({type:'project',key:projectKey==='data'?'volunteer':'data'})}>查看另一个项目 <ArrowRight size={16}/></button></div>
    </div>
  </main>;
}

function DocumentPage({ doc, go }) {
  if (!doc) return null;
  return <main className="inner-page document-page">
    <div className="section-wrap doc-reader-wrap">
      <button className="back-link" onClick={() => go({type:'home'})}><ChevronLeft size={16}/> 返回作品集首页</button>
      <div className="doc-reader">
        <div className="doc-reader-head"><span className="doc-icon large"><FileText/></span><div><div className="eyebrow">{doc.eyebrow}</div><h1>{doc.title}</h1><p>{doc.subtitle}</p></div></div>
        <div className="doc-reader-note"><CircleDot size={16}/><span>作品集展示版 · 关键内容摘要。后续可将飞书正式文档中的最终内容补充到这里。</span></div>
        <div className="doc-toc"><b>本文目录</b>{doc.sections.map(([title],i)=><a key={title} href={`#section-${i}`}>{title}</a>)}</div>
        <div className="doc-body">{doc.sections.map(([title,body],i)=><section id={`section-${i}`} className="doc-section" key={title}><h2>{title}</h2><p>{body}</p></section>)}</div>
        <div className="doc-reader-footer"><div><b>需要查看完整材料？</b><p>可在此处添加飞书原文链接或 PDF 下载入口。</p></div><span className="placeholder-link"><ExternalLink size={15}/> 完整版链接待补充</span></div>
      </div>
    </div>
  </main>;
}

function About({ go }) {
  return <main className="inner-page"><div className="section-wrap about-page">
    <button className="back-link" onClick={() => go({type:'home'})}><ChevronLeft size={16}/> 返回作品集首页</button>
    <div className="eyebrow">ABOUT ME</div><h1>关注产品问题，<br/><span>也关注 AI 如何落地。</span></h1>
    <p className="about-lead">我正在通过 AI 产品项目实践，积累从用户需求分析、产品方案设计到 Agent 工作流搭建与测试评估的经验。</p>
    <div className="about-grid"><div className="about-card"><Target/><h3>产品思维</h3><p>关注目标用户、场景、核心价值与功能边界。</p></div><div className="about-card"><Database/><h3>数据意识</h3><p>关注数据质量、分析口径和结果是否可验证。</p></div><div className="about-card"><Code2/><h3>AI 实践</h3><p>使用 Dify、LangGraph 与大模型能力构建可运行的 MVP。</p></div></div>
    <div className="profile-edit-note"><b>发布前请补充个人信息</b><p>姓名、学校 / 专业、求职方向、邮箱与简历链接目前均未填写，避免模板替你虚构个人经历。</p></div>
  </div></main>;
}

createRoot(document.getElementById('root')).render(<App />);

