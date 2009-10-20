(function($) {
  function appendStat(name, val) {
    return $('<span><b>' + val + '</b> ' + name + '</span>');
  };

  function augmentRepo(repo) {
    var repo = this;

    var elem = $('.repo_list li a[href=\"' + repo.url + '\"]');

    var stats = $('<div></div>').addClass('some-repo-stats');
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
  };

  function fetchRepos() {
    var apiURL = 'http://github.com/api/v2/json/';
    var reposURL = apiURL + 'repos/show/' + $('.userbox .name').text();
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

  fetchRepos();
})(jQuery)
