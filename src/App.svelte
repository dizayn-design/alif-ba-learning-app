<script module>
  type LetterObject = {
    letter: string;
    name: string;
  };
</script>
<script lang="ts">

  let selectedLetter = $state<LetterObject | null>(null);
  let isPlaying = $state(false);

  const letterRows = [
    [
      { letter: 'ا', name: 'alif' },
      { letter: 'ب', name: 'baa' },
      { letter: 'ت', name: 'taa' },
      { letter: 'ث', name: 'thaa' }
    ],
    [
      { letter: 'ج', name: 'jeem' },
      { letter: 'ح', name: 'haa' },
      { letter: 'خ', name: 'khaa' }
    ],
    [
      { letter: 'د', name: 'daal' },
      { letter: 'ذ', name: 'dhaal' },
      { letter: 'ر', name: 'raa' },
      { letter: 'ز', name: 'zaay' }
    ],
    [
      { letter: 'س', name: 'seen' },
      { letter: 'ش', name: 'sheen' },
      { letter: 'ص', name: 'saad' },
      { letter: 'ض', name: 'daad' }
    ],
    [
      { letter: 'ط', name: 'taa' },
      { letter: 'ظ', name: 'dhaa' },
      { letter: 'ع', name: 'ayn' },
      { letter: 'غ', name: 'ghayn' }
    ],
    [
      { letter: 'ف', name: 'faa' },
      { letter: 'ق', name: 'qaaf' },
      { letter: 'ك', name: 'kaaf' },
      { letter: 'ل', name: 'laam' },
      { letter: 'م', name: 'meem' }
    ],
    [
      { letter: 'ن', name: 'noon' },
      { letter: 'و', name: 'waaw' },
      { letter: 'ه', name: 'haa' },
      { letter: 'لا', name: 'laa' },
      { letter: 'ي', name: 'yaa' }
    ]
  ];

  function handleLetterClick(letterObj: LetterObject) {
    selectedLetter = letterObj;
    isPlaying = true;
    setTimeout(() => {
      isPlaying = false;
    }, 2000);
  }

  function closeVideo() {
    selectedLetter = null;
    isPlaying = false;
  }

  function playPronunciation() {
    isPlaying = true;
    setTimeout(() => {
      isPlaying = false;
    }, 2000);
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
    <h1 class="title-arabic">تعلم الحروف العربية</h1>
    <h2 class="title-normal">Elif Ba Tâlimi</h2>
    
    <div class="card">
      <p class="instruction">Click on any letter to hear its pronunciation and see articulation</p>
      
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
      <div class="modal-backdrop">
        <div class="modal">
          <div class="modal-header">
            <div class="header-content">
              <span class="header-letter">{selectedLetter.letter}</span>
              {#if isPlaying}
                <svg class="volume-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              {/if}
            </div>
            <button onclick={closeVideo} class="close-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="video-placeholder">
              <div class="video-content">
                <div class="big-letter">{selectedLetter.letter}</div>
                <p class="video-text">Articulation demonstration</p>
              </div>
            </div>
            
            <div class="info-section">
              <div class="letter-info">
                <span class="info-label">Letter Name:</span>
                <span class="info-value">{selectedLetter.name}</span>
              </div>
              
              <button onclick={playPronunciation} class="play-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                Play Pronunciation
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="credits">
    <a href="https://dizayn-design.de/" target="_blank" rel="noopener noreferrer">
      Credits to Dizayn Design
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

  .title-arabic {
    font-family: 'Amiri', serif;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
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

  .header-letter {
    font-family: 'Amiri', serif;
    font-size: 3.75rem;
    color: white;
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
</style>