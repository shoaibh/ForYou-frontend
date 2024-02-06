import { SearchResultComponent } from "@/components/search-result-component";
import { SongComponent } from "@/components/song-component";
import { debounce } from "@/lib/helpers";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";

export const ProfileSongs = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<any>([]);

  const debouncedF = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setIsLoading(true);
        console.log("==", { value });
        const data = await axios.get(`http://localhost:3000/search`, {
          params: { search: value },
        });
        setSearchResults(data.data);
        setIsLoading(false);
      }
    }, 700),
    // eslint-disable-next-line
    [],
  );

  //   const { data: debouncedResults, isLoading } = useQuery({
  //     queryKey: ["search", debouncedValue],
  //     queryFn: () =>
  //       axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/song/search`, {
  //         params: { searchQuery: debouncedValue },
  //       }),
  //     enabled: !!debouncedValue, // Only fetch when debouncedValue is truthy (not an empty string)
  //     refetchOnWindowFocus: false, // Prevent automatic refetching on window focus
  //   });

  return (
    <div className="p-10 relative h-full">
      <div className="text-2xl mt-10">Add songs highlighting your personality</div>
      <div className="text-base opacity-70">Add At least 10 songs so that it's better for us to provide you a match</div>

      <div className="flex justify-center w-full pt-5 flex-col pb-[15px] relative">
        <Label htmlFor="song" className="text-start">
          Search your favourite songs
        </Label>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value) {
              debouncedF(e.target.value);
            }
          }}
          id="search"
          name="search"
          type="search"
          required
          placeholder="Search with the song name"
          className="bg-white box-border w-[calc(100% - 30px)]"
          // onBlur={() => setSearchResults([])}
        />
        {searchResults.length > 0 && search?.length > 2 && (
          <div className="absolute top-[90px] w-full z-10 m-0 bg-white shadow-md z-10 max-h-[400px] overflow-scroll">
            <div className="p-[10px]  m-auto flex flex-col justify-center text-center">
              {isLoading && <LiaSpinnerSolid size={50} className="h-7 w-7 animate-spin text-center text-black m-auto" />}
              {// eslint-disable-next-line
              searchResults?.map((result: any) => (
                <SearchResultComponent
                  songInfo={result}
                  key={result.id}
                  chooseSong={(song: any) => {
                    setSelectedSongs((selectedSongs: any) => [...selectedSongs, song]);
                    setSearchResults([]);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {selectedSongs.length === 0 && <div>No Songs Selected Yet</div>}
        {selectedSongs.length > 0 && selectedSongs.map((song: any) => <SongComponent song={song} key={song.id} />)}
      </div>

      <div className="absolute bottom-[50px] right-[50px]">
        <Button>Next</Button>
      </div>
    </div>
  );
};
