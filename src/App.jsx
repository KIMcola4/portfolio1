import { useEffect, useSyncExternalStore } from 'react'
import './App.css'

function subscribeToNavigation(onChange) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getCurrentLocation() {
  return window.location.hash
}

const projects = [
  {
    number: '01', category: '취미 · 게임', title: '친구들과 함께한 게임 활동', description: '게임에서 가장 좋아하는 건 친구들과 함께하는 시간이에요.', style: 'game',
    overview: '저는 친구들과 함께 게임하는 것을 좋아해요. 이곳에는 함께한 게임 활동을 소개하려고 해요.',
    note: '어떤 게임을 했는지, 어떤 순간이 기억에 남았는지와 사진은 나중에 추가할 예정이에요.',
  },
]

function ProjectArtwork({ project, className = '' }) {
  return (
    <div className={`project-art ${project.style} ${className}`} aria-hidden="true">
      <span className="project-number">{project.number}</span>
      <div className="game-art-shape" /><span className="game-art-symbol">✳</span><span className="game-art-caption">함께라서<br />더 즐거운 시간<span>친구들과 게임하기</span></span>
    </div>
  )
}

function App() {
  const currentLocation = useSyncExternalStore(subscribeToNavigation, getCurrentLocation)
  const isPortfolioPage = currentLocation === '#/portfolio'
  const isAboutPage = currentLocation === '#/about' || currentLocation === '#about'
  const isProjectPage = currentLocation.startsWith('#/portfolio/')
  const selectedProject = isProjectPage ? projects.find((project) => currentLocation === `#/portfolio/${project.style}`) : undefined

  useEffect(() => {
    document.title = isProjectPage ? `${selectedProject?.title ?? '프로젝트를 찾을 수 없어요'} | 나의 포트폴리오` : isPortfolioPage ? '포트폴리오 목록 | 나의 포트폴리오' : isAboutPage ? '자기소개 | 나의 포트폴리오' : '나의 포트폴리오'

    if (isPortfolioPage || isAboutPage || isProjectPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById(isProjectPage ? 'project-title' : isPortfolioPage ? 'portfolio-title' : 'about-page-title')?.focus({ preventScroll: true })
    } else {
      const targetId = currentLocation.slice(1) || 'home'
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' })
    }
  }, [currentLocation, isPortfolioPage, isAboutPage, isProjectPage, selectedProject])

  return (
    <>
      <a className="skip-link" href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus(); document.getElementById('main')?.scrollIntoView({ block: 'start' }) }}>본문으로 바로가기</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="나의 포트폴리오 홈">
            <span className="brand-symbol" aria-hidden="true">✳</span> my portfolio<span className="brand-dot">.</span>
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#/about" aria-current={isAboutPage ? 'page' : undefined}>자기소개</a>
            <a href="#/portfolio" aria-current={isPortfolioPage || isProjectPage ? 'page' : undefined}>나의 활동 <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {!isPortfolioPage && !isAboutPage && !isProjectPage && <>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> 좋아하는 것에서 시작하는 나의 이야기</p>
            <h1 id="hero-title">함께 즐기고,<br /><span className="underlined">새롭게 상상해요.</span></h1>
            <p className="hero-description">친구들과 함께 게임을 즐기고,<br />새로운 아이디어를 떠올리는 사람입니다.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#/portfolio">나의 활동 보기 <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#/about">어떤 사람인가요? <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">✳</span> 완벽하지 않아도 괜찮아. 일단 시작해 보기!</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-grid" /><div className="art-orbit" /><span className="art-spark">✳</span>
            <div className="floating-label"><span className="status-dot" /> 다음 도전은 캐릭터 그리기</div>
            <div className="project-window">
              <div className="window-bar"><span /><span /><span /><p>my-portfolio</p><span className="window-expand">↗</span></div>
              <div className="window-content">
                <span className="window-kicker">나의 다음 도전</span>
                <p className="window-title">상상 속 캐릭터를<br />내 손으로<span>.</span></p>
                <div className="window-scene"><div className="scene-circle" /><div className="scene-stairs"><i /><i /><i /></div><span>↗</span></div>
                <div className="window-footer"><span>아이디어에서 그림으로</span><span>01 / ∞</span></div>
              </div>
            </div>
            <div className="idea-note"><span>나에게 남기는 메모</span><p>상상한 캐릭터를<br />직접 그려 보고 싶어!</p><span className="note-arrow">⤴</span></div>
            <div className="art-caption">상상 <span>→</span> 도전 <span>→</span> 성장</div>
          </div>
        </section>
        <div className="section-divider page-width"><span>아래에서 나를 더 알아보세요</span><span aria-hidden="true">↓</span></div>
        <section className="about-section page-width" id="about" aria-labelledby="about-title">
          <div className="section-heading"><p className="eyebrow">01 / 나를 소개해요</p><h2 id="about-title">안녕하세요,<br />이런 걸 좋아해요<span>.</span></h2></div>
          <div className="about-content">
            <span className="example-label">취미와 장점</span>
            <h3>친구들과 즐기는 게임,<br />새로운 아이디어 떠올리기.</h3>
            <p>친구들과 함께 게임하는 시간을 좋아해요. 잘하는 것은 아이디어 떠올리기예요. 앞으로 그림과 캐릭터 디자인을 배워 보고 싶어요.</p>
            <div className="interest-tags"><span># 친구들과 게임</span><span># 아이디어</span><span># 캐릭터 디자인</span></div>
            <a className="text-link about-more" href="#/about">자기소개 보기 <span aria-hidden="true">→</span></a>
          </div>
        </section>
        <section className="work-invitation">
          <div className="page-width work-invitation-inner">
            <div><p className="eyebrow">02 / 나의 활동</p><h2>친구들과 함께한 시간<span>.</span></h2><p className="invitation-description">좋아하는 게임 활동을 소개할 공간이에요.</p></div>
            <a className="button button-primary" href="#/portfolio">활동 목록 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        </>}
        {isAboutPage && <section className="about-page page-width" aria-labelledby="about-page-title">
          <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
          <div className="about-page-heading">
            <p className="eyebrow">나의 이야기 / 자기소개</p>
            <h1 id="about-page-title" tabIndex={-1}>자기소개<span>.</span></h1>
            <p className="list-description">좋아하는 것과 배우는 것, 그리고 앞으로의 나에 대한 이야기.</p>
          </div>
          <div className="about-profile">
            <div className="about-profile-art" aria-hidden="true"><span>✳</span><p>좋아하는 것부터,<br />새로운 도전까지.</p><div>나만의 속도로,<br />나만의 방향으로.</div></div>
            <div className="about-content">
              <span className="example-label">나를 알아가는 시간</span>
              <h2>함께 즐기고,<br />새롭게 상상해요<span>.</span></h2>
              <p>친구들과 함께 게임을 즐기고, 새로운 아이디어를 떠올리는 사람입니다.</p>
              <dl className="about-details">
                <div><dt>관심사와 취미</dt><dd>친구들과 함께 게임하는 것을 좋아해요.</dd></div>
                <div><dt>내가 잘하는 것</dt><dd>새로운 아이디어 떠올리기예요.</dd></div>
                <div><dt>배우고 싶은 것</dt><dd>그림과 캐릭터 디자인을 배워 보고 싶어요.</dd></div>
                <div><dt>앞으로의 목표</dt><dd>내가 상상한 캐릭터를 직접 그려 보고 싶어요.</dd></div>
              </dl>
              <a className="button button-primary" href="#/portfolio">나의 활동 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>}
        {isPortfolioPage && <section className="portfolio-section portfolio-page" aria-labelledby="portfolio-title">
          <div className="page-width">
            <a className="text-link list-back" href="#home"><span aria-hidden="true">←</span> 홈으로 돌아가기</a>
            <div className="portfolio-heading"><div><p className="eyebrow">나의 기록 / 함께한 시간</p><h1 id="portfolio-title" tabIndex={-1}>나의 활동<span>.</span></h1><p className="list-description">친구들과 함께한 게임 활동을 소개해요.</p></div><p>자세한 이야기와 사진은<br />나중에 더해 갈 예정이에요.</p></div>
            <div className="list-summary"><span>전체 활동</span><span>{projects.length.toString().padStart(2, '0')}</span></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.number}>
                  <a className="project-card-link" href={`#/portfolio/${project.style}`} aria-label={`${project.title} 자세히 보기`}>
                    <ProjectArtwork project={project} />
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3><p>{project.description}</p>
                    <span className="project-read-more">자세히 보기 <span aria-hidden="true">↗</span></span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>}
        {isProjectPage && <section className="project-detail page-width" aria-labelledby="project-title">
          <a className="text-link list-back" href="#/portfolio"><span aria-hidden="true">←</span> 활동 목록으로</a>
          {selectedProject ? <>
            <header className="detail-heading">
              <p className="eyebrow">활동 {selectedProject.number} / {selectedProject.category}</p>
              <h1 id="project-title" tabIndex={-1}>{selectedProject.title}<span>.</span></h1>
              <p className="list-description">{selectedProject.description}</p>
            </header>
            <div className="detail-banner">
              <ProjectArtwork project={selectedProject} className="detail-art" />
              <div className="detail-overview">
                <span className="example-label">나의 취미 활동</span>
                <h2>활동 소개</h2>
                <p>{selectedProject.overview}</p>
                <p className="detail-example-note">{selectedProject.note}</p>
              </div>
            </div>
            <div className="detail-bottom"><p>나의 관심사와 목표도 알아보세요.</p><a className="button button-primary" href="#/about">자기소개 보기 <span aria-hidden="true">→</span></a></div>
          </> : <div className="project-not-found"><h1 id="project-title" tabIndex={-1}>활동을 찾을 수 없어요.</h1><p>주소를 확인하거나 활동 목록에서 항목을 선택해 주세요.</p><a className="button button-primary" href="#/portfolio">활동 목록 보기 <span aria-hidden="true">→</span></a></div>}
        </section>}
      </main>
      <footer className="site-footer page-width"><a className="wordmark" href="#home">my portfolio<span className="brand-dot">.</span></a><p>나의 이야기는 계속됩니다.</p><button className="back-top" type="button" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.getElementById('main')?.focus({ preventScroll: true }) }}>맨 위로 <span aria-hidden="true">↑</span></button></footer>
    </>
  )
}

export default App
