<script module>
  type LetterObject = {
    letter: string;
    audioFile: string;
  };
</script>
<script lang="ts">
  import { t, getLetterName, setLocale, getLocale, getAvailableLocales, type Locale } from './i18n';

  let selectedLetter = $state<LetterObject | null>(null);
  let isPlaying = $state(false);
  let currentAudio = $state<HTMLAudioElement | null>(null);
  let locale = $state<Locale>(getLocale());

  const letterRows: LetterObject[][] = [
    [
      { letter: 'ا', audioFile: 'elif' },
      { letter: 'ب', audioFile: 'be' },
      { letter: 'ت', audioFile: 'te' },
      { letter: 'ث', audioFile: 'se' }
    ],
    [
      { letter: 'ج', audioFile: 'cim' },
      { letter: 'ح', audioFile: 'ha' },
      { letter: 'خ', audioFile: 'kha' }
    ],
    [
      { letter: 'د', audioFile: 'dal' },
      { letter: 'ذ', audioFile: 'zel' },
      { letter: 'ر', audioFile: 'ra' },
      { letter: 'ز', audioFile: 'ze' }
    ],
    [
      { letter: 'س', audioFile: 'sin' },
      { letter: 'ش', audioFile: 'sin_s' },
      { letter: 'ص', audioFile: 'sad' },
      { letter: 'ض', audioFile: 'dad' }
    ],
    [
      { letter: 'ط', audioFile: 'ti' },
      { letter: 'ظ', audioFile: 'zi' },
      { letter: 'ع', audioFile: 'ayn' },
      { letter: 'غ', audioFile: 'gayn' }
    ],
    [
      { letter: 'ف', audioFile: 'fe' },
      { letter: 'ق', audioFile: 'kaf' },
      { letter: 'ك', audioFile: 'kef' },
      { letter: 'ل', audioFile: 'lam' },
      { letter: 'م', audioFile: 'mim' }
    ],
    [
      { letter: 'ن', audioFile: 'nun' },
      { letter: 'و', audioFile: 'vav' },
      { letter: 'ه', audioFile: 'he' },
      { letter: 'لا', audioFile: 'lamelif' },
      { letter: 'ي', audioFile: 'ye' }
    ]
  ];

  const flatLetters: LetterObject[] = letterRows.flat();

  function getcurrentIndex(): number {
    if (!selectedLetter) return -1;
    const letter = selectedLetter;
    return flatLetters.findIndex(l => l.audioFile === letter.audioFile);
  }

  function prevLetter() {
    const idx = getcurrentIndex();
    const prev = idx <= 0 ? flatLetters[flatLetters.length - 1] : flatLetters[idx - 1];
    selectedLetter = prev;
    playAudio(prev.audioFile);
  }

  function nextLetter() {
    const idx = getcurrentIndex();
    const next = idx >= flatLetters.length - 1 ? flatLetters[0] : flatLetters[idx + 1];
    selectedLetter = next;
    playAudio(next.audioFile);
  }

  function playAudio(audioFile: string) {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(`./audio/${audioFile}.mp3`);
    currentAudio = audio;
    isPlaying = true;
    audio.play().catch(() => {});
    audio.onended = () => {
      isPlaying = false;
      currentAudio = null;
    };
  }

  function handleLetterClick(letterObj: LetterObject) {
    selectedLetter = letterObj;
    playAudio(letterObj.audioFile);
  }

  function closeVideo() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    selectedLetter = null;
    isPlaying = false;
  }

  function playPronunciation() {
    if (selectedLetter) {
      playAudio(selectedLetter.audioFile);
    }
  }

  function changeLanguage(newLocale: Locale) {
    locale = newLocale;
    setLocale(newLocale);
  }

  function getButtonClass(letterObj: LetterObject) {
    const base = "letter-button";
    if (selectedLetter && selectedLetter.letter === letterObj.letter) {
      return base + " active";
    }
    return base;
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="container">
  <div class="content">
    <div class="header-row">
      <h1 class="title-arabic">تعلم الحروف العربية</h1>
      <div class="language-switcher">
        {#each getAvailableLocales() as loc}
          <button
            class="lang-button"
            class:active={locale === loc.code}
            onclick={() => changeLanguage(loc.code)}
          >
            {loc.label}
          </button>
        {/each}
      </div>
    </div>
    <h2 class="title-normal">{t('title')}</h2>
    
    <div class="card">
      <p class="instruction">{t('instruction')}</p>
      
      <div class="letters-grid">
        {#each letterRows as row}
          <div class="letter-row">
            {#each row as letterObj}
              <button
                class={getButtonClass(letterObj)}
                onclick={() => handleLetterClick(letterObj)}
              >
                {letterObj.letter}
              </button>
            {/each}
          </div>
        {/each}
      </div>
    </div>

    {#if selectedLetter}
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div class="modal-backdrop" onclick={closeVideo} role="dialog" tabindex="-1">
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
        <div class="modal" onclick={(e) => e.stopPropagation()}>
          <div class="modal-header">
            <div class="header-content">
              {#if isPlaying}
                <svg class="volume-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              {/if}
            </div>
            <button onclick={closeVideo} class="close-button" aria-label={t('close')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="nav-wrapper">
              <button class="nav-button" onclick={prevLetter} aria-label="Previous letter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div class="modal-content-inner">
                <div class="video-placeholder">
                  <div class="video-content">
                    <div class="big-letter">{selectedLetter.letter}</div>
                    <p class="video-text">{t('articulationDemo')}</p>
                  </div>
                </div>
                
                <div class="info-section">
                  <div class="letter-info">
                    <span class="info-label">{t('letterName')}:</span>
                    <span class="info-value">{getLetterName(selectedLetter.audioFile)}</span>
                  </div>
                  
                  <button onclick={playPronunciation} class="play-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    {t('playPronunciation')}
                  </button>
                </div>
              </div>
              <button class="nav-button" onclick={nextLetter} aria-label="Next letter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="credits">
    <a href="https://dizayn-design.de/" target="_blank" rel="noopener noreferrer">
      {t('credits')}
    </a>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .container {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #fffbeb, #ffedd5, #fffbeb);
    padding: 2rem;
  }

  .content {
    max-width: 64rem;
    margin: 0 auto;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .language-switcher {
    display: flex;
    gap: 0.5rem;
  }

  .lang-button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #d97706;
    background: transparent;
    color: #92400e;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .lang-button:hover {
    background: #fef3c7;
  }

  .lang-button.active {
    background: #f59e0b;
    color: white;
  }

  .title-arabic {
    font-family: 'Amiri', serif;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
    margin: 0;
    color: #78350f;
  }

  .title-normal {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #b45309;
  }

  .card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    border-radius: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .instruction {
    text-align: center;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }

  .letters-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .letter-row {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .letter-button {
    width: 5rem;
    height: 5rem;
    border-radius: 0.75rem;
    font-family: 'Amiri', serif;
    font-size: 2.25rem;
    background: #fef3c7;
    color: #78350f;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter-button:hover {
    background: #fde68a;
    transform: scale(1.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .letter-button:active {
    transform: scale(0.95);
  }

  .letter-button.active {
    background: #f59e0b;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;
  }

  .modal {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    max-width: 28rem;
    width: 100%;
    overflow: hidden;
    animation: scaleIn 0.3s ease-out;
  }

  .modal-header {
    background: linear-gradient(to right, #f59e0b, #fb923c);
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .volume-icon {
    color: white;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .close-button {
    color: white;
    background: transparent;
    border: none;
    border-radius: 9999px;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .modal-body {
    padding: 1.5rem;
  }

  .video-placeholder {
    background: #f3f4f6;
    border-radius: 0.75rem;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .video-content {
    text-align: center;
  }

  .big-letter {
    font-family: 'Amiri', serif;
    font-size: 6rem;
    color: #d97706;
    margin-bottom: 1rem;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .video-text {
    color: #4b5563;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .letter-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fffbeb;
    border-radius: 0.5rem;
    padding: 0.75rem;
  }

  .info-label {
    font-weight: 600;
    color: #78350f;
  }

  .info-value {
    color: #b45309;
    font-size: 1.125rem;
  }

  .play-button {
    width: 100%;
    background: linear-gradient(to right, #f59e0b, #fb923c);
    color: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .play-button:hover {
    background: linear-gradient(to right, #d97706, #f97316);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .credits {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.875rem;
    color: #9ca3af;
  }

  .credits a {
    color: #9ca3af;
    text-decoration: none;
  }

  .credits a:hover {
    text-decoration: underline;
  }

  .nav-wrapper {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .modal-content-inner {
    flex: 1;
    min-width: 0;
  }

  .nav-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid #d97706;
    background: #fffbeb;
    color: #d97706;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    padding: 0;
  }

  .nav-button:hover {
    background: #f59e0b;
    color: white;
    border-color: #f59e0b;
  }

  .nav-button:hover {
    background: #f59e0b;
    color: white;
  }

  .nav-button:active {
    transform: scale(0.9);
  }
</style>
