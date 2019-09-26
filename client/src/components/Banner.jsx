import React from 'react';
import styled from 'styled-components';
import Share from './icons/Share.jsx';
import Heart from './icons/Heart.jsx';
import $ from 'jquery';


const BannerContainer = styled.div`
  position: relative;
  border-bottom: 1px solid #ccc;
`;

const PhotosContainer = styled.div`
  position: relative;
  min-height: 290px;
`;

const PrimaryPhotoContainer = styled.div`
  position: relative;
  float: left;
  width: 49.5%;
  height: 290px;
  border: 1px solid #222;
  overflow: hidden;
`;

const SecondaryPhotoContainer = styled.div`
  position: relative;
  float: left;
  width: 25%;
  height: 144px;
  border: 1px solid #222;
  overflow: hidden;
`;

const PrimaryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const SecondaryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
`;

const PhotoShadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #07070755;
`;

const CommandsContainer = styled.div`
  position:absolute;
  top: 13px;
  right: 10px;
  height: 92%;
  z-index: 2;
`;

const SocialItem = styled.div`
  margin: 10px;
  padding: 10px 12px;
  display: inline-block;
  width: 70px;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
`;

const Icon = styled.svg`
  margin-right: 10px;
  float: left;
  height: 15px;
  width: 15px;
  overflow: visible;
`;

const CommandItem = styled.div`
  margin: 10px;
  padding: 10px 12px;
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
`;

const Banner = (props) => {

  let photos = [];
  // Sort photos
  // if (props.photos) {
  //   photos = props.photos.sort(function(p1, p2) {
  //     return p1.photo_id - p2.photo_id;
  //   });
  // }

  // Amazon S3 is by default. Set to local if in Env settings
  let s3 = process.env.S3_HOST || 'https://housemania-hr.s3-us-west-1.amazonaws.com';

  console.log('props.photos', props.photos)

  let photoBucket = 'http://d1mw17xnjm68ku.cloudfront.net';

  let photo1 = null;
  let photo2 = null;
  let photo3 = null;
  let photo4 = null;
  let photo5 = null;

  for (var i = 0; i < props.photos.length; i++) {
    if (!photo1) {
      photo1 = `${props.photos[i].photourl}.jpg`
    } else if (!photo2) {
      photo2 = `${props.photos[i].photourl}.jpg`
    } else if (!photo3) {
      photo3 = `${props.photos[i].photourl}.jpg`
    } else if (!photo4) {
      photo4 = `${props.photos[i].photourl}.jpg`
    } else if (!photo5) {
      photo5 = `${props.photos[i].photourl}.jpg`
    }
  }

  const zoomPhoto = (event) => {
    let $photo = $(event.target);

    // Shadow all other photos
    $('.photo-shadow').each((index, shadow) => {
      if ($photo.data('id') !== $(shadow).data('id')) {
        $(shadow).css({ width: '100%'});
      }
    });

    let style = {
      width: '105%',
      height: '105%'
    };

    if ($photo.width() > $photo.height()) {
      style.marginLeft = '-2.5%';
    }

    $photo.animate(style, 500);
  };

  const unzoomPhoto = (event) => {
    let $photo = $(event.target);

    // Unshadow all photos
    $('.photo-shadow').each((index, shadow) => {
      $(shadow).css({ width: 'auto'});
    });

    let style = {
      width: '100%',
      height: '100%'
    };

    if ($photo.width() > $photo.height()) {
      style.marginLeft = '0';
    }

    $photo.animate(style, 500);
  };

  // Load Photos automatically if they are ready in props
  // loadPhotos();

  return (
    <BannerContainer id="overview-house-banner" >
      <PhotosContainer className="photos-container" >
        <PrimaryPhotoContainer >
          <PrimaryPhoto src={photoBucket+ '/' + photo1} data-id={1}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></PrimaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={1} />
        </PrimaryPhotoContainer>

        <SecondaryPhotoContainer>
          <SecondaryPhoto src={photoBucket + '/' + photo2} data-id={2}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={2} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={photoBucket + '/' + photo3} data-id={3}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={3} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={photoBucket + '/' + photo4} data-id={4}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={4} />
        </SecondaryPhotoContainer>
        <SecondaryPhotoContainer>
          <SecondaryPhoto src={photoBucket + '/' + photo5} data-id={5}
            onMouseOver={zoomPhoto.bind(this)}
            onMouseOut={unzoomPhoto.bind(this)} ></SecondaryPhoto>
          <PhotoShadow className="photo-shadow" data-id={5} />
        </SecondaryPhotoContainer>
      </PhotosContainer>

      <CommandsContainer className="floating-commands" >
        <SocialItem>
          <Icon viewBox="0 0 24 24" fill="transparent" fill-opacity="0" stroke="currentColor" stroke-width="2.25" focusable="false" aria-hidden="true" role="presentation" stroke-linecap="round" stroke-linejoin="round">
            <Share />
          </Icon>
          Share
        </SocialItem>
        <SocialItem>
          <Icon viewBox="0 0 24 24" fill="transparent" fill-opacity="0" stroke="#484848" stroke-width="2.25" focusable="false" aria-label="Save this listing." role="img" stroke-linecap="round" stroke-linejoin="round">
            <Heart />
          </Icon>
          Save
        </SocialItem>
        <CommandItem>View Photos</CommandItem>
      </CommandsContainer>
    </BannerContainer>
  );
};

export default Banner;