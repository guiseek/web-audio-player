import { hexToRgb, rgbToHex, setPaletteColor } from './utilities/color';
import { queryGroupBySelector } from './utilities/query';
import { PlayerElements } from './types/elements';

const elCtrl = queryGroupBySelector<PlayerElements>({
  em: 'em',
  form: 'form',
  play: '#play',
  prev: '#prev',
  next: '#next',
  time: '#time',
  color: '#color',
  canvas: 'canvas',
  select: 'select',
  volume: '#volume',
  colorRange: '#color-range',
  playIcon: '#play svg > use',
});

const configColor = {
  range: {
    min: 0,
    max: 1530
  },
  step: 1,
  initial: { red: 255, green: 0, blue: 0 },
  sequence: [
    { min: 0, max: 255, key: 'blue', dir: 'up', value: { red: 255, green: 0, blue: 0 } },
    { min: 256, max: 510, key: 'red', dir: 'down', value: { red: 255, green: 0, blue: 255 } },
    { min: 511, max: 765, key: 'green', dir: 'up', value: { red: 0, green: 0, blue: 255 }  },
    { min: 766, max: 1020, key: 'blue', dir: 'down', value: { red: 0, green: 255, blue: 255 } },
    { min: 1021, max: 1275, key: 'red', dir: 'up', value: { red: 0, green: 255, blue: 0 } },
    { min: 1276, max: 1530, key: 'green', dir: 'down', value: { red: 255, green: 255, blue: 0 } },
  ]
}

elCtrl.colorRange.step = `${configColor.step}`;
elCtrl.colorRange.min = `${configColor.range.min}`;
elCtrl.colorRange.max = `${configColor.range.max}`;
elCtrl.colorRange.value = `${configColor.range.min}`;

elCtrl.colorRange.oninput = () => {
  const value = elCtrl.colorRange.valueAsNumber;
  
  const step = configColor.sequence.find(({ min, max }) => value >= min && value <= max);  
  
  const color = hexToRgb(elCtrl.color.value, { format: 'object' });
  
  if (step && color) {
    if (step.dir === 'up') {
      color[step.key] = step.value[step.key] + (value - step.min);
    } else {
      color[step.key] = step.value[step.key] - (value - step.min);
    }

    setPaletteColor('color-primary', rgbToHex(color));
  }
}



function inicializa() {
  const audio = new Audio();
  const selectKeys = ['Enter', 'Space'];

  let tocandoAgora = 0;

  let barsColor = '#0084ff';

  // Interface da m??sica
  interface AudioTrack {
    artist: string;
    title?: string;
    album?: string;
    year?: number;
    url: string;
  }

  // Playlist
  const listaDeMusicas: AudioTrack[] = [
    {
      url: new URL('./assets/SoundHelix-Song-1.mp3', import.meta.url).pathname,
      artist: 'SoundHelix Song 1',
    },
    {
      url: new URL('./assets/SoundHelix-Song-2.mp3', import.meta.url).pathname,
      artist: 'SoundHelix Song 2',
    },
    {
      url: new URL('./assets/SoundHelix-Song-3.mp3', import.meta.url).pathname,
      artist: 'SoundHelix Song 3',
    },
  ];

  // Adiciona m??sicas no select
  listaDeMusicas.forEach((musica, numero) => {
    elCtrl.select.add(new Option(musica.artist, `${numero}`));
  });

  // Atualiza o slider conforme o audio
  audio.ontimeupdate = () => {
    if (elCtrl.time) {
      elCtrl.time.value = audio.currentTime.toString();

      const s = elCtrl.time.valueAsNumber % 60 | 0;
      const m = (elCtrl.time.valueAsNumber / 60) % 60 | 0;
      elCtrl.time.nextElementSibling!.textContent = `${m < 10 ? '0' : ''
        }${m}:${s < 10 ? '0' : ''}${s}`;
    }
  };

  elCtrl.color.value = barsColor;

  elCtrl.color.oninput = () => {
    barsColor = elCtrl.color.value;
    document.documentElement.style.setProperty('--color-primary', barsColor);
  };

  audio.onloadedmetadata = () => {
    elCtrl.time.max = `${audio.duration}`;
  };

  // Ao arrastar o slider, sincroniza o audio
  elCtrl.time.oninput = () => {
    audio.currentTime = elCtrl.time.valueAsNumber;
  };

  // Ao arrastar o slider, altera o volume
  elCtrl.volume.oninput = () => {
    audio.volume = elCtrl.volume.valueAsNumber / 100;

    elCtrl.volume.nextElementSibling!.textContent = `${elCtrl.volume.valueAsNumber}%`;
  };

  // Esconde o play e mostra o pause
  audio.onplay = () => {
    frameLooper();

    elCtrl.playIcon.href.baseVal = '#pause-symbol';

    elCtrl.em.textContent = listaDeMusicas[tocandoAgora].artist;
  };

  // Esconde o pause e mostra o play
  audio.onpause = () => {
    elCtrl.playIcon.href.baseVal = '#play-symbol';
  };

  // Ao clicar no play, toca a m??sica
  elCtrl.play.onclick = () => {
    // Se n??o tiver nada selecionado
    if (!elCtrl.select.value) {
      // Toca a primeira m??sica
      elCtrl.select.value = '0';
      listaDeMusicas[+elCtrl.select.value].url;
    }

    // Se n??o tiver nada tocando, da play
    if (audio.paused) {
      audio.play();
      // Se estiver tocando, pausa
    } else {
      audio.pause();
    }
  };

  // Ao clicar no anterior, toca a m??sica anterior
  elCtrl.prev.onclick = () => {
    // Se a m??sica selecionada n??o for a primeira da lista
    if (tocandoAgora > 0) {
      // Toca a m??sica anterior
      tocandoAgora--;

      // Se for a primeira da lista, toca a ??ltima
    } else {
      tocandoAgora = listaDeMusicas.length - 1;
    }

    elCtrl.select.value = `${tocandoAgora}`;

    audio.src = listaDeMusicas[tocandoAgora].url;
    audio.play();
  };

  // Ao clicar no pr??xima, toca a pr??xima m??sica
  elCtrl.next.onclick = () => {
    // Se a m??sica selecionada n??o for a ??ltima da lista
    if (tocandoAgora < listaDeMusicas.length - 1) {
      // Toca a pr??xima m??sica
      tocandoAgora++;

      // Se n??o for a ??ltima da lista, toca a primeira
    } else {
      tocandoAgora = 0;
    }

    elCtrl.select.value = `${tocandoAgora}`;

    audio.src = listaDeMusicas[tocandoAgora].url;
    audio.play();
  };

  // Ao dar 2 cliques em uma m??sica, toca a m??sica
  elCtrl.select.ondblclick = () => trocaMusica();

  /**
   * Verifica se a tecla pressionada faz parte da lista
   * que definimos como teclas selecion??veis.
   * Caso seja verdade, toca a m??sica.
   */
  elCtrl.select.onkeydown = (event) => {
    if (selectKeys.includes(event.code)) {
      trocaMusica();
    }
  };

  function trocaMusica() {
    // O + converte str pra int
    const numero = +elCtrl.select.value;

    audio.src = listaDeMusicas[numero].url;
    audio.play();

    tocandoAgora = numero;
  }

  /* ================================== */

  const audioCtx = new AudioContext();
  const canvasCtx = elCtrl.canvas.getContext('2d');

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
    elCtrl.canvas.width = innerWidth - 40;

    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, elCtrl.canvas.width, elCtrl.canvas.height);
      canvasCtx.fillStyle = barsColor;

      bars = elCtrl.canvas.width;

      for (let i = 0; i < bars; i++) {
        barWidth = elCtrl.canvas.width / bars;
        barX = i * (barWidth + 2);
        barHeight = -dataArray[i] / 1.6;
        canvasCtx.fillRect(barX, elCtrl.canvas.height, barWidth, barHeight);
      }
    }
  };

  let frameLooper = () => {
    requestAnimationFrame(frameLooper);
    analyserNode.getByteFrequencyData(dataArray);
    render();
  };
}

let loaded = false;

document.onclick = () => {
  if (!loaded) {
    inicializa();
  }
  loaded = true;
};
