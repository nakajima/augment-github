(function($) {
  var apiURL = 'http://github.com/api/v2/json/';

  function appendStat(name, val) {
    return $('<span><b>' + val + '</b> ' + name + '</span>');
  };

  function getIssues(user, repo) {
    return function() {
      var issuesURL = apiURL + 'issues/list/' + user + '/' + repo + '/open';
      $.getJSON(issuesURL + '?callback=?', function(data) {
        if (data.issues) {
          $('#' + [user, repo, 'stats'].join('-')).append(appendStat('issues', data.issues.length));
        }
      });
    }
  }

  function augmentRepo(repo) {
    var repo = this;

    var elem = $('.repo_list li a[href=\"' + repo.url + '\"]');
    
    if (!elem.size()) { return; } // Don't augment hidden repositories.

    var stats = $('<div></div>')
      .attr('id', [repo.owner, repo.name, 'stats'].join('-'))
      .addClass('some-repo-stats');
    var watchers = appendStat('watchers', repo.watchers);
    var forks    = appendStat('forks', repo.forks);

    stats.append(watchers);
    stats.append(forks);

    stats.css({
      color: '#666666',
      display: 'none',
      marginLeft: '10px',
      marginBottom: '5px'
    });

    stats.find('span').css({
      display: 'inline-block',
      marginRight: '10px'
    });

    elem.after(stats);
    stats.slideDown();

    // Load issues in the background, since each requires API hit
    window.setTimeout(getIssues(repo.owner, repo.name), 100);
  };

  function fetchRepos() {
    var username = $('.userbox .name').text();
    var reposURL = apiURL + 'repos/show/' + username;
    $.facebox($('<div>Loading repo data...</div>').css({
      textAlign: 'center'
    }));

    $.getJSON(reposURL + '?callback=?', function(data) {
      if (data.repositories) {
        $('.some-repo-stats').remove();
        $.each(data.repositories, augmentRepo);
        $.facebox.close();
      }
    });
  };

  if ($('#repo_listing').size()) {
    fetchRepos();
  } else {
    alert("Dude, you're not on your dashboard.");
  }
})(jQuery)
