import { gql } from '@apollo/client';

const ImageHashFields = gql`
  fragment ImageHashFields on images_hashes {
    imageUrl: image_url
    hash
  }
`;

export default ImageHashFields;
