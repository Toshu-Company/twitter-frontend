import { styled } from "styled-components";
import Image from "../Image";
import { useRecoilState } from "recoil";
import { favoriteState } from "../Recoil/favorite";

type Props = {
  videoId: string;
};

export default function Favorite(props: Props) {
  const [favorite, setFavorite] = useRecoilState<string[]>(favoriteState);

  return (
    <ImageButton
      onClick={() => {
        if (favorite.includes(props.videoId)) {
          setFavorite(favorite.filter((id) => id !== props.videoId));
        } else {
          setFavorite(favorite.concat(props.videoId));
        }
      }}
    >
      <Image
        src={
          favorite.includes(props.videoId)
            ? require("@/public/images/heart-fill.svg")
            : require("@/public/images/heart.svg")
        }
        width={[24, { responsive: 768, size: 20 }]}
        alt="Favorites"
        responsive
      />
    </ImageButton>
  );
}

const ImageButton = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
