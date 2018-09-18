(function() {
  function artistElement(artist) {
    var img = artist.images[0] || { url: 'http://placehold.it/64x64' }

    return `
      <div class="media artist" data-id="${artist.id}">
        <div class="media-left">
          <img class="media-object" src="${img.url}" />
        </div>
        <div class="media-body">
          <strong>${artist.name}</strong>
          <ul class="album-list">
          </ul>
        </div>
      </div>
    `
  }

  function artistListElement(artists) {
    var html = ''

    artists.forEach(function(artist) {
      html += artistElement(artist)
    })

    return html
  }

  function albumListElement(albums) {
    var html = ''

    albums.forEach(function(album) {
      html += `<li class="album" data-id=${album.id}>${album.name}</li>`
    })

    return html
  }

  function trackListElement(tracks) {
    var html = '<ul>'

    tracks.forEach(function(track) {
      html += `
        <li class="track">
          <a href="${track.preview_url}" target="_blank">${track.name}</a>
        </li>
      `
    })

    html += '</ul>'

    return html
  }

  $('#artist-search').on('submit', function(event) {
    event.preventDefault()

    var data = $(event.target).serialize()
    var request = $.get('https://api.spotify.com/v1/search', data)

    request.done(function(response) {
      var artistList = artistListElement(response.artists.items)

      $('#artist-list').html(artistList)
    })
  })

  $('#artist-list').on('click', '.artist', function(event) {
    $('.album-list').empty()
    var id = $(event.currentTarget).data('id')
    var request = $.get('https://api.spotify.com/v1/artists/' + id + '/albums')

    request.done(function(response) {
      var albumList = albumListElement(response.items)
      $(event.currentTarget).find('.album-list').html(albumList)
    })
  })

  $('#artist-list').on('click', '.album', function(event) {
    var id = $(event.currentTarget).data('id')
    var request = $.get('https://api.spotify.com/v1/albums/' + id + '/tracks')

    request.done(function(response) {
      var trackList = trackListElement(response.items)
      $('#track-list').modal().find('.modal-body').html(trackList)
    })
  })
})()
