$(document).ready(function () {
  var classImages = [
    '/view/teaminfo/img/scout.png',
    '/view/teaminfo/img/soldier.png',
    '/view/teaminfo/img/pyro.png',
    '/view/teaminfo/img/demoman.png',
    '/view/teaminfo/img/heavy.png',
    '/view/teaminfo/img/engineer.png',
    '/view/teaminfo/img/medic.png',
    '/view/teaminfo/img/sniper.png',
    '/view/teaminfo/img/spy.png'
  ]

  $('#teaminfo').on('click', '.teaminfo-class-image', function() {
    var currentImage = classImages.indexOf($(this).attr('src'));

    if (currentImage == classImages.length - 1) {
      $(this).attr('src', classImages[0]);
    }
    else if (currentImage >= 0 && currentImage < classImages.length - 1) {
      $(this).attr('src', classImages[currentImage + 1]);
    }
  });

  $('#teaminfo').on('click', '.teaminfo-delete-player', function() {
    $(this).parent().parent().remove();
  });

  $('#teaminfo').on('click', '.teaminfo-add-player', function() {
    var classImage = $(this).prev().find('.input-group:last-child > span > img').attr('src');
    $('#teaminfo-new-player > div').clone().appendTo($(this).prev());
    $(this).prev().find('.input-group:last-child > span > img').attr('src', classImage);
  });

  $('#teaminfo-home-image').change(function() {
    $('#teaminfo-home-image-preview').attr('src', $(this).val());
  });

  $('#teaminfo-away-image').change(function() {
    $('#teaminfo-away-image-preview').attr('src', $(this).val());
  });

  $('#teaminfo-update').click(function() {
    var data = {};

    data.awayName = $('#teaminfo-away-name').val();
    data.awayImage = $('#teaminfo-away-image').val();
    data.awayDesc = $('#teaminfo-away-desc').val();
    data.awayColor = $('#teaminfo-away-color').val();
    data.homeName = $('#teaminfo-home-name').val();
    data.homeImage = $('#teaminfo-home-image').val();
    data.homeDesc = $('#teaminfo-home-desc').val();
    data.homeColor = $('#teaminfo-home-color').val();

    data.awayPlayers = [];
    data.homePlayers = [];

    $('#teaminfo-away-players').children().each(function() {
      data.awayPlayers.push({name: $(this).find('.teaminfo-player-name').val(), classImage: $(this).find('.teaminfo-class-image').attr('src')});
    });
    $('#teaminfo-home-players').children().each(function() {
      data.homePlayers.push({name: $(this).find('.teaminfo-player-name').val(), classImage: $(this).find('.teaminfo-class-image').attr('src')});
    });

    nodecg.sendMessage('teaminfoUpdateData', data);
  });

  $('#teaminfo-show-teams').click(function() {
    nodecg.sendMessage('teaminfoShowTeams');
  });

  $('#teaminfo-hide-teams').click(function() {
    nodecg.sendMessage('teaminfoHideTeams');
  });

  $('#teaminfo-show-rosters').click(function() {
    nodecg.sendMessage('teaminfoShowRosters');
  });

  $('#teaminfo-hide-rosters').click(function() {
    nodecg.sendMessage('teaminfoHideRosters');
  });
});
