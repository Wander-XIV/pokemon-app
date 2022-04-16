let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=1126';
  function n(e) {
    'object' == typeof e && 'name' in e
      ? t.push(e)
      : console.error('error when validating item', e);
  }
  function o(t) {
    let e = document.querySelector('.pokemon-list'),
      n = document.createElement('div');
    n.classList.add('group-list-item');
    let o = document.createElement('button');
    (o.innerText = t.name),
      o.classList.add('button-pokemon', 'btn'),
      o.setAttribute('data-toggle', 'modal'),
      o.setAttribute('data-target', '#pokemonModal'),
      pokemonRepository.handleButtonClick(o, t),
      n.appendChild(o),
      e.appendChild(n);
  }
  function i(t) {
    l(t).then(function() {
      console.log(t),
        (function(t) {
          let e = $('.modal-body'),
            n = $('.modal-title');
          n.empty(), e.empty();
          let o = $('<h1>' + s(t.name) + '</h1>'),
            i = $('<h2>ID: ' + t.id + '</h2>'),
            l = $('<img class="modal-img" style="width:50%">');
          l.attr('src', t.imgUrl);
          let a = $('<img class="modal-img" style="width:50%">');
          a.attr('src', t.imgUrlBack);
          let r = $('<p>Height: ' + 10 * t.height + ' cm</p>'),
            p = $('<p>Weight: ' + t.weight / 10 + ' kg</p>'),
            c = $(
              '<p>Types: ' + t.types.map(t => t.type.name).join(', ') + '</p>'
            ),
            d = $(
              '<p>Abilities: ' +
                t.abilities.map(t => t.ability.name).join(', ') +
                '</p>'
            );
          e.append(i),
            n.append(o),
            e.append(l),
            e.append(a),
            e.append(r),
            e.append(p),
            e.append(c),
            e.append(d);
        })(t);
    });
  }
  function l(t) {
    a();
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.id = e.id),
          (t.imgUrl = e.sprites.front_default),
          (t.imgUrlBack = e.sprites.back_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = e.types),
          (t.abilities = e.abilities),
          r();
      })
      .catch(function(t) {
        r(), console.error(t);
      });
  }
  function a() {
    document
      .getElementById('loading_message')
      .removeAttribute('style', 'display:none');
  }
  function r() {
    document
      .getElementById('loading_message')
      .setAttribute('style', 'display:none');
  }
  function s(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  return {
    add: n,
    filter: function(e) {
      return t.filter(t => t.name === e);
    },
    getAll: function() {
      return t;
    },
    addListItem: o,
    showDetails: i,
    handleButtonClick: function(t, e) {
      t.addEventListener('click', function(t) {
        i(e);
      });
    },
    loadList: function() {
      return (
        a(),
        fetch(e)
          .then(function(t) {
            return t.json();
          })
          .then(function(t) {
            t.results.forEach(function(t) {
              let e = { name: s(t.name), detailsUrl: t.url };
              n(e), r(), console.log(e);
            });
          })
          .catch(function(t) {
            r(), console.error(t);
          })
      );
    },
    loadDetails: l,
    findPokemon: function(e) {
      $('.pokemon-list').empty(),
        t.forEach(t => {
          s(t.name).indexOf(s(e)) > -1 && o(t);
        });
    }
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
