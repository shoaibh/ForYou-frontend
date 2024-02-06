import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";
import { FC, useRef, useState } from "react";

type Props = {
  songInfo: any;
  chooseSong: any;
};

export const SearchResultComponent: FC<Props> = ({ songInfo, chooseSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="flex hover:bg-accent hover:text-accent-foreground justify-between py-4 px-0 items-center cursor-pointer border-b border-gray-200"
      onMouseDown={() => {
        chooseSong(songInfo);
      }}
    >
      <img
        src={songInfo.album.images?.[0]?.url}
        alt={songInfo.album.name}
        width={54}
        height={54}
        className="rounded-full h-[54px] w-[54px] ml-4"
      />
      <div className="max-w-[220px]">
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 1,
          }}
        >
          {songInfo.name}
        </div>
        <div className="opacity-40"> {songInfo.artists?.[0]?.name}</div>
      </div>
      <div>
        {songInfo.preview_url && (
          <>
            <audio ref={audioRef} src={songInfo.preview_url} />{" "}
            <button className="z-20" onMouseDown={handlePlayPause}>
              {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
            </button>{" "}
          </>
        )}
      </div>
    </div>
  );
};
