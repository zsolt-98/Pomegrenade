import Input from "@/components/global/shared/Input";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import {
  Camera,
  CircleUser,
  CircleUserRound,
  Loader2,
  UserRound,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function User() {
  const { isLoggedin, isAuthLoading, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isFetchingPhoto, setIsFetchingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TODO: Implement case where the photo hasn't been uploaded yet
    const fetchProfilePhoto = async () => {
      setIsFetchingPhoto(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/profile-photo`,
        );
        if (data.success && data.profilePhoto) {
          setProfilePhotoUrl(data.profilePhoto);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingPhoto(false);
      }
    };

    if (!isAuthLoading && !isLoggedin) {
      navigate("/login");
    } else if (isLoggedin) {
      fetchProfilePhoto();
    }
  }, [isAuthLoading, isLoggedin, navigate, backendUrl]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);

      const { data } = await axios.post(
        `${backendUrl}/api/user/profile-photo`,
        { image: base64, fileType: file.type },
      );

      if (data.success) {
        setProfilePhotoUrl(base64);
        toast.success("Profile photo updated successfully");
      } else {
        toast.error(data.message || "Failed to upload profile photo");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error has occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  // TODO:
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <main className="bg-tertiary-light relative flex w-full items-center justify-center overflow-hidden">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 2xl:px-0">
        <div className="my-20 flex w-full flex-col gap-5">
          <div className="rounded-4xl border-tertiary bg-secondary-light h-100 flex items-center justify-around gap-10 border-2 px-20 py-10">
            <div className="flex flex-col items-center gap-5">
              <div className="w-50 h-50 bg-tertiary-light relative rounded-full">
                {isFetchingPhoto && (
                  <Loader2 className="text-primary-1 absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full" />
                )}
                {!profilePhotoUrl && !isFetchingPhoto && (
                  <CircleUserRound
                    className="stroke-tertiary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    strokeWidth={0.22}
                    size={237}
                  />
                )}
                {profilePhotoUrl && (
                  <>
                    <img
                      src={profilePhotoUrl}
                      alt="Profile photo"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  className="border-tertiary bg-secondary-light right hover:bg-tertiary group absolute bottom-1 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  <Camera className="stroke-tertiary group-hover:stroke-secondary-light" />
                </button>
              </div>
              <div className="bg-tertiary h-[2px] w-full"></div>
              <div className="[&>a]:hover:text-primary-1 text-tertiary flex flex-col font-medium">
                <a className="">About us</a>
                <a className="">Contact us</a>
                <a className="">Help center</a>
              </div>
            </div>
            <div className="bg-tertiary h-full w-[2px]"></div>
            <div className="text-primary-1 flex h-full min-w-80 flex-col justify-between gap-10">
              <h3 className="text-2xl font-semibold">Personal information</h3>
              <div className="flex w-full flex-col">
                <div className="w-full">
                  <p className="font-medium">First name:</p>
                  <Input type="text" value={userData ? userData.name : ""} />
                </div>
                <div className="mt-5">
                  <p className="font-medium">Email:</p>
                  <Input type="email" value={userData ? userData.email : ""} />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium">
                    Cancel
                  </Button>
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light rounded-full border-2 bg-transparent text-sm font-medium">
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-tertiary h-full w-[2px]"></div>

            <div className="text-primary-1 flex h-full flex-col justify-between gap-10">
              <h3 className="text-2xl font-semibold">Password</h3>
              <div className="">
                <p className="font-medium">Password</p>
                <Input type="password" value="************" />
                <div className="flex justify-end">
                  <Button className="border-tertiary hover:bg-tertiary text-tertiary hover:text-secondary-light mt-5 rounded-full border-2 bg-transparent text-sm font-medium">
                    Reset password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
