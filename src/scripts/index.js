ymaps.ready(init);

function init() {
  var map;
  ymaps.geolocation.get().then(function (res) {
    var mapContainer = document.getElementById('map');
    var bounds = res.geoObjects.get(0).properties.get('boundedBy');
    // Рассчитываем видимую область для текущей положения пользователя.
    var mapState = ymaps.util.bounds.getCenterAndZoom(
      bounds,
      [mapContainer.offsetWidth, mapContainer.offsetHeight]
    );
    createMap(mapState);
  }, function (e) {
    // Если местоположение невозможно получить, то просто создаем карту.
    createMap({
      center: [55.751574, 37.573856],
      zoom: 2
    });
  });

  function createMap(state) {
    state.controls = ['routePanelControl', 'geolocationControl'];
    map = new ymaps.Map('map', state);
    var control = map.controls.get('routePanelControl');
    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
      // // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
      // allowSwitch: false,
      // Включим определение адреса по координатам клика.
      // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
      reverseGeocoding: true,
      // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
      types: { masstransit: true, pedestrian: true, taxi: true }
    })
  }
}