import styled from "styled-components";

export interface IGalleryItem {
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  onOpenImg: (largeImageURL: string, tags: string) => void;
}

const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  onOpenImg,
}: IGalleryItem) => {
  return (
    <PhotoCard>
      <div>
        <Picture
          src={webformatURL}
          alt={tags}
          onClick={() => {
            onOpenImg(largeImageURL, tags);
          }}
          loading="lazy"
        />
      </div>
    </PhotoCard>
  );
};
export default ImageGalleryItem;

const PhotoCard = styled.li`
  display: grid;
  cursor: zoom-in;

  & > div {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    :hover {
    }
  }
`;

const Picture = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: opacity(90%);

  &:hover {
    transform: scale(1.05);
    transition: 0.3s ease-out;
    filter: none;
  }
`;
