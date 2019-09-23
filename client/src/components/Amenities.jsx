import React from 'react';
import styled from 'styled-components';
import sc from './styled/OverviewPart.jsx';
import Wifi from './icons/Wifi.jsx';
import Hangers from './icons/Hangers.jsx';
import Kitchen from './icons/Kitchen.jsx';
import Parking from './icons/Parking.jsx';
import Amenity from './icons/Amenity.jsx';


const OverviewPart = sc.OverviewPart;
const PartHeader = sc.OverviewPartHeader;

const List = styled.ul`
  margin: 20px 0 0 0;
  padding: 0;
`;

const Item = styled.li`
  display: inline-block;
  list-style-type: none;
  min-width:160px;
  width: 48%;
  height: 50px;
`;

const Icon = styled.svg`
  margin-right: 10px;
  float: left;
  height: 19px;
  width: 19px;
  fill: currentcolor;
`;

const Button = styled.button`
  margin-top: 10px;
  color: #008489;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border: none !important;

  &:hover {
    text-decoration: underline;
  }
`;


const Amenities = ({amenityList}) => {

  const getItemIcon = (item) => {
    if (item === 'Wifi') {
      return (<Wifi />);
    } else if (item === 'Hangers') {
      return (<Hangers />);
    } else if (item === 'Kitchen') {
      return (<Kitchen />);
    } else if (item === 'Free parking on premises') {
      return (<Parking />);
    } else {
      // TODO: change to a default amenities item
      return (<Amenity />);
    }
  };

  const listAmenities = () => {

    if (!amenityList.amenity1 && !amenityList.amenity2 && !amenityList.amenity3 && !amenityList.amenity4) {
      return;
    }
    let amenityOptions = ['Hangers', 'Wifi', 'Kitchen', 'Free parking on Premises', 'Pool', 'Gym', 'Tennis Courts', 'Spa', 'Housekeeping', 'Restaurant']
    // display only 4 at maximum

    function unique(value, index, self) {
      return self.indexOf(value) === index;
    }

  // usage example:
    let amenities = [amenityList.amenity1, amenityList.amenity2, amenityList.amenity3, amenityList.amenity4].filter(unique)

    console.log('AMENITIES!', amenities)
    return amenities.map((amenityNum, ind) => {
      return (
        <Item key={amenityOptions[amenityNum + 1] + '-summary-' + ind}>
          <Icon viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false" >
            {getItemIcon(amenityOptions[amenityNum -1])}
          </Icon>
          {amenityOptions[amenityNum - 1]}
        </Item>
      );
    });
  };

  return (
    <OverviewPart>
      <PartHeader>Amenities</PartHeader>
      <List>
        {listAmenities()}
      </List>
      <div>
        <Button>{amenityList ? 'Show all amenities' : 'No Amenity'}</Button>
      </div>
    </OverviewPart>
  );
};

export default Amenities;