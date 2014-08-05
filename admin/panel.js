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

$('#teaminfo-red-image').change(function() {
  $('#teaminfo-red-image-preview').attr('src', $(this).val());
});

$('#teaminfo-blu-image').change(function() {
  $('#teaminfo-blu-image-preview').attr('src', $(this).val());
});

$('#teaminfo-update').click(function() {
  var data = {};
  
  data.bluName = $('#teaminfo-blu-name').val();
  data.bluImage = $('#teaminfo-blu-image').val();
  data.bluDesc = $('#teaminfo-blu-desc').val();
  data.bluColor = $('#teaminfo-blu-color').val();
  data.redName = $('#teaminfo-red-name').val();
  data.redImage = $('#teaminfo-red-image').val();
  data.redDesc = $('#teaminfo-red-desc').val();
  data.redColor = $('#teaminfo-red-color').val();
  
  data.bluPlayers = [];
  data.redPlayers = [];
  
  $('#teaminfo-blu-players').children().each(function() {
    data.bluPlayers.push({name: $(this).find('.teaminfo-player-name').val(), classImage: $(this).find('.teaminfo-class-image').attr('src')});
  });
  $('#teaminfo-red-players').children().each(function() {
    data.redPlayers.push({name: $(this).find('.teaminfo-player-name').val(), classImage: $(this).find('.teaminfo-class-image').attr('src')});
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