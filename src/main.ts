let loaded = false;

function createPlayer() {
  let tocandoAgora = 0;

  let audio = new Audio();

  // Seleciona os elementos com querySelector
  const form = document.querySelector('form');
  const em = document.querySelector('em');
  // const audio = document.querySelector('audio');
  const select = document.querySelector('select');
  const canvas = document.querySelector('canvas');
  const playIcon = document.querySelector<SVGAElement>('#play-icon');
  const pauseIcon = document.querySelector<SVGElement>('#pause-icon');

  // Usado pra capturar botões
  function getButton(id: string) {
    return form?.querySelector<HTMLButtonElement>('#' + id);
  }

  // Usado pra capturar controles
  function getInput(id: string) {
    return form?.querySelector<HTMLInputElement>('#' + id);
  }

  // Captura botões
  const play = getButton('play');
  const anterior = getButton('anterior');
  const proxima = getButton('proxima');

  const tempo = getInput('tempo');
  const volume = getInput('volume');

  // Interface da música
  interface AudioTrack {
    artist: string;
    title?: string;
    album?: string;
    year?: number;
    url: string;
  }

  // Playlist
  const listaDeMusicas: AudioTrack[] = [
    { url: new URL('./assets/SoundHelix-Song-1.mp3', import.meta.url).pathname, artist: 'SoundHelix Song 1' },
    { url: new URL('./assets/SoundHelix-Song-2.mp3', import.meta.url).pathname, artist: 'SoundHelix Song 2' },
    { url: new URL('./assets/SoundHelix-Song-3.mp3', import.meta.url).pathname, artist: 'SoundHelix Song 3' },
  ];

  // Adiciona músicas no select
  listaDeMusicas.forEach((musica, numero) => {
    select.add(new Option(musica.artist, `${numero}`));
  });

  /**
   * Daqui pra baixo tudo é baseado em eventos do DOM
   * onplay
   * onpause
   *
   * Da pra usar ainda:
   * onended, ontimeupdate...
   *
   * onended: pra passar pra próxima música quando uma terminar
   * ontimeupdate: pra atualizar o tempo tocando
   *
   */

  // Atualiza o slider conforme o audio
  audio.ontimeupdate = () => {
    if (tempo) {
      tempo.value = audio.currentTime.toString();

      const s = tempo.valueAsNumber % 60 | 0;
      const m = (tempo.valueAsNumber / 60) % 60 | 0;
      tempo.nextElementSibling!.textContent = `${m < 10 ? '0' : ''}${m}:${
        s < 10 ? '0' : ''
      }${s}`;
    }
  };

  // Ao arrastar o slider, sincroniza o audio
  tempo.oninput = () => {
    audio.currentTime = tempo.valueAsNumber;
  };

  // Ao arrastar o slider, altera o volume
  volume.oninput = () => {
    audio.volume = volume.valueAsNumber / 100;

    volume.nextElementSibling!.textContent = `${volume.valueAsNumber}%`;
  };

  // Esconde o play e mostra o pause
  audio.onplay = () => {
    frameLooper();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    em.textContent = listaDeMusicas[tocandoAgora].artist;
  };

  // Esconde o pause e mostra o play
  audio.onpause = () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  };

  // Ao clicar no play, toca a música
  play.onclick = () => {
    // Se não tiver nada selecionado
    if (!select.value) {
      // Toca a primeira música
      select.value = '0';      
      listaDeMusicas[+select.value].url;
    }

    // Se não tiver nada tocando, da play
    if (audio.paused) {
      audio.play();
      // Se estiver tocando, pausa
    } else {
      audio.pause();
    }
  };

  // Ao clicar no anterior, toca a música anterior
  anterior.onclick = () => {
    // Se a música selecionada não for a primeira da lista
    if (tocandoAgora > 0) {
      // Toca a música anterior
      tocandoAgora--;

      // Se for a primeira da lista, toca a última
    } else {
      tocandoAgora = listaDeMusicas.length - 1;
    }

    select.value = `${tocandoAgora}`;

    audio.src = listaDeMusicas[tocandoAgora].url;
    audio.play();
  };

  // Ao clicar no próxima, toca a próxima música
  proxima.onclick = () => {
    // Se a música selecionada não for a última da lista
    if (tocandoAgora < listaDeMusicas.length - 1) {
      // Toca a próxima música
      tocandoAgora++;

      // Se não for a última da lista, toca a primeira
    } else {
      tocandoAgora = 0;
    }

    select.value = `${tocandoAgora}`;

    audio.src = listaDeMusicas[tocandoAgora].url;
    audio.play();
  };

  // Ao dar 2 cliques em uma música, toca a música
  select.ondblclick = () => trocaMusica();

  // Ao pressionar enter focado no select, toca a música
  select.onkeydown = (event) => {
    if (event.key === 'Enter') {
      trocaMusica();
    }
  };

  function trocaMusica() {
    // O + converte str pra int
    const numero = +select.value;

    audio.src = listaDeMusicas[numero].url;
    audio.play();

    tocandoAgora = numero;
  }

  /* ================================== */

  const audioCtx = new AudioContext();
  const canvasCtx = canvas.getContext('2d');

  audio.src = listaDeMusicas[0].url;
  audio.crossOrigin = 'anonymous';

  const audioSourceNode = audioCtx.createMediaElementSource(audio);

  const analyserNode = audioCtx.createAnalyser();
  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  audioSourceNode.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);

  let bars: number;
  let barX: number;
  let barWidth: number;
  let barHeight: number;

  let render = () => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = 'rgba(0, 132, 255, 0.466)';
    bars = 280;
    for (let i = 0; i < bars; i++) {
      barWidth = canvas.width / bars;
      barX = i * (barWidth + 2);
      barHeight = -dataArray[i] / 1.6;
      canvasCtx.fillRect(barX, canvas.height, barWidth, barHeight);
    }
  };

  let frameLooper = () => {
    requestAnimationFrame(frameLooper);
    analyserNode.getByteFrequencyData(dataArray);
    render();
  };
}

document.onclick = () => {
  if (!loaded) {
    createPlayer();
    loaded = true;
  }
};
