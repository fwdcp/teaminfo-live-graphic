nodecg.listenFor('teaminfoShowTeams', showTeams);
nodecg.listenFor('teaminfoShowRosters', showRosters);
nodecg.listenFor('teaminfoHideRosters', hideRosters);
nodecg.listenFor('teaminfoHideTeams', hideTeams);
nodecg.listenFor('teaminfoUpdateData', updateData);

var teamsVisible = false;
var rostersVisible = false;

function showTeams() {
  var show = new TimelineLite({paused: true});

  show.from($('#away-info'), 0, {left: "-512px", ease: Quad.easeOut}, 0)
      .from($('#home-info'), 0, {right: "-512px", ease: Quad.easeOut}, 0)
      .from($('#away-image'), 0, {left: "-120px", ease: Quad.easeOut}, 0)
      .from($('#home-image'), 0, {right: "-120px", ease: Quad.easeOut}, 0)
      .to($('#away-image'), 0.5, {left: 0, ease: Quad.easeOut}, 0)
      .to($('#home-image'), 0.5, {right: 0, ease: Quad.easeOut}, 0)
      .from($('#away-info'), 0, {left: "-392px", ease: Quad.easeOut}, 0.75)
      .from($('#home-info'), 0, {right: "-392px", ease: Quad.easeOut}, 0.75)
      .to($('#away-info'), 0.75, {left: 0, ease: Quad.easeOut}, 0.75)
      .to($('#home-info'), 0.75, {right: 0, ease: Quad.easeOut}, 0.75)
      .play();

  teamsVisible = true;
}

function showRosters() {
  if (!teamsVisible) {
    showTeams();
    setTimeout(showRosters, 1500);
  }
  else {
    var show = new TimelineLite({paused: true});

    show.from($('#away-roster-dropdown'), 0, {top: "-100%", ease: Quad.easeOut}, 0)
        .from($('#home-roster-dropdown'), 0, {top: "-100%", ease: Quad.easeOut}, 0)
        .to($('#away-roster-dropdown'), 1, {top: 0, ease: Quad.easeOut}, 0)
        .to($('#home-roster-dropdown'), 1, {top: 0, ease: Quad.easeOut}, 0)
        .play();

    rostersVisible = true;
  }
}

function hideTeams() {
  if (rostersVisible) {
    hideRosters();
    setTimeout(hideTeams, 1000);
  }
  else {
    var hide = new TimelineLite({paused: true});

    hide.from($('#away-info'), 0, {left: 0, ease: Quad.easeIn}, 0)
        .from($('#home-info'), 0, {right: 0, ease: Quad.easeIn}, 0)
        .to($('#away-info'), 0.75, {left: "-392px", ease: Quad.easeIn}, 0)
        .to($('#home-info'), 0.75, {right: "-392px", ease: Quad.easeIn}, 0)
        .from($('#away-image'), 0, {left: 0, ease: Quad.easeIn}, 1)
        .from($('#home-image'), 0, {right: 0, ease: Quad.easeIn}, 1)
        .to($('#away-info'), 0, {left: "-512px", ease: Quad.easeIn}, 1)
        .to($('#home-info'), 0, {right: "-512px", ease: Quad.easeIn}, 1)
        .to($('#away-image'), 0.5, {left: "-120px", ease: Quad.easeIn}, 1)
        .to($('#home-image'), 0.5, {right: "-120px", ease: Quad.easeIn}, 1)
        .play();

    teamsVisible = false;
  }
}

function hideRosters() {
  var hide = new TimelineLite({paused: true});

  hide.from($('#away-roster-dropdown'), 0, {top: 0, ease: Quad.easeIn}, 0)
      .from($('#home-roster-dropdown'), 0, {top: 0, ease: Quad.easeIn}, 0)
      .to($('#away-roster-dropdown'), 1, {top: "-100%", ease: Quad.easeIn}, 0)
      .to($('#home-roster-dropdown'), 1, {top: "-100%", ease: Quad.easeIn}, 0)
      .play();

  rostersVisible = false;
}

function updateData(data) {
  if (rostersVisible) {
    hideRosters();
    
    setTimeout(function() {
      $('#away-roster-dropdown').empty();
      data.awayPlayers.forEach(function(player) {
        $('#away-player-template > div').clone().appendTo($('#away-roster-dropdown'));
        $('#away-roster-dropdown').find('.away-player:last-child > .away-player-class > img').attr('src', player.classImage);
        $('#away-roster-dropdown').find('.away-player:last-child > .away-player-name > span').text(player.name);
      });

      $('#home-roster-dropdown').empty();
      data.homePlayers.forEach(function(player) {
        $('#home-player-template > div').clone().appendTo($('#home-roster-dropdown'));
        $('#home-roster-dropdown').find('.home-player:last-child > .home-player-class > img').attr('src', player.classImage);
        $('#home-roster-dropdown').find('.home-player:last-child > .home-player-name > span').text(player.name);
      });
      
      showRosters();
    }, 1000);
  }
  else {
    $('#away-roster-dropdown').empty();
    data.awayPlayers.forEach(function(player) {
      $('#away-player-template > div').clone().appendTo($('#away-roster-dropdown'));
      $('#away-roster-dropdown').find('.away-player:last-child > .away-player-class > img').attr('src', player.classImage);
      $('#away-roster-dropdown').find('.away-player:last-child > .away-player-name > span').text(player.name);
    });

    $('#home-roster-dropdown').empty();
    data.homePlayers.forEach(function(player) {
      $('#home-player-template > div').clone().appendTo($('#home-roster-dropdown'));
      $('#home-roster-dropdown').find('.home-player:last-child > .home-player-class > img').attr('src', player.classImage);
      $('#home-roster-dropdown').find('.home-player:last-child > .home-player-name > span').text(player.name);
    });
  }

  var update = new TimelineLite({paused: true});
  
  update.from($('#away-image'), 0, {opacity: 1, ease: Quad.easeIn}, 0)
        .from($('#away-info'), 0, {opacity: 1, ease: Quad.easeIn}, 0)
        .to($('#away-image'), 1, {opacity: 0, ease: Quad.easeIn}, 0)
        .to($('#away-info'), 1, {opacity: 0, ease: Quad.easeIn}, 0)
        .set($('#away-image'), {backgroundImage: 'url("' + data.awayImage + '"), linear-gradient(to bottom, ' + data.awayColor + ', ' + data.awayColor + ' 45px, #f4f4f5 45px, #f4f4f5)'}, 1)
        .set($('#away-name'), {backgroundColor: data.awayColor}, 1)
        .set($('.away-player-class'), {backgroundColor: data.awayColor}, 1)
        .set($('#away-name-text'), {text: data.awayName}, 1)
        .set($('#away-desc-text'), {text: data.awayDesc}, 1)
        .from($('#away-image'), 0, {opacity: 0, ease: Quad.easeOut}, 1)
        .from($('#away-info'), 0, {opacity: 0, ease: Quad.easeOut}, 1)
        .to($('#away-image'), 1, {opacity: 1, ease: Quad.easeOut}, 1)
        .to($('#away-info'), 1, {opacity: 1, ease: Quad.easeOut}, 1)
        .from($('#home-image'), 0, {opacity: 1, ease: Quad.easeIn}, 0)
        .from($('#home-info'), 0, {opacity: 1, ease: Quad.easeIn}, 0)
        .to($('#home-image'), 1, {opacity: 0, ease: Quad.easeIn}, 0)
        .to($('#home-info'), 1, {opacity: 0, ease: Quad.easeIn}, 0)
        .set($('#home-image'), {backgroundImage: 'url("' + data.homeImage + '"), linear-gradient(to bottom, ' + data.homeColor + ', ' + data.homeColor + ' 45px, #f4f4f5 45px, #f4f4f5)'}, 1)
        .set($('#home-name'), {backgroundColor: data.homeColor}, 1)
        .set($('.home-player-class'), {backgroundColor: data.homeColor}, 1)
        .set($('#home-name-text'), {text: data.homeName}, 1)
        .set($('#home-desc-text'), {text: data.homeDesc}, 1)
        .from($('#home-image'), 0, {opacity: 0, ease: Quad.easeOut}, 1)
        .from($('#home-info'), 0, {opacity: 0, ease: Quad.easeOut}, 1)
        .to($('#home-image'), 1, {opacity: 1, ease: Quad.easeOut}, 1)
        .to($('#home-info'), 1, {opacity: 1, ease: Quad.easeOut}, 1)
        .play();
}
