import FaceDetection from "@/components/face-detection";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { useState } from "react";

type ProfileData = {
  name: string;
  age: number;
  gender: string;
  interested_in: string;
  bio: string;
  city: string;
  profession: string;
};

export const Profile = () => {
  const [faceDetails, setFaceDetails] = useState<{ gender: string } | null>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    gender: "",
    interested_in: "",
    bio: "",
    city: "",
    profession: "",
  } as ProfileData);

  const onChange = (field: string, value: string | number) => {
    setProfileData((profileData) => ({ ...profileData, [field]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData);
  };

  return (
    <div className="bg-slate-50 h-screen relative">
      {!faceDetails && (
        <div className=" flex justify-center relative">
          <FaceDetection setFaceDetails={setFaceDetails} />
        </div>
      )}
      {faceDetails && (
        <form className="p-10 flex flex-col gap-7" onSubmit={onSubmit}>
          <h2>Profile Details</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Name" value={profileData.name} onChange={(e) => onChange("name", e.target.value)} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="gender">Gender</Label>
            <Select value={profileData.gender} onValueChange={(value) => onChange("gender", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Genders</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Don't want to disclose</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              placeholder="age"
              className="w-[100px]"
              value={profileData.age}
              onChange={(e) => onChange("age", e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="interested_in">Interested in</Label>
            <Select value={profileData.interested_in} onValueChange={(value) => onChange("interested_in", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interested in" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Men</SelectItem>
                  <SelectItem value="female">Women</SelectItem>
                  <SelectItem value="bi">Bi</SelectItem>
                  <SelectItem value="trans">Trans</SelectItem>
                  <SelectItem value="other">other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="bio">Your Bio</Label>
            <Textarea
              placeholder="Enter a bio reflecting your personality"
              id="bio"
              value={profileData.bio}
              onChange={(e) => onChange("bio", e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">Your City</Label>
            <Select value={profileData.city} onValueChange={(value) => onChange("city", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currently Available in</SelectLabel>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="profession">Profession</Label>
            <Input
              type="text"
              id="profession"
              placeholder="Profession"
              value={profileData.profession}
              onChange={(e) => onChange("profession", e.target.value)}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};
