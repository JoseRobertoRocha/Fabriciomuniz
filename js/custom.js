

  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    // MODAL CONTRATAÇÃO - ENVIAR PARA WHATSAPP
    $(document).ready(function() {
      $('#enviarWhatsapp').on('click', function() {
        const form = document.getElementById('contrataForm');
        
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const nome = document.getElementById('nomeContato').value;
        const telefone = document.getElementById('telefoneContato').value;
        const cidade = document.getElementById('cidadeEvento').value;
        const data = document.getElementById('dataEvento').value;
        const tipo = document.getElementById('tipoEvento').value;
        const obs = document.getElementById('observacoes').value;

        // Formatar data
        const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');

        // Montar mensagem
        let mensagem = `*Solicitação de Contratação - Fabricio Muniz*%0A%0A`;
        mensagem += `📝 *Nome:* ${nome}%0A`;
        mensagem += `📱 *WhatsApp:* ${telefone}%0A`;
        mensagem += `📍 *Cidade:* ${cidade}%0A`;
        mensagem += `📅 *Data:* ${dataFormatada}%0A`;
        mensagem += `🎉 *Tipo de Evento:* ${tipo}%0A`;
        if (obs) {
          mensagem += `💬 *Observações:* ${obs}%0A`;
        }
        mensagem += `%0A_Enviado via site oficial_`;

        // Número do WhatsApp (substitua pelo número real)
        const numeroWhatsApp = '5575998921068'; // Formato: código do país + DDD + número
        
        // Abrir WhatsApp
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
        window.open(urlWhatsApp, '_blank');

        // Fechar modal e limpar form
        $('#contrataModal').modal('hide');
        form.reset();
      });

      // Limpar form quando modal fechar
      $('#contrataModal').on('hidden.bs.modal', function() {
        document.getElementById('contrataForm').reset();
      });
    });

    // MUSIC PLAYER
    $(document).ready(function() {
      const audioPlayer = document.getElementById('audioPlayer');

        // Toggle ver mais / ver menos da playlist
        const toggleBtn = $('#togglePlaylist');
        const expandable = $('#playlistExpandable');
        if (toggleBtn.length && expandable.length) {
            let expanded = false;
            toggleBtn.on('click', function() {
                expanded = !expanded;
                expandable.toggleClass('expanded');
                if (expanded) {
                    expandable.attr('aria-hidden', 'false');
                    toggleBtn.attr('aria-expanded', 'true').text('Ver menos');
                    $('html, body').animate({ scrollTop: expandable.offset().top - 100 }, 600);
                } else {
                    expandable.attr('aria-hidden', 'true');
                    toggleBtn.attr('aria-expanded', 'false').text('Ver mais');
                }
            });
        }
      const playPauseBtn = document.getElementById('playPauseBtn');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const progressBar = document.getElementById('progressBar');
      const progressFill = document.getElementById('progressFill');
      const currentTimeEl = document.getElementById('currentTime');
      const durationEl = document.getElementById('duration');
      const volumeSlider = document.getElementById('volumeSlider');
      const currentSongTitle = document.getElementById('currentSongTitle');
      const currentSongArtist = document.getElementById('currentSongArtist');
      
      let currentSongIndex = 0;
      let isPlaying = false;
      let playlistItems = [];

      // Aguardar a playlist ser construída
      setTimeout(function() {
        playlistItems = document.querySelectorAll('.playlist-item');
        initializePlayer();
      }, 100);

      // Configurar volume inicial
      if (audioPlayer) {
        audioPlayer.volume = 0.7;
      }

      function initializePlayer() {
        if (playlistItems.length === 0) return;

        // Carregar primeira música
        loadSong(0);

        // Event listeners dos itens da playlist
        playlistItems.forEach(function(item, index) {
          item.addEventListener('click', function(e) {
            if (e.target.closest('.spotify-link')) return;
            
            if (currentSongIndex === index && isPlaying) {
              togglePlayPause();
            } else {
              loadSong(index);
              togglePlayPause();
            }
          });

          const playBtn = item.querySelector('.play-button');
          if (playBtn) {
            playBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              if (currentSongIndex === index && isPlaying) {
                togglePlayPause();
              } else {
                loadSong(index);
                togglePlayPause();
              }
            });
          }
        });
      }

      // Função para formatar tempo
      function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
      }

      // Carregar música
      function loadSong(index) {
        if (index < 0 || index >= playlistItems.length) return;
        
        const songId = playlistItems[index].getAttribute('data-song-id');
        const songData = window.getSongData ? window.getSongData(songId) : null;

        if (songData) {
          currentSongTitle.textContent = songData.title;
          currentSongArtist.textContent = songData.artist;
          durationEl.textContent = songData.duration;

          // Carregar arquivo de áudio se existir
          if (songData.audioFile && songData.audioFile !== '') {
            audioPlayer.src = songData.audioFile;
          }
        } else {
          // Alternativa: ler do DOM
          const titleEl = playlistItems[index].querySelector('.song-title');
          const artistEl = playlistItems[index].querySelector('.song-artist');
          const durationSpan = playlistItems[index].querySelector('.song-duration');

          if (titleEl) currentSongTitle.textContent = titleEl.textContent;
          if (artistEl) currentSongArtist.textContent = artistEl.textContent;
          if (durationSpan) durationEl.textContent = durationSpan.textContent;
        }

        // Remover classe active de todos os itens
        playlistItems.forEach(function(item) {
          item.classList.remove('active');
        });
        
        // Adicionar classe active ao item atual
        playlistItems[index].classList.add('active');

        currentSongIndex = index;
      }

      // Play/Pause
      function togglePlayPause() {
        if (isPlaying) {
          audioPlayer.pause();
          playPauseBtn.querySelector('i').classList.remove('bi-pause-fill');
          playPauseBtn.querySelector('i').classList.add('bi-play-fill');
          isPlaying = false;
        } else {
          audioPlayer.play().catch(function(error) {
            console.log('Erro ao reproduzir:', error);
          });
          playPauseBtn.querySelector('i').classList.remove('bi-play-fill');
          playPauseBtn.querySelector('i').classList.add('bi-pause-fill');
          isPlaying = true;
        }
      }

      // Atualizar barra de progresso
      if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', function() {
          if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressFill.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
          }
        });

        audioPlayer.addEventListener('loadedmetadata', function() {
          durationEl.textContent = formatTime(audioPlayer.duration);
        });

        audioPlayer.addEventListener('ended', function() {
          nextSong();
        });
      }

      // Clique na barra de progresso
      if (progressBar) {
        progressBar.addEventListener('click', function(e) {
          if (!audioPlayer.duration) return;
          const rect = progressBar.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          audioPlayer.currentTime = percent * audioPlayer.duration;
        });
      }

      // Controle de volume
      if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
          audioPlayer.volume = this.value / 100;
        });
      }

      // Próxima música
      function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
          audioPlayer.play().catch(function(error) {
            console.log('Erro ao reproduzir:', error);
          });
        }
      }

      // Música anterior
      function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
          audioPlayer.play().catch(function(error) {
            console.log('Erro ao reproduzir:', error);
          });
        }
      }

      // Event listeners dos botões
      if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', prevSong);
      }

      // Atalhos de teclado
      document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          togglePlayPause();
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          nextSong();
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          prevSong();
        }
      });
    });
  
  })(window.jQuery);




// Carregador: esconde após carregamento da página (com alternativa de segurança)
(function(){
  var loader = document.getElementById('site-loader');
  if(!loader) return;

  function hideLoader(){
    if(!loader) return;
    loader.classList.add('fade-out');
    // Remove do DOM após a transição
    setTimeout(function(){
      if(loader && loader.parentNode){ loader.parentNode.removeChild(loader); }
      loader = null;
    }, 1000);
  }

  // Quando todos os recursos carregarem
  window.addEventListener('load', function(){
    // Delay de 2s para exibir o carregamento
    setTimeout(hideLoader, 2000);
  });

  // Alternativa de segurança
  setTimeout(hideLoader, 6000);
})();




