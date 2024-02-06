import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { FC } from "react";

type Props = {
  song: any;
};

export const SongComponent: FC<Props> = ({ song }) => {
  return (
    <div className="flex hover:bg-accent hover:text-accent-foreground justify-between py-4 px-0 items-center border-b border-gray-200">
      <img src={song.album.images?.[0]?.url} alt={song.album.name} width={54} height={54} className="rounded-full h-[54px] w-[54px] ml-4" />
      <div className="max-w-[220px]">
        <div
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 1,
          }}
        >
          {song.name}
        </div>
        <div className="opacity-40"> {song.artists?.[0]?.name}</div>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
