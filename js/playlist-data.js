// Dados da Playlist - Fabricio Muniz
// Para adicionar suas músicas, edite os dados abaixo

(function() {
  'use strict';

  // Configuração de codificação simples
  const _0x4a2b = {
    decode: function(str) {
      return atob(str);
    },
    encode: function(str) {
      return btoa(str);
    }
  };

  // Dados das músicas (você pode adicionar/editar aqui)
  window.playlistData = [
    {
      id: 1,
      title: '(01) - Conversas e Lenções',
      artist: 'Fabricio Muniz',
      duration: '3:51',
      audioFile: 'musicas/ConversaseLenções.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 2,
      title: '(02) - Dona',
      artist: 'Fabricio Muniz',
      duration: '3:18',
      audioFile: 'musicas/Dona.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 3,
      title: '(03) - Fora dos Stories',
      artist: 'Fabricio Muniz',
      duration: '3:47',
      audioFile: 'musicas/ForadosStories.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 4,
      title: '(04) - Oi Balde',
      artist: 'Fabricio Muniz',
      duration: '3:16',
      audioFile: 'musicas/OiBaldeFabrício.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 5,
      title: '(05) - Sonho de Amor',
      artist: 'Fabricio Muniz',
      duration: '3:18',
      audioFile: 'musicas/Sonhodeamor.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 6,
      title: '(06) - Chegou um Audio',
      artist: 'Fabricio Muniz',
      duration: '2:44',
      audioFile: 'musicas/ChegouumAudio.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 7,
      title: '(07) -Fica pra Sempre Aqui Comigo',
      artist: 'Fabricio Muniz',
      duration: '3:06',
      audioFile: 'musicas/FicapraSempreAquiComigo.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    },
    {
      id: 8,
      title: '(08) - Eu te supero',
      artist: 'Fabricio Muniz',
      duration: '3:35',
      audioFile: 'musicas/DeixaEuTeSuperar.mp3', // Caminho do arquivo de áudio
      spotifyUrl: 'https://open.spotify.com'
    }
  ];

  // Função para criar HTML da playlist
  window.buildPlaylist = function() {
    const container = document.getElementById('playlistContainer');
    if (!container) return;

    let html = '';
    
    window.playlistData.forEach(function(song) {
      html += `
        <div class="playlist-item" data-song-id="${song.id}">
          <div class="playlist-item-left">
            <div class="play-button">
              <i class="bi-play-fill"></i>
            </div>
            <div class="song-info">
              <h4 class="song-title">${song.title}</h4>
              <p class="song-artist">${song.artist}</p>
            </div>
          </div>
          <div class="playlist-item-right">
            <span class="song-duration">${song.duration}</span>
            <a href="${song.spotifyUrl}" target="_blank" class="spotify-link">
              <i class="bi-spotify"></i>
            </a>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  };

  // Função para obter dados da música por ID
  window.getSongData = function(id) {
    return window.playlistData.find(function(song) {
      return song.id === parseInt(id);
    });
  };

  // Construir playlist quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.buildPlaylist);
  } else {
    window.buildPlaylist();
  }

})();
