import React from 'react';
import { Typography } from '@material-ui/core';
import mapboxgl, { Map as Mapgl } from 'mapbox-gl';
import { State } from 'src/Reducers/reducers';
import { connect } from 'react-redux';
import { getTextlatitudelongitude } from 'src/Translations/helpers';
import style from './map.module.css';
import { Wrapper } from '../Wrapper';

type Props = Readonly<{
  lat: string;
  lng: string;
  latMap: number;
  lngMap: number;
  lang: 'en' | 'ru' | 'pl';
}>;

class MapBlock extends React.PureComponent<Props> {
  mapboxgl: Mapgl | null;

  constructor(props: Props) {
    super(props);

    this.mapboxgl = null;
  }

  componentDidMount(): void {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoiemhhbm5hc2JpdG5ldmEiLCJhIjoiY2thc2h6eXRxMGtlcTJ3bzV3N2I4cW5leCJ9.gVomj5-byfWfjNDI8M33fQ';
    this.mapboxgl = new mapboxgl.Map({
      container: 'myMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 6,
      attributionControl: true,
    });
  }

  componentDidUpdate(oldProps: Props) {
    const { latMap, lngMap } = this.props;
    if (oldProps.latMap !== latMap || oldProps.lngMap !== lngMap) {
      if (this.mapboxgl !== null) {
        this.mapboxgl.flyTo({
          center: [lngMap, latMap],
          zoom: 11,
          essential: true,
        });
      }
    }
  }

  render(): JSX.Element {
    const { lat, lng, lang } = this.props;
    return (
      <Wrapper className={style.mapBlock}>
        <div className={style.map} id="myMap" />
        <Typography color="inherit" variant="h5" className={style.latLng}>
          <p>{getTextlatitudelongitude('lat')(lang)}:</p>
          <p>{lat}</p>
          <p>{getTextlatitudelongitude('lng')(lang)}: </p>
          <p>{lng} </p>
        </Typography>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: State) => ({
  lat: state.lat,
  lng: state.lng,
  latMap: state.latMap,
  lngMap: state.lngMap,
  lang: state.lang,
});

export default connect(mapStateToProps, null)(MapBlock);
