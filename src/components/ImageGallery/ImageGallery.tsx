import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styled from "styled-components";

// export interface IPictures {
//   id: string;
//   webformatURL: string;
//   largeImageURL: string;
//   tags: string;
// }

interface IImageGallery {
  pictures: { [key: string]: string }[];
  onImgClick: (largeImg: string, tags: string) => void;
}

const ImageGallery = ({ pictures, onImgClick }: IImageGallery) => {
  return (
    <Gallery>
      {pictures.map(({ webformatURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          key={index}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onOpenImg={onImgClick}
          tags={tags}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

const Gallery = styled.ul`
  margin: 75px auto 15px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
  grid-gap: 20px;
`;
