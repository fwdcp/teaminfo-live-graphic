nodecg.listenFor('teaminfoShowTeams', showTeams);
nodecg.listenFor('teaminfoShowRosters', showRosters);
nodecg.listenFor('teaminfoHideRosters', hideRosters);
nodecg.listenFor('teaminfoHideTeams', hideTeams);
nodecg.listenFor('teaminfoUpdateData', updateData);

var teamsVisible = false;
var rostersVisible = false;

function showTeams() {
  var show = new TimelineLite({paused: true});

  show.to($('#blu-image'), 0.5, {left: "0", ease: Quad.easeOut}, "0");
  show.to($('#red-image'), 0.5, {right: "0", ease: Quad.easeOut}, "0");
  show.to($('#blu-info'), 0.5, {left: "-392px", ease: Quad.easeOut}, "0");
  show.to($('#red-info'), 0.5, {right: "-392px", ease: Quad.easeOut}, "0");
  show.to($('#blu-info'), 0.75, {left: "0", ease: Quad.easeOut}, "0.75");
  show.to($('#red-info'), 0.75, {right: "0", ease: Quad.easeOut}, "0.75");
  
  show.play();
  
  teamsVisible = true;
}

function showRosters() {
  if (!teamsVisible) {
    showTeams();
    setTimeout(showRosters, 1500);
  }
  else {
    var show = new TimelineLite({paused: true});

    show.to($('#blu-roster-dropdown'), 1, {top: "0", ease: Quad.easeOut}, "0");
    show.to($('#red-roster-dropdown'), 1, {top: "0", ease: Quad.easeOut}, "0");
    
    show.play();
    
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

    hide.to($('#blu-info'), 0.5, {left: "-392px", ease: Quad.easeIn}, "0");
    hide.to($('#red-info'), 0.5, {right: "-392px", ease: Quad.easeIn}, "0");
    hide.to($('#blu-image'), 0.5, {left: "-120px", ease: Quad.easeIn}, "0.75");
    hide.to($('#red-image'), 0.5, {right: "-120px", ease: Quad.easeIn}, "0.75");
    hide.to($('#blu-info'), 0, {left: "-512px", ease: Quad.easeIn}, "0.5");
    hide.to($('#red-info'), 0, {right: "-512px", ease: Quad.easeIn}, "0.5");

    hide.play();
    
    teamsVisible = false;
  }
}

function hideRosters() {
  var hide = new TimelineLite({paused: true});

  hide.to($('#blu-roster-dropdown'), 1, {top: "-100%", ease: Quad.easeIn}, "0");
  hide.to($('#red-roster-dropdown'), 1, {top: "-100%", ease: Quad.easeIn}, "0");
  
  hide.play();
  
  rostersVisible = false;
}

function updateData(data) {
  $('#blu-roster-dropdown').empty();
  data.bluPlayers.forEach(function(player) {
    $('#blu-player-template > div').clone().appendTo($('#blu-roster-dropdown'));
    $('#blu-roster-dropdown').find('.blu-player:last-child > .blu-player-class > img').attr('src', player.classImage);
    $('#blu-roster-dropdown').find('.blu-player:last-child > .blu-player-name > span').text(player.name);
  });
  
  $('#red-roster-dropdown').empty();
  data.redPlayers.forEach(function(player) {
    $('#red-player-template > div').clone().appendTo($('#red-roster-dropdown'));
    $('#red-roster-dropdown').find('.red-player:last-child > .red-player-class > img').attr('src', player.classImage);
    $('#red-roster-dropdown').find('.red-player:last-child > .red-player-name > span').text(player.name);
  });
  
  $('#blu-image').css('background-image', 'url("' + data.bluImage + '"), linear-gradient(to bottom, ' + data.bluColor + ', ' + data.bluColor + ' 45px, #f4f4f5 45px, #f4f4f5)');
  $('#red-image').css('background-image', 'url("' + data.redImage + '"), linear-gradient(to bottom, ' + data.redColor + ', ' + data.redColor + ' 45px, #f4f4f5 45px, #f4f4f5)');
  $('#blu-name').css('background-color', data.bluColor);
  $('#red-name').css('background-color', data.redColor);
  $('.blu-player-class').css('background-color', data.bluColor);
  $('.red-player-class').css('background-color', data.redColor);
  $('#blu-name-text').text(data.bluName);
  $('#red-name-text').text(data.redName);
  $('#blu-desc-text').text(data.bluDesc);
  $('#red-desc-text').text(data.redDesc);
}